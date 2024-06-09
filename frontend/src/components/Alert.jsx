const Alert = ({ type, children }) => {
  return (
    <div className={`alert alert-${type}`} role='alert'>
      {children}
    </div>
  )
}

Alert.defaultProps = {
  className: 'alert alert-info',
}

export default Alert