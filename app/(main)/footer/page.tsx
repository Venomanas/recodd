"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaMailBulk, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
    {/* Mimicking the aperture logo from your images */}
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Logo />
            <p className="text-sm text-gray-500 mt-2">
              Connecting talent with opportunity. <br /> Commission free.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#E53935] transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#E53935] transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#E53935] transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#E53935] transition-colors"
            >
              <FaMailBulk size={20} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[#212121] dark:text-white font-medium">
              Contact Us
            </p>
            <p className="text-sm text-gray-500">support@recodd.com</p>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-zinc-800 my-8" />

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-sm text-gray-400"
          >
            © 2025 Recodd. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
