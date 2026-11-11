import { ArrowDown, CalendarDays, MapPin } from 'lucide-react'

export default function Hero() {
    return (
        <section id="home" className="bg-[#f2eadf]">
            <div className="max-w-7xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

                <div>
                    <p className="uppercase tracking-[4px] text-xs text-[#98723b] font-bold">
                        A Kumpu Gang Initiative
                    </p>

                    <h1 className="font-serif text-5xl md:text-7xl font-bold mt-6 leading-tight">
                        Make a Child
                        <span className="block">Happy</span>
                        <span className="block text-[#98723b] italic font-normal">
                            December.
                        </span>
                    </h1>

                    <p className="mt-6 text-[#62594e] leading-8 max-w-lg">
                        A little kindness can make a big difference.
                        Help us bring warmth, joy and Christmas magic
                        to children through your donations.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#donations" className="bg-[#7d2636] text-white px-6 py-4 rounded-full font-semibold flex items-center gap-2">
                            See What You Can Donate
                            <ArrowDown size={17} />
                        </a>

                        <a href="#about" className="border border-[#b89b6a] px-6 py-4 rounded-full">
                            Our Story
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-9 pt-6 border-t border-[#d8cbb8] text-sm">
                        <span className="flex gap-2 items-center">
                            <CalendarDays size={17} />
                            21 November 2026
                        </span>

                        <span className="flex gap-2 items-center">
                            <MapPin size={17} />
                            Ora D Restaurant, Phokeng
                        </span>
                    </div>
                </div>

                <div className="w-full  rounded-[2rem] shadow-xl">
                    <img
                        src="/images/make-a-child-happy.jpg"
                        alt="Christmas presents"
                        className="w-full  object-center"
                    />
                </div>

            </div>
        </section>
    )
}