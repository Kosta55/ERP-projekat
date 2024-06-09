import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGenres, createNewGenre } from '../../redux/genres/genreActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import GenreItem from '../../components/admin/genres/GenreItem'
import CreateCPGModal from '../../components/modals/CreateCPGModal'
import useTitle from '../../hooks/useTitle'
import { useNavigate } from 'react-router-dom'

const GenreListPage = () => {
  useTitle('Genre Admin Page')

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { genres, loading, error } = useSelector((state) => state.genres)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllGenres())
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
            <div className='d-flex justify-content-between align-items center'>
              <h1>All Genres</h1>
              <button
                className='btn btn-success align-self-center'
                onClick={() => setIsOpenCreateModal(true)}
              >
                <i className='fas fa-plus'> </i> Create Genre
              </button>
            </div>
            <table className='table table-striped table-bordered table-hover border'>
              <thead className='table-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Genre name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {genres &&
                  genres?.map((genre, index) => (
                    <tr key={genre._id} className='text-center'>
                      <th scope='row'>{index + 1}</th>
                      <GenreItem genre={genre} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>

      {isOpenCreateModal && 
      <CreateCPGModal
        createAction={createNewGenre}
        isOpen={isOpenCreateModal}
        onClose={setIsOpenCreateModal}
        type='Genre'
      />}
    </>
  )
}

export default GenreListPage