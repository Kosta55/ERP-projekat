import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/auth/authActions'
import ProfileForm from '../../components/profile/ProfileForm'
import ChangePasswordForm from '../../components/profile/ChangePasswordForm'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import useTitle from '../../hooks/useTitle'

const ProfilePage = () => {
  useTitle('My Profile')

  const dispatch = useDispatch()

  const { user, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  if (loading) return <Spinner />

  return (
    <div className='container-fluid my-3'>
      {error && <Alert type='danger'>{error}</Alert>}
      <div className='row'>
        <div className='col-md-4'>
          <h3>My Profile</h3>
          <ProfileForm user={user} />
          <br></br>
        </div>
        <div className='col-md-4'>
          <h3>Change Password</h3>
          <ChangePasswordForm />
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage