import { NavLink } from 'react-router-dom'

const Pagination = ({ page, pages, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='d-flex justify-content-center'>
        <ul className='pagination'>
          {[...Array(pages).keys()].map((x) => (
            <li className='page-item'>
              <NavLink
                to={
                  !isAdmin
                    ? keyword
                      ? `/products/search/${keyword}/page/${x + 1}`
                      : `/products/page/${x + 1}`
                    : `/admin/products/page/${x + 1}`
                }
                className={page === x + 1 ? 'page-link active bg-dark border-dark text-warning' : 'page-link text-warning'}
              >
                {x + 1}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default Pagination