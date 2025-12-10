export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="py-16 px-8 md:px-0 flex items-center justify-center">
        {children}
      </div>
  );
}
