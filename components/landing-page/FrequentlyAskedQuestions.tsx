"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { frequentlyAskedQuestions } from "@/data/landing-page/frequentlyAskedQuestions";

export default function FrequentlyAskedQuestions() {
  const [activeTab, setActiveTab] = useState<number | string | null>(null);

  const toggleTab = (id: number | string) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <div className="w-11/12 mx-auto p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col gap-6 md:gap-10 items-center max-w-6xl">
      <div className="text-center space-y-2.5">
        <h1 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold font-pp-neue text-white">
          FAQs
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto">
          Find everything you need to know about StreamFi, from getting started
          to maximizing your earnings.
        </p>
      </div>

      <div className="space-y-5 w-full max-w-4xl">
        {frequentlyAskedQuestions.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-700 backdrop-blur-sm"
          >
            <button
              onClick={() => toggleTab(faq.id)}
              className="flex items-center justify-between w-full p-4 text-left text-white font-bold text-lg backdrop-blur-sm hover:bg-gray-500/30 transition-all duration-200 ease-in-out"
              aria-expanded={activeTab === faq.id}
              aria-controls={`content-${faq.id}`}
            >
              {faq.title}
              <motion.div
                initial={false}
                animate={{ rotate: activeTab === faq.id ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {activeTab === faq.id ? (
                  <Minus className="h-5 w-5 text-gray-300" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-300" />
                )}
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {activeTab === faq.id && (
                <motion.div
                  id={`content-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden min-h-[50px]"
                >
                  <motion.div className="p-4 backdrop-blur text-gray-300 text-sm leading-relaxed">
                    {faq.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
