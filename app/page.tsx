import React from "react";
import WaitingListForm from "@/components/WaitingListForm";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sand to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ubuntu mb-6">
            Join the SOTR-APP Waiting List
          </h1>
          <p className="text-xl text-warmgray mb-4">
            Be among the first to experience the future of Bitcoin payments in Africa
          </p>
          <p className="text-lg text-warmgray">
            Get early access to our revolutionary payment routing platform
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-ubuntu mb-2">
                Reserve Your Spot
              </h2>
              <p className="text-warmgray">
                Fill out the form below and we'll notify you as soon as SOTR-APP is ready.
              </p>
            </div>
            <WaitingListForm />
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ubuntu text-center mb-12">
            Why Join SOTR-APP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-display text-xl font-bold text-ubuntu mb-3">
                Instant Payments
              </h3>
              <p className="text-warmgray">
                Send and receive Bitcoin payments instantly with real-time settlement
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="font-display text-xl font-bold text-ubuntu mb-3">
                Secure & Non-Custodial
              </h3>
              <p className="text-warmgray">
                Your Bitcoin stays yours. We never hold your funds - complete control in your hands
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="font-display text-xl font-bold text-ubuntu mb-3">
                Built for Africa
              </h3>
              <p className="text-warmgray">
                Designed specifically for African merchants and Bitcoiners, supporting local currencies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ubuntu text-center mb-12">
            How SOTR-APP Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sahara text-white rounded-full flex items-center justify-center font-display font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ubuntu mb-2">
                  Users Pay with Bitcoin
                </h3>
                <p className="text-warmgray">
                  Bitcoiners can pay merchants directly using Bitcoin - no conversion needed, Bitcoin stays Bitcoin.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sahara text-white rounded-full flex items-center justify-center font-display font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ubuntu mb-2">
                  Real-Time Routing
                </h3>
                <p className="text-warmgray">
                  SOTR-APP routes the payment instantly, converting Bitcoin to local currency in real-time.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sahara text-white rounded-full flex items-center justify-center font-display font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ubuntu mb-2">
                  Merchants Receive Payment
                </h3>
                <p className="text-warmgray">
                  Merchants receive payment in their preferred currency (Bitcoin or local currency) without any crypto complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SATSONTHEROAD Goals Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ubuntu mb-4">
              Goals for #SATSONTHEROAD
            </h2>
            <p className="text-lg text-warmgray max-w-2xl mx-auto">
              Join us in building the future of Bitcoin payments in Africa. Together, we're setting ambitious goals to transform how payments work across the continent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Goal 1: Users */}
            <Card className="text-center bg-gradient-to-br from-sand to-white">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="font-display text-2xl font-bold text-ubuntu mb-2">
                5K - 10K Users
              </h3>
              <p className="text-warmgray text-sm">
                Build a strong community of Bitcoiners ready to revolutionize payments
              </p>
              <div className="mt-4 pt-4 border-t border-ubuntu/20">
                <span className="text-sahara font-display font-bold text-lg">Target</span>
              </div>
            </Card>

            {/* Goal 2: Ambassadors */}
            <Card className="text-center bg-gradient-to-br from-sand to-white">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="font-display text-2xl font-bold text-ubuntu mb-2">
                200 - 500 Ambassadors
              </h3>
              <p className="text-warmgray text-sm">
                Volunteer sales representatives spreading SOTR-APP across Nigeria
              </p>
              <div className="mt-4 pt-4 border-t border-ubuntu/20">
                <span className="text-sahara font-display font-bold text-lg">Target</span>
              </div>
            </Card>

            {/* Goal 3: Merchants */}
            <Card className="text-center bg-gradient-to-br from-sand to-white">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="font-display text-2xl font-bold text-ubuntu mb-2">
                50 - 100 Merchants
              </h3>
              <p className="text-warmgray text-sm">
                Onboard businesses ready to accept Bitcoin payments seamlessly
              </p>
              <div className="mt-4 pt-4 border-t border-ubuntu/20">
                <span className="text-sahara font-display font-bold text-lg">Target</span>
              </div>
            </Card>

            {/* Goal 4: Media Content */}
            <Card className="text-center bg-gradient-to-br from-sand to-white">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="font-display text-2xl font-bold text-ubuntu mb-2">
                Documentary & Media
              </h3>
              <p className="text-warmgray text-sm">
                Capture compelling content to showcase the app's impact and growth
              </p>
              <div className="mt-4 pt-4 border-t border-ubuntu/20">
                <span className="text-sahara font-display font-bold text-lg">Target</span>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-warmgray mb-6">
              Be part of this journey. Join the waiting list and help us achieve these goals!
            </p>
            <a
              href="#top"
              className="inline-block px-8 py-3 bg-sahara text-white rounded-xl font-display font-semibold hover:bg-sunset transition-all duration-200"
            >
              Join #SATSONTHEROAD
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-ubuntu text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Payments in Africa?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of early adopters and be part of the Bitcoin revolution
          </p>
          <a
            href="#top"
            className="inline-block px-8 py-4 bg-sahara text-white rounded-xl font-display font-semibold hover:bg-sunset transition-all duration-200"
          >
            Join Waiting List
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-night text-white text-center">
        <p className="text-warmgray">
          © {new Date().getFullYear()} SOTR-APP. All rights reserved. | Powered by BitKwa
        </p>
      </footer>
    </div>
  );
}

