export default function AlbumsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
