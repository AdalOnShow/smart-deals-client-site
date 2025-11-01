import React, { use } from 'react'
import Product from '../Product'
import { Link } from 'react-router'

const LatestProducts = ({ promise }) => {
  const latestProducts = use(promise)
  console.log(latestProducts)
  return (
    <div className='py-8 max-w-11/12 mx-auto flex-center flex-col'>
      <h2 className='font-bold text-center text-5xl mb-4'>Recent <span className='text-primary'>Products</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestProducts.map(product => <Product key={product._id} product={product} />)}
      </div>

      <Link to="/all-products" className="btn btn-primary mt-8">Show All</Link>
    </div>
  )
}

export default LatestProducts