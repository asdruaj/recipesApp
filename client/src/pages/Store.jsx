import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
import { useProducts } from '../hooks/useProducts'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
const Store = () => {
  const { products, isLoading, setFilters } = useProducts()
  const [nutrients, setNutrients] = useState({
    carbs: 0,
    fat: 0,
    protein: 0
  })

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, query: e.target.value }))
  }

  const handleCarbsDisplay = (e) => {
    setNutrients(prev => ({ ...prev, carbs: e.target.value }))
    setFilters(prev => ({ ...prev, carbs: e.target.value }))
  }
  const handleFatDisplay = (e) => {
    setNutrients(prev => ({ ...prev, fat: e.target.value }))
    setFilters(prev => ({ ...prev, fat: e.target.value }))
  }
  const handleProteinDisplay = (e) => {
    setNutrients(prev => ({ ...prev, protein: e.target.value }))
    setFilters(prev => ({ ...prev, protein: e.target.value }))
  }

  return isLoading
    ? <Spinner />
    : (
      <>

        <div className='flex gap-8'>
          <input onChange={handleChange} type='text' className='ml-4 w-[80%] md:ml-56 mt-4 md:w-[30%] min-w-[15rem] bg-slate-300 text-neutral-600 py-1 px-2 rounded-md border border-slate-500 shadow-xl placeholder:text-gray-500' placeholder='Search...' />
          <button className='md:hidden w-8 mt-4 text-neutral-800 inline-block'><AdjustmentsHorizontalIcon /></button>
        </div>

        <div className='grid md:grid-cols-[200px,1fr]'>

          <section role='sidebar' className='text-neutral-800 h-[calc(100svh-100px)] -mt-9 ml-4 rounded-md border border-slate-400 bg-slate-300 p-4 hidden md:block'>

            <label className='text-base font-bold block'>Nutrients</label>
            <label htmlFor='carbs' className='text-sm font-semibold ml-2'>Min Carbohydrates</label>
            <input onChange={handleCarbsDisplay} type='range' id='carbs' className='ml-2' min='0' max='30' defaultValue='0' />
            <label className='block text-center -mt-2'>{nutrients.carbs}</label>

            <label htmlFor='fat' className='text-sm font-semibold ml-2'>Min Fat</label>
            <input onChange={handleFatDisplay} type='range' id='fat' className='ml-2' defaultValue='0' />
            <label className='block text-center -mt-2'>{nutrients.fat}</label>
            <label htmlFor='proteins' className='text-sm font-semibold ml-2'>Min Protein</label>
            <input onChange={handleProteinDisplay} type='range' id='proteins' className='ml-2' min='0' max='10' defaultValue='0' />
            <label className='block text-center -mt-2'>{nutrients.protein}</label>
          </section>
          <main className='grid grid-cols-fluid-sm gap-4 p-4'>
            {products?.map(product => (
              <ProductCard key={product.food.foodId} title={product.food.label} thumbnail={product.food.image} price={`$${Math.floor(Math.random() * 100 + 1)}`} />
            ))}

          </main>

        </div>
      </>
      )
}

export default Store
