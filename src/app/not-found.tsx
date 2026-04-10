import Link from "next/link";
import { Search, Home, FileQuestion } from "lucide-react";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e6ea] p-8 md:p-12 max-w-xl w-full text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-[#1f2432] tracking-tight mb-4">
            404
          </h1>
          <h2 className="text-xl font-bold text-[#1f2432] mb-4">Record Not Found</h2>
          
          <p className="text-gray-500 font-medium mb-8 leading-relaxed">
            We couldn't locate the academic record or page you're searching for. Please check your seat number or URL and try again.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0056D2] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <Home className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>
        
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          University of Karachi · UBIT
        </p>
      </main>
    </div>
  );
}
