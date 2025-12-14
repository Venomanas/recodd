export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="w-full max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
    {children}
  </div>
);
