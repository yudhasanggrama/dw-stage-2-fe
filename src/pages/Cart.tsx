import { useCart } from "@/hooks/useCart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



const Cart = () => {
    const {cart, updateQuantity, removeFromCart, decreaseQuantity} = useCart()    

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-6 p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain bg-white p-2 rounded"
                  />

                  <div className="flex-1">
                    <CardTitle className="text-base">
                      {item.title}
                    </CardTitle>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>

                    <span className="w-6 text-center">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Card className="w-64">
              <CardHeader>
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  )
}

export default Cart