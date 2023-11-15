import plate from '../../../client/assets/plate.svg'

function HomePage () {
  return (
    <header className='h-[calc(100vh + 10px)] w-full'>
      <section className='p-4 grid sm:grid-cols-2'>
        <div className='lg:pl-14 flex flex-col'>
          <h3 className='sm:text-sm md:text-md lg:text-lg mb-4 bg-slate-500 opacity-75 p-2 w-fit rounded-xl'>Trending</h3>
          <h1 className='text-4xl md:text-6xl lg:text-7xl text-center md:text-left font-oswald text-neutral-800'>Learn from <span className='text-amber-600 brightness-125 drop-shadow-4xl'>Gourmet's Cookbook</span></h1>
          <p className='text-neutral-900 font-semibold text-lg p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod architecto assumenda similique officia odio laborum facilis aspernatur, voluptatem quibusdam omnis ex repellendus quidem rem enim repellat aut quia ipsa quae.</p>
          <button className='transition-all font-medium drop-shadow-xl duration-500 relative mx-auto after:content-["→"] after:absolute after:opacity-0 after:right-[-20px] after:transition-all after:duration-500 hover:after:opacity-100 hover:after:right-[5px] hover:pr-[24px] hover:pl-[8px] hover:bg-amber-700 bg-amber-500 p-2 text-xl md:ml-2 rounded-lg'>Explore our Work  </button>
        </div>
        <div>
          <img className='w-[250px] animate-wiggle md:w-[300px] lg:w-[400px] mx-auto mt-8' loading='lazy' src={plate} alt='Cooked Salmon' />
        </div>
      </section>
    </header>
  )
}

export default HomePage
