import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib";
import { MobileViewNavbar, MobileViewSidebar, Sidebar } from "@/components";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snapify",
  description: "Generated by Utpal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const currentPath = headersList.get("x-current-path") || "/api/api-doc";

  // List of paths where the sidebar should not be shown
  const noSidebarPaths = [
    "/account/sign-in",
    "/account/sign-up",
    "/account/password/reset",
    "/account/verify",
    "/api/api-doc",
  ];

  // Check if the current pathname is in the list of no-sidebar paths
  const showSidebar = !noSidebarPaths.includes(currentPath);

  const noMobileNavbar = [
    "/api/api-doc",
    "/"
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="hidden md:grid grid-cols-[max-content_1fr]">
            <div className=" hidden md:block">{showSidebar && <Sidebar />}</div>
            <div className="overflow-y-scroll h-screen">{children}</div>
          </main>
          <div className="md:hidden h-screen flex flex-col">
            <header className="sticky top-0 z-10">
              {showSidebar && noMobileNavbar.includes(currentPath) ? <MobileViewNavbar /> : ""}
            </header>
            <main className="flex-grow overflow-y-auto">
              {children}
            </main>
            <footer className="sticky bottom-0">
              {showSidebar && <MobileViewSidebar />}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
