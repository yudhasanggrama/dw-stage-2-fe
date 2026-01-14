import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to E-Commerce Store
      </h1>

      <p className="text-muted-foreground mb-6 max-w-md">
        Find the best products with affordable prices and easy checkout.
      </p>

      <Button asChild>
        <Link to="/products">View Products</Link>
      </Button>
    </div>
  )
}
