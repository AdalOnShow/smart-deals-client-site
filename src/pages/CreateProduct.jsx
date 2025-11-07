import React from 'react'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'

const CreateProduct = () => {
  const { user } = useAuth()
  const axiosInstance = useAxios()

  const handleCreateProduct = (e) => {
    e.preventDefault()

    const title = e.target.title.value
    const photo = e.target.photo.value
    const minPrice = e.target.minPrice.value
    const maxPrice = e.target.maxPrice.value

    const newProduct = { title, image: photo, price_min: minPrice, price_max: maxPrice, status: 'available', seller_name: user.displayName, email: user.email, seller_image: user.photoURL }

    axiosInstance.post('/products', newProduct)
      .then(data => {
        if (data.data.insertedId) {
          e.target.reset()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product Created Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h2 className='font-bold text-center text-5xl mb-4'>Create <span className='text-primary'>Product</span></h2>
      <form onSubmit={(e) => handleCreateProduct(e)} className="max-w-md mx-auto card-body">
        <fieldset className="fieldset">
          <label className="label">Title</label>
          <input type="name" name="title" className="input w-full" placeholder="Product Name" />

          <label className="label flex-1">Image URL</label>
          <input type="text" name="photo" className="input w-full" placeholder="https://...your_img_url" />

          <label className="label flex-1">Min Price</label>
          <input type="text" name="minPrice" className="input w-full" placeholder="Min Price" />

          <label className="label flex-1">Max Price</label>
          <input type="text" name="maxPrice" className="input w-full" placeholder="Max Price" />

          <button type='submit' className="btn btn-neutral mt-4">Create Product</button>
        </fieldset>
      </form>
    </div>
  )
}

export default CreateProduct