export interface WallpaperOptions {
  prompt: string;
  style: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  resolution: '1K' | '2K';
  enhancePrompt: boolean;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  ENHANCING = 'ENHANCING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export const WALLPAPER_STYLES = [
  { id: 'cinematic', label: 'Cinematic', promptSuffix: 'cinematic lighting, photorealistic, 8k, highly detailed, dramatic atmosphere' },
  { id: 'anime', label: 'Anime', promptSuffix: 'anime style, studio ghibli inspired, vibrant colors, cel shaded, detailed background' },
  { id: 'cyberpunk', label: 'Cyberpunk', promptSuffix: 'cyberpunk city, neon lights, futuristic, high tech, rain, reflections, night time' },
  { id: 'minimalist', label: 'Minimalist', promptSuffix: 'minimalist, flat design, vector art, clean lines, pastel colors, simple' },
  { id: 'nature', label: 'Nature', promptSuffix: 'national geographic style, nature photography, breathtaking landscape, golden hour' },
  { id: 'abstract', label: 'Abstract', promptSuffix: 'abstract art, fluid shapes, gradient, 3d render, blender, glassmorphism' },
  { id: 'fantasy', label: 'Fantasy', promptSuffix: 'fantasy world, magical, ethereal, dreamlike, concept art, digital painting' },
  { id: 'vaporwave', label: 'Vaporwave', promptSuffix: 'vaporwave aesthetic, retro 80s, synthwave, purple and pink gradients, glitch art' },
];
