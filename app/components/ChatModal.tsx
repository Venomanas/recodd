"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientRole?: string;
  recipientAvatar?: string;
}

export default function ChatModal({
  isOpen,
  onClose,
  recipientName,
  recipientRole = "Freelancer",
  recipientAvatar,
}: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I'm ${recipientName}. How can I help you today?`,
      sender: "other",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Thanks for reaching out! I'd be happy to discuss this further.",
        "That sounds interesting! Let me know the details.",
        "Great question! I'll get back to you with more info.",
        "I appreciate your interest! When would be a good time to talk?",
      ];
      const response: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-lg h-[600px] max-h-[80vh] bg-[rgb(var(--surface))] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[rgb(var(--border))]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgb(var(--accent))]">
                  <Image
                    src={
                      recipientAvatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipientName}`
                    }
                    alt={recipientName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[rgb(var(--surface))]" />
              </div>
              <div>
                <h3 className="font-semibold text-[rgb(var(--text))]">
                  {recipientName}
                </h3>
                <p className="text-xs text-green-500 font-medium">● Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[rgb(var(--surface))] rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]">
                <Phone size={18} />
              </button>
              <button className="p-2 hover:bg-[rgb(var(--surface))] rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]">
                <Video size={18} />
              </button>
              <button className="p-2 hover:bg-[rgb(var(--surface))] rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]">
                <MoreVertical size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[rgb(var(--bg))]">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-[rgb(var(--accent))] text-white rounded-br-md"
                      : "bg-[rgb(var(--surface))] text-[rgb(var(--text))] border border-[rgb(var(--border))] rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender === "user"
                        ? "text-white/70"
                        : "text-[rgb(var(--muted))]"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-[rgb(var(--muted))] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-[rgb(var(--muted))] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-[rgb(var(--muted))] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[rgb(var(--bg))] rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))]">
                <Paperclip size={20} />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))] transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] transition-colors">
                  <Smile size={20} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-3 bg-[rgb(var(--accent))] text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
