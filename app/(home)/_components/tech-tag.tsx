export const TechTag = ({ children }: { children: string }) => (
    <span className="px-3 py-1 text-xs border border-secondary/40 bg-secondary/20 text-foreground rounded-full hover:border-primary/60 hover:bg-primary/10 transition-all duration-300">
      {children}
    </span>
  );