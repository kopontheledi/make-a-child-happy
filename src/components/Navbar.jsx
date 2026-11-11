import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'

const links = [
  ['Our Story', '#about'],
  ['Our Mission', '#mission'],
  ['Donations', '#donations'],
  ['Event', '#event'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f0]/95 backdrop-blur border-b border-[#e9dfd0]">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        <a href="#home" className="flex items-center gap-3">
          <div className="bg-[#7d2636] text-white p-3 rounded-full">
            <Heart size={20} fill="currentColor" />
          </div>

          <div>
            <h1 className="font-serif font-bold text-lg">
              MAKE A CHILD HAPPY
            </h1>
            <p className="text-[10px] tracking-[3px] text-[#98723b] uppercase">
              A Kumpu Gang Initiative
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm hover:text-[#98723b]">
              {label}
            </a>
          ))}

          <a href="#contact" className="bg-[#7d2636] text-white px-5 py-3 rounded-full text-sm">
            Get Involved
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col gap-5 px-5 pb-5">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Get Involved
          </a>
        </div>
      )}
    </header>
  )
}