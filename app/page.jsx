import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/ProductCard";
import {
  ArrowDownToLine,
  BellRing,
  Globe,
  Lock,
  Sparkles,
  History,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];
  const FEATURES = [
    {
      icon: ArrowDownToLine,
      title: "Price Drops Caught",
      description: "Detects real discounts instantly",
    },
    {
      icon: BellRing,
      title: "Never Miss a Deal",
      description: "Instant alerts on your phone or email",
    },
    {
      icon: Globe,
      title: "Global Stores",
      description: "Amazon, Jumia, AliExpress, Noon & 100+ more",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "No selling your data — ever",
    },
    {
      icon: Sparkles,
      title: "Smart History",
      description: "See price graphs & all-time lows",
    },
    {
      icon: History,
      title: "Always On",
      description: "24/7 monitoring — even when you sleep",
    },
  ];
  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/70 shadow-sm transition-shadow duration-300">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo with background */}
            <div className="flex items-center">
              <div
                className="
            rounded-xl 
            bg-gradient-to-br from-orange-50 to-teal-50/60 
            px-3 py-2 sm:px-4 sm:py-2.5 "
              >
                <Image
                  src="/logo-new.png"
                  alt="Savvy Drop – Price Tracker"
                  width={900}
                  height={300}
                  className="
              h-10 sm:h-13 md:h-15 lg:h-15 
              w-auto 
            "
                  priority
                />
              </div>
            </div>

            {/* Auth button */}
            <div className="flex items-center">
              <AuthButton user={user} />
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 px-5 bg-gradient-to-b from-orange-100/70 via-white to-teal-50/50">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-5 py-2 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm md:text-base">
            Prices change every hour — don't pay full price again
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-6 md:mb-8">
            Catch the{" "}
            <span className="text-orange-600 drop-shadow-md">Best Deals</span>
            <br className="sm:hidden" /> Before They Vanish
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Instant alerts when prices drop on Jumia, Amazon, AliExpress, Shein,
            Zara, Mytek...
            <br />
            Thousands of Tunisians are already saving — join them today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button
              size="xl"
              className="text-xl py-7 px-12 bg-orange-600 hover:bg-orange-700 shadow-2xl hover:shadow-orange-500/30 transition-all"
            >
              Start Saving Now – It's Free
            </Button>
            <Button
              variant="secondary"
              size="xl"
              className="text-xl py-7 px-12 border-2 border-gray-300 hover:bg-gray-50"
            >
              See Real Savings Examples →
            </Button>
          </div>

          <p className="mt-8 text-base text-gray-600">
            No payment info required • Cancel anytime
          </p>
        </div>
      </section>
      <AddProductForm user={user} />
      
      <br/>
      <section>
        {/* Products Grid */}
        {user && products.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Your Tracked Products
              </h3>
              <span className="text-sm text-gray-500">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </section>
      {/* Features : appear when not logging in */}
      {products.length == 0 && (
        <div className="grid md:grid-cols-3 gap-8 py-16">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
