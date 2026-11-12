
import { useState } from 'react'
import { Menu, X, Heart, HandHeart } from 'lucide-react'

const links = [
  ['Our Story', '#about'],
  ['Our Mission', '#mission'],
  ['Donations', '#donations'],
  ['Updates', '#updates'],
  ['Sponsors', '#sponsors'],
  ['Event', '#event'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9dfd0] bg-[#faf7f0]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* BRAND */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-[#7d2636] p-3 text-white">
            <Heart size={20} fill="currentColor" />
          </div>

          <div>
            <h1 className="font-serif text-lg font-bold text-[#4b1f2a]">
              MAKE A CHILD HAPPY
            </h1>
            <p className="text-[10px] uppercase tracking-[3px] text-[#7d2636]">
              A Kumpu Gang Initiative
            </p>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 transition hover:text-[#7d2636]"
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#7d2636] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4b1f2a]"
          >
            <HandHeart size={17} />
            Get Involved
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="rounded-lg p-2 text-[#4b1f2a] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {open && (
        <div className="flex flex-col gap-5 border-t border-[#e9dfd0] bg-[#faf7f0] px-5 py-6 lg:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 transition hover:text-[#7d2636]"
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#7d2636] px-5 py-3 text-sm font-semibold text-white"
          >
            <HandHeart size={17} />
            Get Involved
          </a>
        </div>
      )}
    </header>
  )
}
