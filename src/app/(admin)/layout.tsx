import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Venje Realty",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
