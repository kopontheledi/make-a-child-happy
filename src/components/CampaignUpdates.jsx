
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Megaphone, CalendarDays, RefreshCw } from 'lucide-react'
import { db } from '../firebase/firebase'

export default function CampaignUpdates() {
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const updatesQuery = query(
          collection(db, 'campaign_updates'),
          where('published', '==', true)
        )

        const snapshot = await getDocs(updatesQuery)

        const publishedUpdates = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))

        publishedUpdates.sort((a, b) => {
          const dateA = a.createdAt?.toMillis?.() || 0
          const dateB = b.createdAt?.toMillis?.() || 0
          return dateB - dateA
        })

        setUpdates(publishedUpdates)
      } catch (err) {
        console.error('Campaign updates error:', err)
        setError('We could not load campaign updates.')
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return ''

    return timestamp.toDate().toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section id="updates" className="bg-[#faf7f0] px-5 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <span className="rounded-full bg-[#7d2636]/10 p-4 text-[#7d2636]">
              <Megaphone size={30} />
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#98723b]">
            Stay Connected
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold text-[#4b1f2a] md:text-5xl">
            Latest Campaign Updates
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#62594e]">
            Follow our journey, get important announcements and
            stay informed about the Make a Child Happy December campaign.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <RefreshCw
              size={30}
              className="animate-spin text-[#7d2636]"
            />
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 p-5 text-center text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && updates.length === 0 && (
          <div className="rounded-2xl border border-[#eee5d8] bg-white p-10 text-center">
            <Megaphone
              size={36}
              className="mx-auto mb-4 text-[#7d2636]"
            />

            <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
              Updates coming soon
            </h3>

            <p className="mt-2 text-[#62594e]">
              Check back soon for campaign news and announcements.
            </p>
          </div>
        )}

        {!loading && !error && updates.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {updates.map((update) => (
              <article
                key={update.id}
                className="overflow-hidden rounded-3xl border border-[#eee5d8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {update.imageUrl && (
                  <img
                    src={update.imageUrl}
                    alt={update.title}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-7">

                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#98723b]">
                    <CalendarDays size={15} />
                    {formatDate(update.createdAt)}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#4b1f2a]">
                    {update.title}
                  </h3>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#62594e]">
                    {update.content}
                  </p>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  )
}
