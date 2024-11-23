import type {Metadata} from "next";
import {Inter} from 'next/font/google'
import "./globals.css";

const font = Inter();

export const metadata: Metadata = {
  title: "Viktors Helpdesk",
  description: "Create, manage, and track helpdesk tickets.",
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
    <body className={`${font.className}`}
    >
    {children}
    </body>
    </html>
  );
}
