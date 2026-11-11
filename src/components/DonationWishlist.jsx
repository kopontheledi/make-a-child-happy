import { Shirt, ToyBrick, Package, Ticket } from 'lucide-react'

const donations = [
  {
    icon: Shirt,
    title: 'Clothing',
    text: 'Children’s clothes, warm jackets and everyday essentials.',
  },
  {
    icon: ToyBrick,
    title: 'Toys & Games',
    text: 'Toys, books, puzzles and games that bring smiles.',
  },
  {
    icon: Package,
    title: 'Useful Essentials',
    text: 'Blankets, toiletries and other helpful items.',
  },
  {
    icon: Ticket,
    title: 'Coupons & Vouchers',
    text: 'Gift vouchers or coupons to support the children.',
  },
]

export default function DonationWishlist() {
  return (
    <section id="donations" className="bg-white px-5 py-20">
      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[3px] text-xs text-[#98723b] font-bold">
          Donation Wishlist
        </p>

        <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
          What Can You Give?
        </h2>

        <p className="mt-5 max-w-2xl text-[#62594e] leading-7">
          The campaign welcomes donations that can make
          Christmas more special. Here are some ideas
          to get you started.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {donations.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-[#faf7f0] border border-[#eee5d8] rounded-3xl p-7 hover:shadow-lg transition">
              <div className="bg-[#eadfcf] text-[#7d2636] p-4 rounded-full w-fit">
                <Icon size={25} />
              </div>

              <h3 className="font-serif text-2xl font-bold mt-6">
                {title}
              </h3>

              <p className="text-sm text-[#62594e] leading-7 mt-3">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}