import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Building2, Heart, RefreshCw, ExternalLink } from 'lucide-react'
import { db } from '../firebase/firebase'

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadSponsors = async () => {
    try {
      setLoading(true)
      setError(false)

      const sponsorsQuery = query(
        collection(db, 'sponsors'),
        where('published', '==', true)
      )

      const snapshot = await getDocs(sponsorsQuery)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      data.sort((a, b) => {
        const dateA = a.createdAt?.toMillis?.() || 0
        const dateB = b.createdAt?.toMillis?.() || 0
        return dateB - dateA
      })

      setSponsors(data)
    } catch (err) {
      console.error('Error loading sponsors:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSponsors()
  }, [])

  return (
    <section id="sponsors" className="bg-[#faf7f0] px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#7d2636]">
            Making a Difference Together
          </span>

          <h2 className="mt-4 font-serif text-3xl font-bold text-[#4b1f2a] md:text-5xl">
            Our Sponsors & Partners
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            We are grateful to every business, organisation and individual
            supporting our mission. Your generosity helps us bring smiles,
            hope and happiness to children this festive season.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[#7d2636]">
            <RefreshCw className="mx-auto mb-3 animate-spin" size={28} />
            <p>Loading our sponsors...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-gray-600">
              We couldn't load our sponsors at the moment.
            </p>
            <button
              onClick={loadSponsors}
              className="mt-4 font-semibold text-[#7d2636] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : sponsors.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-[#eadfe0] bg-white p-10 text-center">
            <Heart className="mx-auto mb-4 text-[#7d2636]" size={38} />

            <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
              Every Contribution Matters
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              We look forward to recognising the amazing sponsors and
              partners who join us in making this campaign possible.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group rounded-2xl border border-[#eadfe0] bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-[#faf7f0] p-5">
                  {sponsor.logoUrl ? (
                    <img
                      src={sponsor.logoUrl}
                      alt={`${sponsor.name} logo`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Building2 size={48} className="text-[#7d2636]" />
                  )}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-[#7d2636]">
                  {sponsor.category}
                </span>

                <h3 className="mt-2 font-serif text-xl font-bold text-[#4b1f2a]">
                  {sponsor.name}
                </h3>

                {sponsor.description && (
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {sponsor.description}
                  </p>
                )}

                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7d2636] hover:text-[#4b1f2a]"
                  >
                    Visit Sponsor
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-[#4b1f2a] px-6 py-12 text-center text-white md:px-12">
          <Heart className="mx-auto mb-4" size={32} />

          <h3 className="font-serif text-2xl font-bold md:text-3xl">
            Become a Sponsor
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
            Your organisation can help us make a meaningful difference
            in the lives of children. Join our campaign and become part
            of something special.
          </p>

          <a
            href="#contact"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#4b1f2a] transition hover:bg-[#f5e8e9]"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  )
}
