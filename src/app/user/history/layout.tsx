import "../../globals.css";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div
            className={`antialiased bg-gray-100`}>
            {children}
        </div>
    );
}
