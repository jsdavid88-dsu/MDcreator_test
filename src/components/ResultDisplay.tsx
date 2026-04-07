import React from "react";
import { Download, Share2, RefreshCw, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResultDisplayProps {
  images: string[];
  isLoading: boolean;
}

export function ResultDisplay({ images, isLoading }: ResultDisplayProps) {
  const loadingMessages = [
    "Designing your character...",
    "Applying the perfect pose...",
    "Polishing the MD details...",
    "Almost ready for production...",
    "Adding some magic sparkles...",
  ];

  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `character-md-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-[400px] border-2 border-black rounded-2xl bg-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10"
          >
            <div className="relative w-20 h-20 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-gray-100 border-t-black rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <RefreshCw size={32} className="text-black" />
              </motion.div>
            </div>
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm font-bold uppercase tracking-widest text-black"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </motion.div>
        ) : images.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50 hover:border-black transition-all"
              >
                <img
                  src={img}
                  alt={`Generated MD ${idx + 1}`}
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDownload(img, idx)}
                    className="p-3 bg-white text-black rounded-full hover:bg-neon-green transition-colors"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                  <button
                    className="p-3 bg-white text-black rounded-full hover:bg-neon-green transition-colors"
                    title="Share"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-lg font-bold uppercase mb-2">No MD Generated Yet</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Upload your character and select your options to start creating awesome merchandise!
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
