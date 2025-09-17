import { useState, useEffect } from 'react'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const postsData = await response.json()
      setPosts(postsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Your existing header HTML - convert to JSX */}
      <div className="top-banner">
        <button className="menu-toggle" aria-label="Toggle menu">☰</button>
        <nav className="header-menu" aria-label="Main menu">
          <a href="/login">Login</a>
          <a href="#">Cart</a>
          <form role="search">
            <input type="text" placeholder="Search..." id="search-input" />
          </form>
        </nav>
      </div>

      <header>
        <div className="header-text">
          <h1>post-maker app</h1>
          <p className="subhead">Better than Twitter!</p>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <main className="posts">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </main>
      )}
      
      <footer>
        <p>Skibidi</p>
      </footer>
    </div>
  )
}

export default HomePage