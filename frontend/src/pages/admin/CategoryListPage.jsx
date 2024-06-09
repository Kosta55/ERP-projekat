import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories, createNewCategory } from '../../redux/categories/categoryActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import CategoryItem from '../../components/admin/categories/CategoryItem'
import CreateCPGModal from '../../components/modals/CreateCPGModal'
import useTitle from '../../hooks/useTitle'
import { useNavigate } from 'react-router-dom'

const CategoryListPage = () => {
  useTitle('Category Admin Page')

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { categories, loading, error } = useSelector((state) => state.categories)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllCategories())
    // eslint-disable-next-line
  }, [dispatch])

  if (loading) return <Spinner />

  return (
    <>
      <div className='row m-0'>
        <div className='col-12 col-md-2 p-0'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <>
            <div className='mt-3'>
              {error && <Alert type='danger'>{error}</Alert>}
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <h1 className='text-dark'>All Categories</h1>
              <button
                className='btn btn-success'
                onClick={() => setIsOpenCreateModal(true)}
              >
                <i className='fas fa-plus'> </i> Create Category
              </button>
            </div>
            <table className='table table-striped table-bordered table-hover border'>
              <thead className='table-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Category name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories?.map((category, index) => (
                    <tr key={category._id} className='text-center'>
                      <th scope='row'>{index + 1}</th>
                      <CategoryItem category={category} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>

      {isOpenCreateModal && (
        <CreateCPGModal
          createAction={createNewCategory}
          isOpen={isOpenCreateModal}
          onClose={setIsOpenCreateModal}
          type='Category'
        />
      )}
    </>
  )
}

export default CategoryListPage