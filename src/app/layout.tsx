import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full flex items-center justify-center">
        <main className="w-full max-w-md bg-gray-600 p-6 rounded-lg shadow-md">
          {children}
        </main>
      </body>
    </html>
  );
}
