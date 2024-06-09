import { Toaster } from 'react-hot-toast'

const ToastMessage = () => {
  return (
    <Toaster reverseOrder={false} position='bottom-left' toastOptions={{ 
        duration: 5000,
        success: {
            style: {
            background: '#2F855A',
            color: '#fff',
            fontWeight: 500
          },
        },
        error: {
            style: {
            background: '#C53030',
            color: '#fff',
            fontWeight: 500
        },
      },
    }} />
  )
}

export default ToastMessage