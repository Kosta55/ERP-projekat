import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPublishers, createNewPublisher } from '../../redux/publishers/publisherActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import PublisherItem from '../../components/admin/publishers/PublisherItem'
import CreateCPGModal from '../../components/modals/CreateCPGModal'
import useTitle from '../../hooks/useTitle'
import { useNavigate } from 'react-router-dom'

const PublisherListPage = () => {
  useTitle('Publisher Admin Page')

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { publishers, loading, error } = useSelector((state) => state.publishers)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllPublishers())
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
              <h1>All Publishers</h1>
              <button
                className='btn btn-success align-self-center'
                onClick={() => setIsOpenCreateModal(true)}
              >
                <i className='fas fa-plus'> </i> Create Publisher
              </button>
            </div>
            <table className='table table-striped table-bordered table-hover border'>
              <thead className='table-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Publisher name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {publishers &&
                  publishers?.map((publisher, index) => (
                    <tr key={publisher._id} className='text-center'>
                      <th scope='row'>{index + 1}</th>
                      <PublisherItem publisher={publisher} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>

      {isOpenCreateModal && 
      <CreateCPGModal
        createAction={createNewPublisher}
        isOpen={isOpenCreateModal}
        onClose={setIsOpenCreateModal}
        type='Publisher'
      />}
    </>
  )
}

export default PublisherListPage