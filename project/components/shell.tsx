interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8" {...props}>
      {children}
    </div>
  );
}