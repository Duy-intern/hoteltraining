
import MenuTop from "@/components/layouts/MenuTop";
import { ReactNode } from "react";
    interface RootLayoutProps {
    children: ReactNode;  
  }
  export default function RootLayout({children}:RootLayoutProps) {
    return (
    <div>       
    <MenuTop />

{children}</div>
    );
  }

