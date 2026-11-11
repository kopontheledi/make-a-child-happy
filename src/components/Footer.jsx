import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#211b18] px-5 py-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

        <div>
          <h2 className="font-serif text-xl font-bold">
            Make a Child Happy December
          </h2>

          <p className="text-xs text-white/60 mt-2">
            A Kumpu Gang Initiative · 2026
          </p>
        </div>

        <p className="flex items-center gap-2 text-xs text-white/60">
          Made with <Heart size={14} className="text-[#d6ad72]" fill="currentColor" />
          to spread joy · Website by OP Digital Creations
        </p>

      </div>
    </footer>
  )
}