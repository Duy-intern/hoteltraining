  import { ReactNode } from "react";
  import { AuthProvider } from "@/components/hooks/useContext";

  interface RootAdminLayoutProps {
    children: ReactNode;  
  }
  export default function AdminLayout({ children }: RootAdminLayoutProps) {
    return (
      <html lang="en" >
        <body>
          <AuthProvider>
            {children}
            </AuthProvider>
        </body>
      </html>
    );
  }

