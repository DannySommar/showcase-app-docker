import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <div className="bg-gray-800 px-4 py-2 flex justify-end">
        <nav className="flex gap-6 items-center">
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Log in
          </Link>
          <button className="text-gray-300 hover:text-white transition-colors">
            Log out
          </button>
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