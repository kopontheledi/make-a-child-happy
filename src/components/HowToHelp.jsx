
import { useState } from 'react'
import { HandHeart, Building2, Users, MessageCircle } from 'lucide-react'

const contacts = [
  { name: 'Boipelo', number: '27834802829' },
  { name: 'Mono', number: '27760475595' },
  { name: 'Zee', number: '27846916200' },
  { name: 'Gouwe', number: '27660452687' },
]

const options = [
  {
    icon: HandHeart,
    title: 'Donate Items',
    text: 'Contribute clothing, toys, essentials or vouchers.',
    message:
      'Hello! I would like to donate towards the Make a Child Happy December campaign. Please let me know how I can contribute.',
    button: 'I Want To Donate',
  },
  {
    icon: Building2,
    title: 'Become A Sponsor',
    text: 'Businesses and organisations can support the campaign.',
    message:
      'Hello! I am interested in sponsoring the Make a Child Happy December campaign. Please share more information about sponsorship opportunities.',
    button: 'I Want To Sponsor',
  },
  {
    icon: Users,
    title: 'Volunteer',
    text: 'Offer your time to help collect, sort or prepare donations.',
    message:
      'Hello! I am interested in volunteering for the Make a Child Happy December campaign on 21 November 2026. Please let me know how I can get involved.',
    button: 'I Want To Volunteer',
  },
]

export default function HowToHelp() {
  const [selectedContacts, setSelectedContacts] = useState(
    options.map(() => contacts[0].number)
  )

  const handleContactChange = (index, number) => {
    setSelectedContacts((previous) =>
      previous.map((contact, i) => (i === index ? number : contact))
    )
  }

  const openWhatsApp = (message, number) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="ways-to-help" className="bg-[#7d2636] px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-white">
            Be Part Of The Joy
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
            There Are Many Ways To Help.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/75">
            Your kindness can make a difference. Choose how you would like
            to contribute and connect with our campaign team.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map(({ icon: Icon, title, text, message, button }, index) => (
            <div
              key={title}
              className="flex flex-col rounded-3xl border border-white/20 bg-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:bg-white/15"
            >
              <Icon size={36} className="text-white" />

              <h3 className="mt-6 font-serif text-2xl font-bold">
                {title}
              </h3>

              <p className="mt-3 flex-1 leading-7 text-white/75">
                {text}
              </p>

              <div className="mt-7">
                <label
                  htmlFor={`organiser-${index}`}
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Choose an organiser
                </label>

                <select
                  id={`organiser-${index}`}
                  value={selectedContacts[index]}
                  onChange={(e) =>
                    handleContactChange(index, e.target.value)
                  }
                  className="w-full rounded-xl border border-white/30 bg-[#68202f] px-4 py-3 text-sm text-white outline-none focus:border-white"
                >
                  {contacts.map((contact) => (
                    <option
                      key={contact.number}
                      value={contact.number}
                    >
                      {contact.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    openWhatsApp(message, selectedContacts[index])
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#4b1f2a] transition hover:bg-gray-200"
                >
                  <MessageCircle size={18} />
                  {button}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/65">
          Thank you for being part of the joy. Every contribution matters!
        </p>

      </div>
    </section>
  )
}
