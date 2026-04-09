import { Nav } from "@/components/nav";
import { Github, Linkedin, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About the Developer",
  description: "Learn more about the developer behind the UBIT Results Portal.",
};

export default function DeveloperPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f8]">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e6ea] overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-[#00255d] relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('/ubit-logo.jpg')] bg-center bg-no-repeat bg-contain blur-sm"></div>
              <h1 className="relative z-10 text-white font-bold text-2xl tracking-wide uppercase">About the Developer</h1>
          </div>
          
          <div className="p-8 sm:p-12 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-8 w-24 h-24 bg-white rounded-full p-2 shadow-md">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
                👨‍💻
              </div>
            </div>

            <div className="mt-12 sm:mt-8">
              <h2 className="text-[24px] font-bold text-[#1f2432] mb-1">Made with <Heart className="inline w-5 h-5 text-red-500 mx-1 fill-red-500" /> for UBIT</h2>
              <p className="text-[14px] text-[#0056D2] font-semibold mb-6">BSSE Batch 2025 Initiative</p>

              <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
                <p>
                  I built this academic results portal to make it easy for students to find all their course grades in one unified place. Instead of scattered PDFs and manual math, I wanted an architecture that dynamically tracks performance without the hassle.
                </p>
                <p>
                  There is <span className="font-semibold text-gray-900">no need to calculate your semester GPAs and CGPAs again and again</span>. Everything is automated, immediately updated, and reliably maintained right here for the ease of everyone in batch 2025. My goal is simple: to save everyone's time so we can focus on what actually matters—our studies and careers.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-[#1f2432] text-sm uppercase tracking-widest mb-4">Connect With Me</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://linkedin.com/in/codewithmahad" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                  <a href="https://github.com/codewithmahad" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#24292e] text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition">
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                  <a href="https://chat.whatsapp.com/G6rOqzJ0RDQ7YgURVYu8JU" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition">
                    <MessageCircle className="w-5 h-5" /> UBIT Community
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
