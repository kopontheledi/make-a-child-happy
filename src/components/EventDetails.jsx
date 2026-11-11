
import { CalendarDays, MapPin, Clock, Navigation } from 'lucide-react'

export default function EventDetails() {
  return (
    <section id="event" className="bg-[#faf7f0] px-5 py-20">
      <div className="mx-auto max-w-6xl">

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="md:grid md:grid-cols-2">

            {/* DATE */}
            <div className="bg-[#eadfcf] p-10 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#98723b]">
                Save The Date
              </p>

              <p className="mt-6 font-serif text-7xl font-bold text-[#7d2636]">
                21
              </p>

              <h2 className="font-serif text-3xl font-bold">
                November 2026
              </h2>
            </div>

            {/* EVENT INFORMATION */}
            <div className="p-10 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-[#7d2636]">
                Event Information
              </h2>

              <div className="mt-8 space-y-6">

                <div className="flex gap-4">
                  <CalendarDays className="shrink-0 text-[#98723b]" />

                  <div>
                    <b>Date</b>
                    <p className="mt-1 text-sm">21 November 2026</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="shrink-0 text-[#98723b]" />

                  <div>
                    <b>Location</b>
                    <p className="mt-1 text-sm leading-6">
                      623 Kwa Kgale, Phokeng, Rustenburg
                      <br />
                      Ora D Restaurant
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="shrink-0 text-[#98723b]" />

                  <div>
                    <b>Time</b>
                    <p className="mt-1 text-sm">
                      Contact the organisers for event times.
                    </p>
                  </div>
                </div>

              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Ora+D+Restaurant+Phokeng+Rustenburg"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#b89b6a] px-5 py-3 text-sm font-bold text-[#7d2636] transition hover:bg-[#7d2636] hover:text-white"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>

          </div>

          {/* GOOGLE MAP */}
          <div className="border-t border-gray-100">
            <div className="p-6 text-center md:p-8">
              <h3 className="font-serif text-2xl font-bold text-[#7d2636]">
                Find Us At Ora D Restaurant
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                623 Kwa Kgale, Phokeng, Rustenburg
              </p>
            </div>

            <div className="h-[300px] w-full md:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d899.5157419508113!2d27.174473269539813!3d-25.602823789167104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDM2JzEwLjIiUyAyN8KwMTAnMzAuNCJF!5e0!3m2!1sen!2sza!4v1794402996657!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ora D Restaurant location map"
                className="block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
