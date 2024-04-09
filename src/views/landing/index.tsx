import HeaderAboutSection from '@/views/landing/header-about-section'
import ContactSection from '@/views/landing/contact-section'
import LandingFooter from '@/views/landing/footer'
import PricesSection from '@/views/landing/prices-section'
import ServicesSection from '@/views/landing/services-section'

const LandingView = () => {
    return (
        <>
            <HeaderAboutSection />
            <ServicesSection />
            <PricesSection />
            <ContactSection />
            <LandingFooter />
        </>
    )
}

export default LandingView
