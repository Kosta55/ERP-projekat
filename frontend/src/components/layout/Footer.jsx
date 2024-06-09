import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-dark text-white pt-5'>
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>About us</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nemo? Porro maxime eligendi inventore, explicabo aperiam cupiditate laboriosam! Iste delectus molestias possimus tenetur quos. Animi et ut possimus sunt ab?</p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Let us help</h5>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>About Us
              </Link>
            </p>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>Contact
              </Link>
            </p>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>Pricing
              </Link>
            </p>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>FAQ
              </Link>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Links</h5>
          <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>Blog
              </Link>
            </p>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>eBooks
              </Link>
            </p>
            <p>
              <Link to='#' className='text-white' style={{ textDecoration: 'none'}}>Help
              </Link>
            </p>
          </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Contact</h5>
          <p>
            <i className='fas fa-home mr-3'></i> Novi Sad, NS 21000, Serbia
          </p>
          <p>
            <i className='fas fa-envelope mr-3'></i> bookshop@gmail.com
          </p>
          <p>
            <i className='fas fa-phone mr-3'></i> +381 6885 996
          </p>
          <p>
            <i className='fas fa-print mr-3'></i> +021 668997
          </p>
          </div>
        </div>

        <hr className='mb-4 text-warning' />

        <div className="row d-flex justify-content-center align-items-center">
            <p>Copyright <strong className='text-warning'>Bookshop</strong> &copy; 2024. All rights reserved.</p>
        </div>

        <div className="row d-flex justify-content-center">
            <div className="text-center text-md-right">

              <ul className='list-unstyled list-inline'>
                <li className='list-inline-item'>
                  <p to='#' className='btn-floating btn-sm text-white' style={{ fontSize: '23px'}}>
                    <i className='fab fa-facebook mx-2'></i>
                    </p>
                </li>
                <li className='list-inline-item'>
                  <p to='#' className='btn-floating btn-sm text-white' style={{ fontSize: '23px'}}>
                    <i className='fab fa-twitter mx-2'></i>
                    </p>
                </li>
                <li className='list-inline-item'>
                  <p to='#' className='btn-floating btn-sm text-white' style={{ fontSize: '23px'}}>
                    <i className='fab fa-google-plus mx-2'></i>
                    </p>
                </li>
                <li className='list-inline-item'>
                  <p to='#' className='btn-floating btn-sm text-white' style={{ fontSize: '23px'}}>
                    <i className='fab fa-linkedin-in mx-2'></i>
                    </p>
                </li>
                <li className='list-inline-item'>
                  <p to='#' className='btn-floating btn-sm text-white' style={{ fontSize: '23px'}}>
                    <i className='fab fa-youtube mx-2'></i>
                    </p>
                </li>
              </ul>

            </div>
          </div>

      </div>
    </footer>
  )
}

export default Footer
