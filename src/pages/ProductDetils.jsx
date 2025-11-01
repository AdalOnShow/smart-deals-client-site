import React from 'react'
import { useLoaderData } from 'react-router'

const ProductDetils = () => {
  const product = useLoaderData()
  console.log(product)
  return (
    <div>ProductDetils</div>
  )
}

export default ProductDetils