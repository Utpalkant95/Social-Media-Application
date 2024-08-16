import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib";
import { Sidebar } from "@/components";
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
  console.log("current", currentPath);
  

  // List of paths where the sidebar should not be shown
  const noSidebarPaths = ["/account/sign-in", "/account/sign-up", "/account/password/reset", "/api/api-doc"];

  // Check if the current pathname is in the list of no-sidebar paths
  const showSidebar = !noSidebarPaths.includes(currentPath);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="grid grid-cols-[max-content_1fr]">
              <div>
                {showSidebar && <Sidebar />}
              </div>
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
