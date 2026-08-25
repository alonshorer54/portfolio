import { siteConfig } from "@/data/siteConfig";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>Built with Next.js, Tailwind CSS and shadcn/ui.</p>
      </div>
    </footer>
  );
}
