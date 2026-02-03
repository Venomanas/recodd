export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))]">
    {children}
  </h1>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[rgb(var(--text))]">
    {children}
  </h2>
);

export const Muted = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[rgb(var(--muted))] text-sm md:text-base">{children}</p>
);
