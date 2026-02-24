"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle2,
  Shield,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Animatedbutton from "@/app/components/Animatedbutton";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  amount?: string;
  recipientAvatar?: string;
}

type PaymentMethod = "card" | "upi" | "wallet";

export default function PaymentModal({
  isOpen,
  onClose,
  recipientName,
  amount = "500",
  recipientAvatar,
}: PaymentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi" as PaymentMethod,
      name: "UPI",
      icon: Smartphone,
      description: "GPay, PhonePe, Paytm",
    },
    {
      id: "wallet" as PaymentMethod,
      name: "Wallet",
      icon: Wallet,
      description: "Recodd Credits",
    },
  ];

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedMethod(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[rgb(var(--surface))] rounded-2xl shadow-2xl overflow-hidden border border-[rgb(var(--border))]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--border))]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[rgb(var(--border))]">
                <Image
                  src={
                    recipientAvatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipientName}`
                  }
                  alt={recipientName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-semibold text-[rgb(var(--text))]">
                  {step === 3 ? "Payment Successful!" : `Pay ${recipientName}`}
                </h3>
                <p className="text-xs text-[rgb(var(--muted))]">
                  {step === 1 && "Choose payment method"}
                  {step === 2 && "Enter payment details"}
                  {step === 3 && "Transaction complete"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[rgb(var(--bg))] rounded-lg transition-colors"
            >
              <X size={20} className="text-[rgb(var(--muted))]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[rgb(var(--muted))]">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={e => setPaymentAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-2xl font-bold text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {paymentMethods.map(method => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          selectedMethod === method.id
                            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]/5"
                            : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedMethod === method.id
                              ? "bg-[rgb(var(--accent))] text-white"
                              : "bg-[rgb(var(--bg))] text-[rgb(var(--muted))]"
                          }`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-[rgb(var(--text))]">
                            {method.name}
                          </p>
                          <p className="text-xs text-[rgb(var(--muted))]">
                            {method.description}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle2
                            size={24}
                            className="ml-auto text-[rgb(var(--accent))]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <Animatedbutton
                  variant="primary"
                  className="w-full mt-4"
                  onClick={() => setStep(2)}
                  disabled={!selectedMethod || !paymentAmount}
                >
                  Continue
                </Animatedbutton>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Amount Summary */}
                <div className="text-center py-4 bg-[rgb(var(--bg))] rounded-xl mb-4">
                  <p className="text-sm text-[rgb(var(--muted))]">
                    You're paying
                  </p>
                  <p className="text-3xl font-bold text-[rgb(var(--text))]">
                    ₹{paymentAmount}
                  </p>
                </div>

                {selectedMethod === "card" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={e =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={e =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={e =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardDetails.name}
                      onChange={e =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>
                )}

                {selectedMethod === "upi" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g., name@upi)"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                    <div className="flex justify-center gap-6 py-4">
                      {["GPay", "PhonePe", "Paytm"].map(app => (
                        <button
                          key={app}
                          className="px-4 py-2 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg text-sm font-medium text-[rgb(var(--muted))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[rgb(var(--accent))]/10 rounded-full flex items-center justify-center">
                      <Wallet size={32} className="text-[rgb(var(--accent))]" />
                    </div>
                    <p className="text-[rgb(var(--text))] font-medium">
                      Recodd Wallet Balance
                    </p>
                    <p className="text-2xl font-bold text-[rgb(var(--accent))]">
                      ₹2,500
                    </p>
                    <p className="text-xs text-green-500 mt-2">
                      ✓ Sufficient balance
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))] justify-center pt-2">
                  <Shield size={14} />
                  <span>Secured with 256-bit SSL encryption</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-[rgb(var(--border))] rounded-xl font-medium text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] transition-colors"
                  >
                    Back
                  </button>
                  <Animatedbutton
                    variant="primary"
                    className="flex-1"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${paymentAmount}`
                    )}
                  </Animatedbutton>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 size={48} className="text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">
                  Payment Successful!
                </h3>
                <p className="text-[rgb(var(--muted))] mb-2">
                  ₹{paymentAmount} sent to {recipientName}
                </p>
                <p className="text-xs text-[rgb(var(--muted))] mb-6">
                  Transaction ID: TXN10398421
                </p>
                <Animatedbutton
                  variant="primary"
                  className="w-full"
                  onClick={handleClose}
                >
                  Done
                </Animatedbutton>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
