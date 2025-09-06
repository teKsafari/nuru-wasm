import { ExternalLink } from "lucide-react";

export default function SoftwarePage() {
  return (
    <main className="font-mono min-h-screen p-4 md:p-8 pt-14 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Software Playground</h1>
          <a 
            href="https://nuru-playground.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-accent hover:underline gap-1 text-sm"
          >
            <span>Open in new tab</span>
            <ExternalLink size={16} />
          </a>
        </div>
        <p className="mb-8 text-muted-foreground">
          Tengeneza Program kwa lugha mama - Nuru!
        </p>
        
        <div className="p-1. border-[0.5px] border-accent/100 w-full h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(255,154,0,0.25)]/">
          <iframe 
            src="https://nuru-playground.vercel.app/" 
            className="w-full h-full rounded-md"
            title="Nuru Software Playground" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; geolocation; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
