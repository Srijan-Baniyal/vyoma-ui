import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeCustomizerProvider } from "@/contexts/ThemeCustomizerContext";

export default function ThemesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ThemeCustomizerProvider>
          <ThemeSwitcher />
        </ThemeCustomizerProvider>
      </main>
      <Footer />
    </>
  );
}