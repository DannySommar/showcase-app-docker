import { useState, useEffect } from 'react'

function App() {
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
    console.error('Error fetching posts :', error)
    setLoading(false)
  }
}

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  return (
    <div className="app">
      <h1>My Blog Posts</h1>
      <div className="posts">
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
      </div>
    </div>
  )
}

export default App