"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="grid gap-4">
      <div className="flex justify-center">
        {images.length > 0 && (
          <Image
            className="h-auto max-w-full rounded-lg"
            src={selectedImage}
            alt=""
            width={860}
            height={576}
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {images.map((image) => {
          if (image != null) {
            return (
              <div className="mb-2.5" key={image}>
                <Image
                  className={`h-auto max-w-full rounded-lg ${
                    selectedImage === image
                      ? "border-2 border-white border-heading"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  src={image}
                  alt=""
                  width={260}
                  height={260}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
