import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'

export function useProducts () {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    query: '',
    carbs: 0,
    fat: 0,
    proteins: 0
  })

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const items = await fetchProducts()
        setProducts(items)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getProducts()
  }, [])

  const filteredProducts = products.filter(product => (
    product.food.label.toLowerCase().includes(filters.query.toLowerCase()) &&
    (product.food.nutrients.CHOCDF >= filters.carbs || filters.carbs === 0) &&
    (product.food.nutrients.FAT >= filters.fat || filters.fat === 0) &&
    (product.food.nutrients.PROCNT >= filters.proteins || filters.proteins === 0)
  ))
  return { products: filteredProducts, isLoading, setFilters }
}
