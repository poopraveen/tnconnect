"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3 } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayImages = images.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"];

  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + displayImages.length) % displayImages.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % displayImages.length : null));

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-80">
          {/* Main image */}
          <div
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => setLightbox(0)}
          >
            <Image
              src={displayImages[0]}
              alt={`${title} - main`}
              fill
              className="object-cover group-hover:brightness-90 transition-all"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* Side images */}
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => setLightbox(Math.min(idx, displayImages.length - 1))}
            >
              {displayImages[idx] ? (
                <Image
                  src={displayImages[idx]}
                  alt={`${title} ${idx + 1}`}
                  fill
                  className="object-cover group-hover:brightness-90 transition-all"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-300 text-xs">No image</span>
                </div>
              )}
              {idx === 3 && displayImages.length > 5 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm"
                >
                  +{displayImages.length - 5} more
                </button>
              )}
            </div>
          ))}
        </div>

        {/* View all button */}
        <button
          onClick={() => setLightbox(0)}
          className="absolute bottom-3 right-3 bg-white text-slate-700 text-sm font-medium px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-slate-50 transition-colors"
        >
          <Grid3x3 className="w-4 h-4" />
          All {displayImages.length} photos
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full z-10 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {lightbox + 1} / {displayImages.length}
          </div>

          {/* Prev/Next */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main image */}
          <div
            className="relative max-w-5xl max-h-screen w-full h-full flex items-center justify-center p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={displayImages[lightbox]}
              alt={`${title} - ${lightbox + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
            {displayImages.slice(0, 8).map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightbox(idx); }}
                className={`relative w-14 h-10 rounded overflow-hidden flex-shrink-0 transition-all ${
                  lightbox === idx ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
