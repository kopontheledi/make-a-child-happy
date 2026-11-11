import { Gift, HandHeart, Sparkles } from 'lucide-react'

const items = [
  {
    icon: Gift,
    title: 'Share What You Can',
    text: 'Clothing, toys and useful everyday items can make meaningful gifts.',
  },
  {
    icon: HandHeart,
    title: 'Give In Your Own Way',
    text: 'Donate items, contribute vouchers, volunteer or connect us with sponsors.',
  },
  {
    icon: Sparkles,
    title: 'Spread The Joy',
    text: 'Every act of generosity helps create a happier festive season.',
  },
]

export default function Mission() {
  return (
    <section id="mission" className="bg-[#f2eadf] px-5 py-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[3px] text-xs text-[#98723b] font-bold">
            Why It Matters
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
            Small Acts. Big Happiness.
          </h2>

          <p className="mt-5 text-[#62594e] leading-7">
            Our mission is to bring people together through
            generosity and make the festive season brighter
            for children.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-[#faf7f0] border border-[#e2d5c2] rounded-3xl p-8">
              <div className="bg-[#7d2636] text-white p-4 rounded-2xl w-fit">
                <Icon size={26} />
              </div>

              <h3 className="font-serif text-2xl font-bold mt-6">
                {title}
              </h3>

              <p className="mt-3 text-[#62594e] leading-7">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}