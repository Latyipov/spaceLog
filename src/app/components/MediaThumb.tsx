"use client";
import Image from "next/image";

type MediaThumbProps = {
  media_type: "image" | "video" | "other" | null;
  url: string;
  title: string;
};

export function MediaThumb({ media_type, url, title }: MediaThumbProps) {
  return (
    <div className="w-full relative flex-shrink-0 rounded overflow-hidden">
      {(media_type === "other" || !url) && (
        <Image
          src="/imgPlaceholder.svg"
          alt={title || "NASA APOD placeholder"}
          width={800}
          height={600}
          className="object-cover rounded shadow"
        />
      )}
      {media_type === "image" && (
        <Image
          src={url}
          alt={title}
          width={800}
          height={600}
          className="object-cover rounded shadow"
        />
      )}
      {media_type === "video" && (
        <iframe
          src={url}
          title={title}
          allowFullScreen
          className="w-full aspect-video rounded object-cover"
        />
      )}
    </div>
  );
}
