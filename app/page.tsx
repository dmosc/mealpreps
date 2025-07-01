import {
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">mealpreps</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Order now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Meal prepping that&apos;s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                healthy, convenient & smart.
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hyper-personalized meals from all around the world that are made
              with love, macro & calorie-conscious delivered right at your
              doorstep.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                >
                  Start eating better
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-16 hidden lg:block">
          <div className="size-12 bg-gray-800 rounded-full flex items-center justify-center">
            <Truck className="size-6 text-blue-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why choose mealpreps?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Healthy, convenient & smart.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/30">
              <div className="size-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Healthy & delicious
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Macros & calorie-aware, super tasteful international meal
                options made from scratch with high-quality, minimal
                ingredients. No shortcuts, no fillers — just pure hard work in
                the kitchen.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/30">
              <div className="size-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Convenient
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Ditch the last-minute expensive takeout. Get your food ready to
                go for the entire week without compromising on a healhty
                lifestyle.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/30">
              <div className="size-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart</h3>
              <p className="text-gray-300 leading-relaxed">
                Experience the next generation of customer service with our
                AI-powered ordering system. Our AI assistant will make placing
                an order a breeze for you. Seriously, put it to the test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Getting your perfect meal is as easy as having a conversation.
            </p>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="size-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="size-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Chat Your Way Through
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Simply start a conversation with our AI assistant. Tell it what
                you&apos;re craving, your dietary preferences, or any special
                requirements. The assistant will help you discover the perfect
                meals, add them to your cart, and guide you through checkout. No
                need to search through menus or browse through endless options
                anymore!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            We&apos;re honoured to accompany you on your journey to a healthier
            & happier lifestyle.
          </p>
          <div className="flex justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              >
                Start exploring
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-white">mealpreps</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Healthy, convenient & smart meal prepping.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 mealpreps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
