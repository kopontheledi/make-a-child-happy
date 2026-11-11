import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Mission from '../components/Mission'
import DonationWishlist from '../components/DonationWishlist'
import HowToHelp from '../components/HowToHelp'
import EventDetails from '../components/EventDetails'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Countdown from '../components/Countdown'

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Countdown />
        <About />
        <Mission />
        <DonationWishlist />
        <HowToHelp />
        <EventDetails />
        <Contact />
      </main>

      <Footer />
    </>
  )
}