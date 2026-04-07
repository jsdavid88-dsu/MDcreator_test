import React from "react";
import { Sticker, Smile, Key, User, Zap, Move } from "lucide-react";
import { cn } from "../lib/utils";
import { ProductType, StyleType, PoseType } from "../services/gemini";

interface ProductSelectorProps {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  style: StyleType;
  setStyle: (style: StyleType) => void;
  pose: PoseType;
  setPose: (pose: PoseType) => void;
}

export function ProductSelector({
  productType,
  setProductType,
  style,
  setStyle,
  pose,
  setPose,
}: ProductSelectorProps) {
  const products: { id: ProductType; label: string; icon: any }[] = [
    { id: "sticker", label: "Sticker", icon: Sticker },
    { id: "emoticon", label: "Emoticon", icon: Smile },
    { id: "keyring", label: "Keyring", icon: Key },
  ];

  const styles: { id: StyleType; label: string; icon: any }[] = [
    { id: "original", label: "Original", icon: User },
    { id: "sd", label: "SD / Chibi", icon: Zap },
  ];

  const poses: { id: PoseType; label: string }[] = [
    { id: "standing", label: "Standing" },
    { id: "jumping", label: "Jumping" },
    { id: "waving", label: "Waving" },
    { id: "sitting", label: "Sitting" },
    { id: "running", label: "Running" },
  ];

  return (
    <div className="space-y-8">
      {/* Product Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          2. Select MD Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setProductType(p.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all",
                productType === p.id
                  ? "border-black bg-black text-white scale-[1.02] shadow-lg"
                  : "border-gray-200 hover:border-gray-400 bg-white text-gray-600"
              )}
            >
              <p.icon size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          3. Choose Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={cn(
                "flex items-center gap-3 p-4 border-2 rounded-xl transition-all",
                style === s.id
                  ? "border-black bg-black text-white scale-[1.02] shadow-lg"
                  : "border-gray-200 hover:border-gray-400 bg-white text-gray-600"
              )}
            >
              <s.icon size={20} />
              <span className="text-xs font-bold uppercase">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pose */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          4. Select Pose
        </label>
        <div className="flex flex-wrap gap-2">
          {poses.map((p) => (
            <button
              key={p.id}
              onClick={() => setPose(p.id)}
              className={cn(
                "px-4 py-2 border-2 rounded-full text-xs font-bold uppercase transition-all",
                pose === p.id
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-400 bg-white text-gray-600"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
