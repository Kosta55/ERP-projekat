import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/users/userActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import UserItem from '../../components/admin/users/UserItem'
import useTitle from '../../hooks/useTitle'
import { useNavigate } from 'react-router-dom'

const UserListPage = () => {
  useTitle('User Admin Page')

  const { users, loading, error } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllUsers())
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
              <div className="d-flex justify-content-start align-items-center">
                <h1 className='text-dark'>All Users</h1>
              </div>
            </div>
            <table className='table table-striped table-image table-bordered table-hover border'>
              <thead className='table-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Admin</th>
                  <th scope='col'>Registered</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users?.map((user, index) => (
                    <tr key={user._id} className='text-center'>
                      <th scope='row' className='align-middle text-center'>{index + 1}</th>
                      <UserItem user={user} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>
    </>
  )
}

export default UserListPage