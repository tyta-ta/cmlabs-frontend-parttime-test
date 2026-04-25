"use client";

import { useState } from "react";

type Props = {
  youtubeUrl: string;
};

function getYoutubeEmbedUrl(url: string) {
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function VideoModal({ youtubeUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 rounded-full bg-olive-600 px-6 py-3 font-semibold text-white transition hover:bg-olive-700"
      >
        Watch Tutorial
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-700 shadow hover:text-red-500"
            >
              ×
            </button>

            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={getYoutubeEmbedUrl(youtubeUrl)}
                title="Meal tutorial"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}