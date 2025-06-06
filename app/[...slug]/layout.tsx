import SidebarComponent from "@/components/SidebarComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarComponent>{children}</SidebarComponent>;
}
