import React from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-spiritual min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-divine-glow py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                Our Sacred Journey
              </h1>
              <p className="text-xl text-text-primary max-w-3xl mx-auto">
                Serving devotees with authentic temple essentials and blessed prashad for generations
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/shop.jpg"
                  alt="Sah Prashad Bhandar Shop Front"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  Our Story
                </h2>
                <div className="prose text-text-primary">
                  <p className="mb-4">
                    Established at the sacred entrance of Golu Devta Temple in Ghorakhal,
                    Sah Prashad Bhandar has been serving devotees with pure and blessed
                    offerings for generations.
                  </p>
                  <p className="mb-4">
                    Our journey began with a simple mission - to provide authentic prashad
                    and temple essentials to the countless devotees who visit this holy shrine.
                    Over the years, we have maintained the same level of dedication and purity
                    in our offerings.
                  </p>
                  <p>
                    Today, we continue to uphold these sacred traditions while making it
                    easier for devotees across India to receive blessed items from
                    Golu Devta Temple through our online services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-divine">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-primary mb-8">
                To provide devotees with authentic, blessed prashad and high-quality
                temple essentials while maintaining the sanctity and traditions of
                Golu Devta Temple.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🙏</div>
                <h3 className="font-heading text-xl font-bold text-primary mb-4">
                  Authenticity
                </h3>
                <p className="text-text-primary">
                  Every item we offer is blessed at the temple and prepared with
                  pure ingredients following traditional methods.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="font-heading text-xl font-bold text-primary mb-4">
                  Quality
                </h3>
                <p className="text-text-primary">
                  We maintain the highest standards of quality in all our products,
                  from prashad to temple equipment.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-3xl mb-4">💝</div>
                <h3 className="font-heading text-xl font-bold text-primary mb-4">
                  Service
                </h3>
                <p className="text-text-primary">
                  Our commitment to serving devotees extends beyond transactions,
                  making their spiritual journey more meaningful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Temple Connection */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  Our Connection with Golu Devta Temple
                </h2>
                <div className="prose text-text-primary">
                  <p className="mb-4">
                    Located at the main entrance of the revered Golu Devta Temple,
                    we have been blessed to serve as a bridge between the temple and
                    its devotees.
                  </p>
                  <p className="mb-4">
                    Every item in our shop is blessed at the temple, carrying the
                    divine energy and blessings of Golu Devta to homes across the
                    country.
                  </p>
                  <p>
                    We take pride in maintaining the sanctity of the temple's
                    traditions while making these sacred offerings accessible to
                    devotees everywhere.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/goludevta.jpg"
                  alt="Golu Devta Temple"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 