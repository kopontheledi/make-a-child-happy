import { Phone, MessageCircle } from 'lucide-react'

const contacts = [
  { name: 'Boipelo', number: '0834802829' },
  { name: 'Mono', number: '0760475595' },
  { name: 'Zee', number: '0846916200' },
  { name: 'Gouwe', number: '0660452687' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-5 py-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[3px] text-xs text-[#98723b] font-bold">
            Let's Make It Happen
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
            Ready To Make A Child Happy?
          </h2>

          <p className="mt-5 text-[#62594e] leading-7">
            Contact one of the campaign organisers to arrange
            a donation or discuss sponsorship and volunteering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {contacts.map(({ name, number }) => (
            <a
              key={name}
              href={`https://wa.me/27${number.slice(1)}?text=${encodeURIComponent(
                'Hello, I would like to support the Make a Child Happy December initiative. Please share more information.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#faf7f0] border border-[#eee5d8] rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="bg-[#7d2636] text-white p-3 rounded-full w-fit">
                <MessageCircle size={20} />
              </div>

              <h3 className="font-serif text-xl font-bold mt-5">
                {name}
              </h3>

              <p className="flex items-center gap-2 text-sm text-[#62594e] mt-2">
                <Phone size={14} />
                {number}
              </p>

              <p className="text-xs font-bold text-[#7d2636] mt-5">
                Chat On WhatsApp →
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}