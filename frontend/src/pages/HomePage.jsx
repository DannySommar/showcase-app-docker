import { useState, useEffect } from 'react'

export default function HomePage() {
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
    <>
      <h1>Home Page</h1>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="posts-container">
          <section className="tag-select-container">
            <label htmlFor="tag-select">View by tag</label>
            <select id="tag-select">
              <option value="">Show All</option>
            </select>
          </section>

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
      )}
    </>
  )
}