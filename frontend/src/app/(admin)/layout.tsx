  import { ReactNode } from "react";
  import { AuthProvider } from "@/components/hooks/useContext";
import AppLayout from "@/components/layouts/AppLayout";

  interface RootAdminLayoutProps {
    children: ReactNode;  
  }
  export default function AdminLayout({ children }: RootAdminLayoutProps) {
    return (
      <html lang="en" >
        <body>
          <AuthProvider>
            <AppLayout>
            {children}
            </AppLayout>
            </AuthProvider>
        </body>
      </html>
    );
  }

