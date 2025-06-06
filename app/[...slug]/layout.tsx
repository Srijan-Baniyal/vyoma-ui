import SidebarComponent from "@/components/SidebarComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SidebarComponent>{children}</SidebarComponent>
    </div>
  );
}
