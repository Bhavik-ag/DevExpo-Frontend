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
            className="h-auto w-auto rounded-lg aspect-[16/9] object-cover"
            src={selectedImage}
            alt=""
            width={860}
            height={576}
            priority
          />
        )}
      </div>
      <div className={`grid grid-cols-4 gap-2.5`}>
        {images.map((image) => {
          if (image != null) {
            return (
              <div className="mb-2.5 flex justify-center" key={image}>
                <Image
                  className={`h-auto w-auto max-w-full rounded-lg aspect-[16/9] object-cover ${
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
