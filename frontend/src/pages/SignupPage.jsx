import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.target)
      const name = formData.get('name').trim()
      const email = formData.get('email').trim()
      const username = formData.get('username').trim()
      const password = formData.get('password').trim()

      console.log({ name, email, username, password })
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ name, email, username, password })
      })

      const data = await res.json()
      console.log('data from register attempt: ', data)

      if (res.ok) {
        navigate('/')
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
          <input className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            type="text"
            name="name"
            id="name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
          <input className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
          <input className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            type="text"
            name="username"
            id="username"
            required
            pattern="[\w\-]{1,20}"
            title="username must be 1-20 characters, using letters, numbers, _ or -"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
          <input className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating account' : 'Sign Up'}
        </button>
        
        <p className="text-gray-400 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-400">Log in here</Link>
        </p>
      </form>
    </div>
  )
}