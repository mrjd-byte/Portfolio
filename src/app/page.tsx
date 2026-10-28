import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { NavigationRows } from "@/components/home/NavigationRows";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#28251F] flex flex-col justify-between selection:bg-[#28251F] selection:text-[#F3EBDD]">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex-1 flex flex-col">
        {/* Compact Header */}
        <Header />

        {/* Hero Section */}
        <main className="flex-1">
          <Hero />

          {/* Navigation Rows (01 Projects, 02 Resume, 03 Contact) */}
          <NavigationRows />
        </main>

        {/* Compact Bottom Footer */}
        <Footer />
      </div>
    </div>
  );
}
