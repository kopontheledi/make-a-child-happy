
import { useEffect, useState } from 'react'
import {
  Gift,
  RefreshCw,
  Heart,
} from 'lucide-react'

import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

export default function DonationWishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true)
        setError('')

        const wishlistQuery = query(
          collection(db, 'wishlist_items'),
          where('published', '==', true)
        )

        const snapshot = await getDocs(wishlistQuery)

        const publishedItems = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))

        publishedItems.sort((a, b) => {
          const dateA = a.createdAt?.toMillis?.() || 0
          const dateB = b.createdAt?.toMillis?.() || 0
          return dateB - dateA
        })

        setItems(publishedItems)
      } catch (err) {
        console.error('Wishlist error:', err)
        setError('Unable to load donation items. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  return (
    <section id="donations" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#98723b]">
            Donation Wishlist
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold text-[#4b1f2a] md:text-5xl">
            What Can You Give?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#62594e]">
            Every contribution makes a difference. Explore the items
            our organisers are currently requesting for the campaign.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <RefreshCw
              className="animate-spin text-[#7d2636]"
              size={30}
            />
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="rounded-3xl bg-[#faf7f0] px-6 py-12 text-center">
            <Heart
              size={40}
              className="mx-auto mb-4 text-[#7d2636]"
            />

            <h3 className="font-serif text-2xl font-bold text-[#4b1f2a]">
              Wishlist coming soon
            </h3>

            <p className="mt-3 text-[#62594e]">
              Our organisers will be sharing donation requests shortly.
            </p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-[#eee5d8] bg-[#faf7f0] transition hover:-translate-y-1 hover:shadow-lg"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-[#eadfcf]">
                    <Gift size={55} className="text-[#7d2636]" />
                  </div>
                )}

                <div className="p-7">

                  <span className="rounded-full bg-[#eadfcf] px-3 py-1 text-xs font-bold text-[#7d2636]">
                    {item.category || 'Donation'}
                  </span>

                  <h3 className="mt-5 font-serif text-2xl font-bold text-[#4b1f2a]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-sm leading-7 text-[#62594e]">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2 border-t border-[#eee5d8] pt-5 text-sm font-semibold text-[#7d2636]">
                    <Heart size={17} />
                    Your donation can make a difference
                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  )
}
