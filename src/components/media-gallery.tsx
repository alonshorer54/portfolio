import Image from "next/image";

import type { ProjectMedia } from "@/data/projectsData";

/**
 * Every screenshot, recording and chart a project has, captioned.
 *
 * App icons are filtered out — they are a fallback for the card thumbnail, not
 * something worth a gallery slot of their own.
 */
export function MediaGallery({ media }: { media: ProjectMedia[] }) {
  const items = media.filter((item) => item.kind !== "icon");
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        {items.length === 1 ? "Screenshot" : "Screens and results"}
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <figure key={item.src} className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
              {item.kind === "video" ? (
                <video
                  className="block w-full"
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.alt}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="block h-auto w-full"
                />
              )}
            </div>
            <figcaption className="text-sm text-muted-foreground">{item.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
