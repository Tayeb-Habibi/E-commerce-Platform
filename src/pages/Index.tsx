import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const featured = products.filter(p => p.featured).slice(0, 4);
const bestSellers = products.filter(p => p.bestSeller).slice(0, 8);
const newArrivals = products.filter(p => p.isNew).slice(0, 4);

const perks = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, label: "Secure Payment", desc: "100% encrypted checkout" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, label: "24/7 Support", desc: "Expert assistance" },
];

export default function Index() {
  const [nlEmail, setNlEmail] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-muted overflow-hidden">
        <div className="container grid lg:grid-cols-2 items-center min-h-[70vh] py-16 gap-8">
          <div className="space-y-6 max-w-lg">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">New Collection 2026</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Discover Your <br />Perfect Style
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Curated premium products for the modern lifestyle. Quality craftsmanship meets timeless design.
            </p>
            <div className="flex gap-3 pt-2">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 font-semibold">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/shop?category=Fashion">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold">
                  Explore Fashion
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Premium collection"
              className="rounded-2xl shadow-2xl object-cover w-full max-h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map(p => (
              <div key={p.label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Find exactly what you're looking for</p>
          </div>
          <Link to="/shop" className="text-sm font-medium hover:underline hidden sm:block">
            View All <ArrowRight className="inline h-3 w-3 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-sm">{cat.name}</p>
                <p className="text-white/70 text-xs">{cat.productCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Handpicked by our team</p>
          </div>
          <Link to="/shop" className="text-sm font-medium hover:underline hidden sm:block">
            View All <ArrowRight className="inline h-3 w-3 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container py-8">
        <div className="relative rounded-2xl overflow-hidden bg-primary text-primary-foreground">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-2">Limited Time Offer</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Up to 30% Off</h2>
              <p className="opacity-80">Use code <span className="font-bold">SAVE20</span> at checkout</p>
            </div>
            <Link to="/shop">
              <Button variant="secondary" size="lg" className="rounded-full px-8 font-semibold">
                Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Best Sellers</h2>
            <p className="text-muted-foreground mt-1">Most loved by our customers</p>
          </div>
          <Link to="/shop" className="text-sm font-medium hover:underline hidden sm:block">
            View All <ArrowRight className="inline h-3 w-3 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground mt-1">Just dropped this season</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-muted">
        <div className="container py-16 text-center max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6">Subscribe for exclusive offers, new arrivals, and style inspiration.</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (nlEmail.trim()) {
                toast({ title: "Subscribed!", description: "Welcome to the LUXE community." });
                setNlEmail("");
              }
            }}
            className="flex gap-2 max-w-sm mx-auto"
          >
            <Input placeholder="your@email.com" type="email" value={nlEmail} onChange={e => setNlEmail(e.target.value)} className="h-11" />
            <Button type="submit" className="h-11 px-6 rounded-full font-semibold shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
