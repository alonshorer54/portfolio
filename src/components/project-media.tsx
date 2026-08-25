import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import type { Project, ProjectMedia as ProjectMediaType } from "@/data/projectsData";
import { getShowcaseMedia } from "@/data/projectsData";

interface ProjectMediaProps {
  project: Project;
  /** Width/height. 16/10 for the featured panel, 16/9 for grid thumbnails. */
  ratio?: number;
  /** Set on the featured project only — it is above the fold. */
  priority?: boolean;
  className?: string;
}

/**
 * The visual for a project.
 *
 * Three cases, in order: a looping muted video, a real image, or — when the
 * project has no screenshot yet — a generated tile built from the app icon or
 * the project initials. The fallback is designed rather than empty, so a
 * missing screenshot degrades into something deliberate instead of a hole.
 */
export function ProjectMedia({
  project,
  ratio = 16 / 9,
  priority = false,
  className,
}: ProjectMediaProps) {
  const media = getShowcaseMedia(project);

  return (
    <AspectRatio
      ratio={ratio}
      className={cn(
        "overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10",
        className,
      )}
    >
      {media?.kind === "video" ? (
        <VideoMedia media={media} />
      ) : media && media.kind !== "icon" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
          className="object-contain p-4"
        />
      ) : (
        <IconTile project={project} media={media} priority={priority} />
      )}
    </AspectRatio>
  );
}

/**
 * `autoPlay` only works alongside `muted` — every browser blocks sound that
 * starts on its own. `playsInline` stops iOS Safari taking the video fullscreen.
 */
function VideoMedia({ media }: { media: ProjectMediaType }) {
  return (
    <video
      className="size-full object-cover"
      src={media.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
    />
  );
}

/** The no-screenshot fallback: the app icon, or initials, on a soft field. */
function IconTile({
  project,
  media,
  priority,
}: {
  project: Project;
  media?: ProjectMediaType;
  priority: boolean;
}) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
      {/* A faint grid keeps the empty area from reading as a broken image. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px]"
      />
      {media?.kind === "icon" ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          unoptimized={media.src.endsWith(".svg")}
          className="relative size-24 rounded-2xl shadow-lg ring-1 ring-foreground/10 sm:size-32"
        />
      ) : (
        <span className="font-heading relative text-4xl font-semibold tracking-tight text-muted-foreground sm:text-5xl">
          {initials}
        </span>
      )}
    </div>
  );
}
