/**
 * The small caps label that opens each section, with a hairline running off to
 * the side. It gives the page a repeating landmark without needing a heading
 * above every heading.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}
