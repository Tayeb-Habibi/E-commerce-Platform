import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "APPLY_DISCOUNT"; code: string; percent: number }
  | { type: "CLEAR_DISCOUNT" }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.quantity || 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      return { ...state, items: state.items.map(i => i.product.id === action.productId ? { ...i, quantity: action.quantity } : i) };
    case "APPLY_DISCOUNT":
      return { ...state, discountCode: action.code, discountPercent: action.percent };
    case "CLEAR_DISCOUNT":
      return { ...state, discountCode: null, discountPercent: 0 };
    case "CLEAR_CART":
      return { items: [], discountCode: null, discountPercent: 0 };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyDiscount: (code: string) => boolean;
  clearDiscount: () => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  discountCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DISCOUNT_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME: 15,
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discountCode: null, discountPercent: 0 });

  const addItem = useCallback((product: Product, quantity?: number) => dispatch({ type: "ADD_ITEM", product, quantity }), []);
  const removeItem = useCallback((productId: string) => dispatch({ type: "REMOVE_ITEM", productId }), []);
  const updateQuantity = useCallback((productId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity }), []);
  const applyDiscount = useCallback((code: string) => {
    const upper = code.toUpperCase();
    const percent = DISCOUNT_CODES[upper];
    if (percent) { dispatch({ type: "APPLY_DISCOUNT", code: upper, percent }); return true; }
    return false;
  }, []);
  const clearDiscount = useCallback(() => dispatch({ type: "CLEAR_DISCOUNT" }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const discount = subtotal * (state.discountPercent / 100);
  const total = subtotal - discount;

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, applyDiscount, clearDiscount, clearCart, itemCount, subtotal, discount, total, discountCode: state.discountCode }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
