import React, { useState } from "react";
import { Sparkles, ArrowRight, Palette, Layers, Box } from "lucide-react";
import { motion } from "motion/react";
import { ImageUpload } from "./components/ImageUpload";
import { ProductSelector } from "./components/ProductSelector";
import { ResultDisplay } from "./components/ResultDisplay";
import { generateMD, ProductType, StyleType, PoseType } from "./services/gemini";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [productType, setProductType] = useState<ProductType>("sticker");
  const [style, setStyle] = useState<StyleType>("original");
  const [pose, setPose] = useState<PoseType>("standing");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string, type: string) => {
    setSelectedImage(base64);
    setMimeType(type);
    setError(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setMimeType("");
    setResults([]);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError("Please upload a character image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const images = await generateMD({
        image: selectedImage,
        mimeType,
        productType,
        style,
        pose,
      });
      setResults(images);
    } catch (err) {
      setError("Failed to generate MD. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] selection:bg-neon-green selection:text-black">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-lg rotate-3">
              <Sparkles className="text-neon-green" size={24} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">
              MD <span className="text-neon-green bg-black px-1">CREATOR</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-neon-green hover:bg-black px-2 py-1 transition-all">Stickers</a>
            <a href="#" className="hover:text-neon-green hover:bg-black px-2 py-1 transition-all">Emoticons</a>
            <a href="#" className="hover:text-neon-green hover:bg-black px-2 py-1 transition-all">Keyrings</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-12">
            <section>
              <ImageUpload
                onImageSelect={handleImageSelect}
                onClear={handleClear}
                selectedImage={selectedImage}
              />
            </section>

            <section className="p-8 border-2 border-black rounded-2xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <ProductSelector
                productType={productType}
                setProductType={setProductType}
                style={style}
                setStyle={setStyle}
                pose={pose}
                setPose={setPose}
              />
              
              <button
                onClick={handleGenerate}
                disabled={isLoading || !selectedImage}
                className="w-full mt-10 py-5 bg-black text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-neon-green hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white active:scale-95"
              >
                {isLoading ? "Generating..." : "Create MD Now"}
                <ArrowRight size={20} />
              </button>
              
              {error && (
                <p className="mt-4 text-xs font-bold text-red-500 uppercase tracking-wider text-center">
                  {error}
                </p>
              )}
            </section>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                5. Preview & Download
              </h2>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-black" />
                <div className="w-2 h-2 rounded-full bg-black/20" />
                <div className="w-2 h-2 rounded-full bg-black/20" />
              </div>
            </div>
            
            <ResultDisplay images={results} isLoading={isLoading} />

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Palette, title: "Style Suggester", desc: "SD/Chibi versions available" },
                { icon: Layers, title: "Multi-Pose", desc: "5+ dynamic poses to choose" },
                { icon: Box, title: "Ready for MD", desc: "Optimized for production" },
              ].map((feature, i) => (
                <div key={i} className="p-6 border-2 border-black rounded-xl bg-white hover:bg-neon-green transition-colors group">
                  <feature.icon size={20} className="mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-black uppercase mb-1">{feature.title}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-tight">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t-2 border-black py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded-lg">
              <Sparkles className="text-neon-green" size={16} />
            </div>
            <span className="text-sm font-black uppercase italic">MD CREATOR</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Powered by Nano Banana AI • Built for Creators
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-neon-green">Privacy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-neon-green">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
