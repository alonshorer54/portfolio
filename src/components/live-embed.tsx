import { ArrowUpRight } from "lucide-react";

import { externalLinkProps, LinkButton } from "@/components/link-button";
import type { ProjectEmbed } from "@/data/projectsData";

/**
 * The real, running app inside a device frame.
 *
 * A screenshot shows what an app looked like; this lets someone use it without
 * leaving the page, which is the fastest way to prove the thing works.
 *
 * `loading="lazy"` matters here: the frame boots a whole second application, so
 * it should not compete with this page for bandwidth until it scrolls into view.
 * The sandbox allows scripts, same-origin storage and forms — enough for a real
 * app — while still blocking top-level navigation away from this site.
 */
export function LiveEmbed({ embed }: { embed: ProjectEmbed }) {
  const isPhone = embed.frame === "phone";

  return (
    <figure className="flex flex-col items-center gap-5">
      <div
        className={
          isPhone
            ? // A phone-shaped frame, capped so it never dominates a laptop screen.
              "relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border-[10px] border-foreground/85 bg-foreground/85 shadow-2xl shadow-foreground/20"
            : "relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-foreground/10"
        }
      >
        <iframe
          src={embed.url}
          title={embed.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          className={
            isPhone
              ? "block aspect-[9/19] w-full rounded-[1.4rem] bg-background"
              : "block aspect-[16/10] w-full bg-background"
          }
        />
      </div>

      <figcaption className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          This is the real app, running right here. Try it.
        </p>
        <LinkButton href={embed.url} size="sm" variant="outline" {...externalLinkProps}>
          Open in a new tab
          <ArrowUpRight data-icon="inline-end" />
        </LinkButton>
      </figcaption>
    </figure>
  );
}
