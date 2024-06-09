import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { createNewProduct } from '../../../redux/products/productActions'
import { getAllCategories } from '../../../redux/categories/categoryActions'
import { getAllPublishers } from '../../../redux/publishers/publisherActions'
import { getAllGenres } from '../../../redux/genres/genreActions'
import axios from 'axios'
import Spinner from '../../Spinner'

const CreateProductForm = ({ onClose }) => {
  const { categories} = useSelector((state) => state.categories)
  const { publishers } = useSelector((state) => state.publishers)
  const { genres } = useSelector((state) => state.genres)

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [isNewProduct, setIsNewProduct] = useState(true)
  const [genre, setGenre] = useState('')
  const [category, setCategory] = useState('')
  const [publisher, setPublisher] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllPublishers())
    dispatch(getAllGenres())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      name, image, author, description, price, countInStock, isNewProduct, genre, category, publisher
    }
 
    if (!name) return toast.error('Name is required')
    if (!image) return toast.error('Image is required')
    if (!author) return toast.error('Author is required')
    if (!description) return toast.error('Description is required')
    if (!category) return toast.error('Category is required')
    if (!publisher) return toast.error('Publisher is required')
    if (!genre) return toast.error('Genre is required')

    dispatch(createNewProduct(productData))
    onClose(false)
  }

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setImageUploading(true)
    try {
      if (!file) return toast.error('File not exist')
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return toast.error('File format is incorrect, please choose image')
      if (file.size > 1024 * 1024) return toast.error('Size to large')

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setImagePreview(URL.createObjectURL(file))
      setImageUploading(false)
    } catch (error) {
      setImage('')
      setImagePreview('')
      setImageUploading(false)
      toast.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-fluid'>
        <label htmlFor='name' className='fw-bold'>Name</label>
        <input
          className='form-control'
          name='name'
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          autoFocus
        />
        <label htmlFor='author' className='mt-2 fw-bold'>Author</label>
        <input
          className='form-control'
          name='author'
          id='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author'
        />
        <label htmlFor='description' className='mt-2 fw-bold'>Description</label>
        <textarea 
          style={{ height: '150px'}}
          className='form-control'
          name='description'
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description...'></textarea>
        <label htmlFor='price' className='mt-2 fw-bold'>Price</label>
        <input
          className='form-control'
          name='price'
          id='price'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
        />
        <label htmlFor='countInStock' className='mt-2 fw-bold'>Stock</label>
        <input
          className='form-control'
          name='price'
          id='countInStock'
          type='number'
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          placeholder='Stock'
        />
        <div className="form-check form-switch mt-2 fw-bold">
          <label htmlFor='isNewProduct'>New product?</label>
          <input
            className='form-check-input'
            role='switch'
            name='isNewProduct'
            id='isNewProduct'
            type='checkbox'
            value={isNewProduct}
            checked={isNewProduct}
            onChange={(e) => setIsNewProduct(!isNewProduct)}
          />
        </div>
        <label htmlFor='category' className='mt-2 fw-bold'>Category</label>
        <select 
          className='form-select mt-1'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>-- Select Category --</option>
          {categories && categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <label htmlFor='publisher' className='mt-2 fw-bold'>Publisher</label>
        <select 
          className='form-select mt-1'
          id='publisher'
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        >
          <option value=''>-- Select Publisher --</option>
          {publishers && publishers.map((publisher) => (
            <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
          ))}
        </select>
        <label htmlFor='genre' className='mt-2 fw-bold'>Genre</label>
        <select 
          className='form-select mt-1'
          id='genre'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value=''>-- Select Genre --</option>
          {genres && genres.map((genre) => (
            <option key={genre._id} value={genre._id}>{genre.name}</option>
          ))}
        </select>
        <div className="mb-4 mt-2">
          <label htmlFor="image" className="form-label">Choose image</label>
          <input 
            className="form-control" 
            type="file" 
            id="image" 
            accept="image/*" 
            onChange={uploadImageHandler} 
          />
          <div className="border border-2 rounded w-50 mt-2">
            {image ? (
              <img 
                style={{ maxWidth: '100%', height: '100%'}} 
                src={imagePreview === null ? '' : imagePreview} 
                alt='' 
              />
            ) : (
              <p className='text-center text-muted'>Product image will appear here!</p>
            )}
            {imageUploading && <Spinner />}
          </div>
        </div>
        <div className='d-grid gap-2 mx-auto mt-2'>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateProductForm