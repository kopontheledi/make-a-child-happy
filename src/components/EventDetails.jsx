import { CalendarDays, MapPin, Clock, Navigation } from 'lucide-react'

export default function EventDetails() {
  return (
    <section id="event" className="bg-[#faf7f0] px-5 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden md:grid md:grid-cols-2">

        <div className="bg-[#eadfcf] p-10">
          <p className="uppercase tracking-[3px] text-xs text-[#98723b] font-bold">
            Save The Date
          </p>

          <p className="font-serif text-7xl font-bold text-[#7d2636] mt-6">
            21
          </p>

          <h2 className="font-serif text-3xl font-bold">
            November 2026
          </h2>
        </div>

        <div className="p-10">
          <h2 className="font-serif text-3xl font-bold">
            Event Information
          </h2>

          <div className="mt-8 space-y-6">

            <div className="flex gap-4">
              <CalendarDays className="text-[#98723b]" />
              <div>
                <b>Date</b>
                <p className="text-sm mt-1">21 November 2026</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="text-[#98723b]" />
              <div>
                <b>Location</b>
                <p className="text-sm mt-1 leading-6">
                  623 Kwa Kgale, Phokeng, Rustenburg
                  <br />
                  Ora D Restaurant
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-[#98723b]" />
              <div>
                <b>Time</b>
                <p className="text-sm mt-1">
                  Contact the organisers for event times.
                </p>
              </div>
            </div>

          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Ora+D+Restaurant+Phokeng+Rustenburg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex gap-2 items-center mt-8 border border-[#b89b6a] px-5 py-3 rounded-full text-sm font-bold"
          >
            <Navigation size={16} />
            Find The Venue
          </a>
        </div>

      </div>
    </section>
  )
}