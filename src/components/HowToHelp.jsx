import { HandHeart, Building2, Users } from 'lucide-react'

const options = [
  {
    icon: HandHeart,
    title: 'Donate Items',
    text: 'Contribute clothing, toys, essentials or vouchers.',
  },
  {
    icon: Building2,
    title: 'Become A Sponsor',
    text: 'Businesses and organisations can support the campaign.',
  },
  {
    icon: Users,
    title: 'Volunteer',
    text: 'Offer your time to help collect, sort or prepare donations.',
  },
]

export default function HowToHelp() {
  return (
    <section id="ways-to-help" className="bg-[#7d2636] px-5 py-20 text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">
          <p className="uppercase tracking-[3px] text-xs text-[#e5c995] font-bold">
            Be Part Of The Joy
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
            There Are Many Ways To Help.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {options.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-white/20 bg-white/10 rounded-3xl p-8">
              <Icon size={32} className="text-[#e5c995]" />

              <h3 className="font-serif text-2xl font-bold mt-6">
                {title}
              </h3>

              <p className="mt-3 leading-7 text-white/75">
                {text}
              </p>

              <a href="#contact" className="inline-block mt-6 text-[#f1d9aa] underline text-sm font-bold">
                I'm Interested
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}