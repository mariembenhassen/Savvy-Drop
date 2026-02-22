import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  ArrowDownToLine,
  BellRing,
  Globe,
  Lock,
  Sparkles,
  History,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = [];
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
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="Savvy drop logo"
              width={900}
              height={300}
              className="h-20 w-auto"
              priority
            ></Image>
          </div>
          {/*  <AuthButton user={user} />*/}
          <AuthButton user={user}/>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-24 px-4 md:py-32 bg-gradient-to-br from-orange-50 via-white to-teal-50/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Catch Every <span className="text-orange-600">Price Drop</span>{" "}
            Before It's Gone
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Track prices across Amazon, Jumia, AliExpress & more. Get instant
            notifications when deals drop. Save big, effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10"
            >
              Start Tracking Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 border-teal-600 text-teal-700 hover:bg-teal-50"
            >
              See How It Works
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • 100% free to start
          </p>
        </div>
      </section>
       <AddProductForm user={user}/>
      {/* Features : appear when not logging in */}
      {products.length==0 && 
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
}
    </main>
  );
}
