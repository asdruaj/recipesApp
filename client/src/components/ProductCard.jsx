import React from 'react'

const ProductCard = ({ thumbnail, title, price }) => {
  return (

    <div className='w-full max-w-sm flex flex-col bg-slate-300 opacity-75 border border-slate-400 rounded-lg shadow-2xl hover:bg-slate-400 hover:opacity-100 hover:scale-105 transition-all'>

      <img className='p-8 rounded-lg w-full' src={thumbnail} alt={title + ' image'} />

      <div className='p-5'>

        <h5 className='text-lg font-semibold tracking-tight text-gray-900 line-clamp-2'>{title}</h5>

      </div>

      <div className='p-5 flex gap-4'>
        <span className='text-2xl font-bold text-gray-900'>{price}</span>
        <a href='#' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add to cart</a>
      </div>
    </div>

  )
}

export default ProductCard
