import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"

type ProductType = {
  id:number
  title:string
  price:number
  description:string
  image:string
}

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const { cart, addToCart } = useCart()
  const [loadingId, setLoadingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/products")
        setProducts(res.data)
      } catch (error) {
        console.error("Failed to fetch data product")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="text-center font-bold text-2xl">Loading...</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          const isInCart = cart.some(item => item.id === product.id)

          return (
            <Dialog key={product.id}>
              {/* 🔹 Card → buka dialog */}
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain bg-white p-4 rounded-t-md"
                  />
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {product.title}
                    </CardTitle>
                    <p className="font-bold">${product.price}</p>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>

              {/* 🔹 Dialog Detail */}
              <DialogContent>
                <DialogHeader>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain bg-white p-4 rounded-t-md"
                  />
                  <DialogTitle>{product.title}</DialogTitle>
                  <p className="font-bold">${product.price}</p>
                  <DialogDescription>
                    {product.description}
                  </DialogDescription>

                  {/* 🔹 Add to Cart */}
                  <Button
                    className="mt-4"
                    disabled={isInCart}
                    onClick={() => {
                        setLoadingId(product.id)
                        
                        setTimeout(() => {
                            addToCart({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              image: product.image,
                              quantity: 1,
                            })

                            setLoadingId(null)
                          }, 800)
                      }
                      
                    }
                    >
                     {loadingId === product.id ? "Adding..." : isInCart ? "Added" : "Add to Cart"}
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  )
}
