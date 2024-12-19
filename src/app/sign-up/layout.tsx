
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`bg-gray-100 antialiased`}
      >
        {children}
      </div>
  );
}
