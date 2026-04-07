import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export type ProductType = "sticker" | "emoticon" | "keyring";
export type StyleType = "original" | "sd";
export type PoseType = "standing" | "jumping" | "waving" | "sitting" | "running";

export interface GenerationParams {
  image: string; // base64
  mimeType: string;
  productType: ProductType;
  style: StyleType;
  pose: PoseType;
}

export async function generateMD(params: GenerationParams): Promise<string[]> {
  const { image, mimeType, productType, style, pose } = params;

  let prompt = `Based on the provided character image, create a ${productType} design. `;
  
  if (style === "sd") {
    prompt += "Transform the character into an SD (Super Deformed) or Chibi style: cute, large head, small body. ";
  } else {
    prompt += "Maintain the original character style. ";
  }

  prompt += `The character should be in a ${pose} pose. `;

  if (productType === "sticker") {
    prompt += "Design it as a sticker with a thick white border, suitable for printing. High quality, clean lines, vibrant colors.";
  } else if (productType === "emoticon") {
    prompt += "Design it as a high-quality emoticon or profile icon. Focus on clear expression and clean background.";
  } else if (productType === "keyring") {
    prompt += "Design it as an acrylic keyring. Include a small circular hole at the very top for a chain attachment. High quality, vibrant colors, clean edges.";
  }

  prompt += " Ensure the character's key features (colors, clothing, hair) are consistent with the input image.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: image.split(",")[1], // remove data:image/png;base64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    const images: string[] = [];
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          images.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
        }
      }
    }

    return images;
  } catch (error) {
    console.error("Error generating MD:", error);
    throw error;
  }
}
