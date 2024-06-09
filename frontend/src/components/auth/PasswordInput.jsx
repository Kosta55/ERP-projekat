import { useState } from 'react'

const PasswordInput = ({ placeholder, value, onChange, name, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className='input-group mb-3'>
        <span className='input-group-text'>
        <span><i className='fas fa-lock'></i></span>
        </span>
        <input
          className='form-control'
          name={name}
          id='showPassword'
          onChange={onChange}
          value={value}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          onPaste={onPaste}
        />
          <span className='input-group-text' onClick={togglePassword}>
          {showPassword ? <span><i className='fas fa-eye'></i></span> : <span><i className='fas fa-eye-slash'></i></span>}
          </span>
      </div>
    </>
  )
}

export default PasswordInput