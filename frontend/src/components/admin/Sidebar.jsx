import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='container-fluid bg-dark h-100'>
      <div className='row'>
        <div className='d-flex flex-column col-auto min-vh-100'>
          <div className='mt-2 text-center'>
            <hr className='text-white d-none d-sm-block' />
            <p className='text-white d-none d-sm-inline text-decoration-none d-flex align-items-center'>
              <span className='fs-5'><i className='fas fa-user-shield'></i> Admin Menu</span>
            </p>
            <hr className='text-white nowrap d-none d-sm-block' />
            <ul className='nav nav-pills flex-column mt-2 mt-sm-0' id='menu'>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin-dashboard' className='nav-link text-white text-center text-sm-start' aria-current='page'>
                  <i className='fas fa-tachometer-alt'></i>
                  <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-home'></i>
                  <span className='ms-2 d-none d-sm-inline'>Home</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/orders' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-shopping-basket'></i>
                  <span className='ms-2 d-none d-sm-inline'>Orders</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/users' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-users'></i>
                  <span className='ms-2 d-none d-sm-inline'>Users</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/reviews' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-star'></i>
                  <span className='ms-2 d-none d-sm-inline'>Reviews</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/products' className='nav-link text-white text-center text-sm-start'>
                  <i className='fab fa-product-hunt'></i>
                  <span className='ms-2 d-none d-sm-inline'>Products</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/categories' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-user-shield'></i>
                  <span className='ms-2 d-none d-sm-inline'>Categories</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/genres' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-user-shield'></i>
                  <span className='ms-2 d-none d-sm-inline'>Genres</span>
                </Link>
              </li>
              <li className='nav-item my-sm-1 my-2'>
                <Link to='/admin/publishers' className='nav-link text-white text-center text-sm-start'>
                  <i className='fas fa-user-shield'></i>
                  <span className='ms-2 d-none d-sm-inline'>Publishers</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar