import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast({ title: wishlisted ? "Removed from wishlist" : "Added to wishlist", description: product.name });
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
          {discountPercent > 0 && <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">-{discountPercent}%</span>}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" onClick={handleToggleWishlist}>
            <Heart className={cn("h-4 w-4", wishlisted && "fill-current text-destructive")} />
          </Button>
        </div>

        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full h-9 text-xs font-semibold rounded-lg shadow-md" onClick={handleAddToCart} disabled={!product.inStock}>
            <ShoppingBag className="h-3.5 w-3.5 mr-1" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary/80 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
