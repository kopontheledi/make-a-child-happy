import { HeartHandshake } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="bg-white px-5 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div>
          <p className="uppercase tracking-[3px] text-xs text-[#98723b] font-bold">
            The heart behind the campaign
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
            A season of giving, a reason to smile.
          </h2>
        </div>

        <div className="bg-[#faf7f0] rounded-3xl p-8">
          <HeartHandshake size={38} className="text-[#98723b]" />

          <p className="mt-5 leading-8 text-[#62594e]">
            Make a Child Happy December is a Kumpu Gang
            initiative created to bring extra happiness to
            children during the festive season.
          </p>

          <p className="mt-4 leading-8 text-[#62594e]">
            We invite individuals, families and businesses
            to contribute clothing, toys, coupons and other
            thoughtful donations.
          </p>

          <p className="mt-4 leading-8 text-[#62594e]">
            Every contribution matters. Your kindness can
            help make Christmas more special for a child.
          </p>
        </div>

      </div>
    </section>
  )
}