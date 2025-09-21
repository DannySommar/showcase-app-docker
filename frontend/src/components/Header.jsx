import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
  const [user, setUser] = useState(null)

  // Check if user is logged in
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (res.ok) {
        const userData = await res.json()
        if (userData.isLoggedIn) {
          setUser({ name: userData.name })
        }
      }
    } catch (err) {
      console.log('Auth check failed', err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { credentials: 'include' })
      setUser(null)
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <>
      <div className="bg-gray-800 px-4 py-2 flex justify-end">
        <nav className="flex gap-6 items-center">
          <span className="text-gray-300">
            Hello, {user ? user.name : 'Guest'}
          </span>
          
          {user ? (
            <div className="flex gap-4">
              <Link to="/my-posts" className="text-blue-400 hover:text-blue-300">
                My Posts
              </Link>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Log in
              </Link>
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>

      <header className="bg-gray-900 px-8 py-6 flex justify-center">
        <Link to="/">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">post-maker</h1>
            <p className="text-gray-400">Better than Twitter!</p>
          </div>
        </Link>
      </header>
    </>
  )
}