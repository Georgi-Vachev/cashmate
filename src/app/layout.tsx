import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className=" flex items-center justify-center">
        <main className="w-full h-full max-w-md bg-amber-400 p-6 rounded-lg shadow-md">
          {children}
        </main>
      </body>
    </html>
  );
}
