"use client";

import { Inter } from "next/font/google";
import { ModalProvider } from "@/components/Modal/context";
import { ModalContainer } from "@/components/Modal/useModal";
import { RecoilRoot } from "recoil";
import "../globals.css";
import { MSWComponent } from "./MSWComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <MSWComponent />
        <RecoilRoot>
          <ModalProvider>
            {children}
            <ModalContainer />
            <div id="modal-root" />
          </ModalProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
