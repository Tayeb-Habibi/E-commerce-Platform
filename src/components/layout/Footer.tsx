import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({ title: "Subscribed!", description: "You've been added to our newsletter." });
      setEmail("");
    }
  };

  return (
    <footer className="border-t bg-card mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold mb-4">LUXE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium products for the modern lifestyle. Quality meets elegance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
              <Link to="/shop?category=Electronics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Electronics</Link>
              <Link to="/shop?category=Fashion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fashion</Link>
              <Link to="/shop?category=Home+%26+Living" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home & Living</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
            <div className="flex flex-col gap-2">
              <Link to="/account" className="text-sm text-muted-foreground hover:text-foreground transition-colors">My Account</Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
              <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Wishlist</Link>
              <Link to="/account/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Orders</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get updates on new arrivals and special offers.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-9 text-sm"
              />
              <Button type="submit" size="sm" className="h-9 shrink-0">Join</Button>
            </form>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LUXE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
