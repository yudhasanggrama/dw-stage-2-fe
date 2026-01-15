import type { CartItemType } from "@/types/CartItem";
import React from "react"

type CartContextType = {
    cart : CartItemType[]
    addToCart : (item : CartItemType) => void
    updateQuantity : (id : number, quantity : number) => void
    removeFromCart : (id : number) => void
    decreaseQuantity : (id : number) => void
    totalItems: number
}

const CartContext = React.createContext<CartContextType | null>(null)

export default CartContext