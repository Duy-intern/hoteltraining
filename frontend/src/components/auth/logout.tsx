// // useContext.ts hoặc tương tự
// import { useState, useContext, createContext, ReactNode } from "react";
// import { useRouter } from "next/navigation";

// interface AuthContextProps {
//   token: string | null;
//   user: { email: string } | null;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const useToken = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useToken must be used within AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null); // Giả sử token được lưu trữ tại đây
//   const [user, setUser] = useState<{ email: string } | null>(null);
//   const router = useRouter();

//   const logout = () => {
//     setToken(null);  // Xoá token trong state
//     setUser(null);   // Xoá thông tin user
//     router.push("/login"); // Điều hướng về trang login
//   };

//   const value = {
//     token,
//     user,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
