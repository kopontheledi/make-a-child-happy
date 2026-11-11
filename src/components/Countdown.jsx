
import { useEffect, useState } from 'react'

const EVENT_DATE = new Date('2026-11-21T00:00:00+02:00').getTime()

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft())

    function getTimeLeft() {
        const difference = EVENT_DATE - Date.now()

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            finished: false,
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const units = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ]

    return (
        <section className="bg-[#4b1f2a] px-5 py-16 text-white">
            <div className="mx-auto max-w-5xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                    Magobenyana Presents
                </p>

                <h2 className="mb-3 font-serif text-3xl font-bold md:text-4xl">
                    The Countdown Is On!
                </h2>

                <p className="mb-10 text-white">
                    Every child deserves a reason to smile. Help us make this December special.
                </p>

                {timeLeft.finished ? (
                    <h3 className="text-2xl font-bold text-white">
                        The event day is here!
                    </h3>
                ) : (
                    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                        {units.map((unit) => (
                            <div
                                key={unit.label}
                                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-6"
                            >
                                <div className="font-serif text-4xl font-bold text-white md:text-6xl">
                                    {String(unit.value).padStart(2, '0')}
                                </div>
                                <p className="mt-2 text-sm uppercase tracking-widest text-white/80">
                                    {unit.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-300/30 bg-white/10 p-6">
                    <h3 className="mb-3 font-serif text-xl font-bold text-white">
                        Donation Drop-off Information
                    </h3>

                    <p className="leading-relaxed text-white/90">
                        You may drop off anything you would like to donate at
                        <strong> Ora D Restaurant</strong>, from
                        <strong> 09:00 to 17:00</strong>, Monday 16 November to Friday
                        20 November 2026.

                        <br /><br />

                        On Saturday, 21 November 2026, donations can be dropped off from
                        <strong> 13:00 till late</strong>.
                    </p>

                    <p className="mt-4 text-sm text-white/70">
                        Every contribution makes a difference. Thank you for helping us
                        make a child happy!
                    </p>
                </div>

                <p className="mt-8 text-sm text-white/70">
                    21 November 2026 · Ora D Restaurant · Phokeng
                </p>
            </div>
        </section>
    )
}
