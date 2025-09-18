import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <div className="top-banner">
        <nav className="header-menu" aria-label="Main menu">
          <Link to="/login">Login</Link>
          <a href="#">Cart</a>
          <form role="search">
            <input type="text" placeholder="Search..." id="search-input" />
          </form>
        </nav>
      </div>

      <header>
        <Link to="/">
          <div className="header-text">
            <h1>post-maker app</h1>
            <p className="subhead">Better than Twitter!</p>
          </div>
        </Link>
      </header>
    </>
  )
}