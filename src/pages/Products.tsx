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

type ProductType = {
  id:number
  title:string
  description:string
}

export default function Products() {

  
  const [products, setProdutcs] = useState<ProductType[]>([])
  const [loading,setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/products")
        setProdutcs(res.data)
      } catch (error) {
        console.error("Failed to fetch data product")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {loading ? (
        <p className="text-card">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Dialog key={product.id}>
            <DialogTrigger asChild>
              <Card onClick={()=> setSelectedProduct(product)}>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
              </Card>

            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedProduct?.title}</DialogTitle>
                <DialogDescription>
                  {selectedProduct?.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      )
    }
    </div>
  )
}
