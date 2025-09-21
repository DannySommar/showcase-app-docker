import { useState, useEffect } from 'react'
import { data } from 'react-router-dom'

export default function UserPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserPosts()
  }, [])

  const fetchUserPosts = async () => {
    try {
      const res = await fetch('/api/user/posts/get', {
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts || [])
      } else if (res.status === 401) {
        setError('Please log in to see your posts')
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const formData = new FormData(e.target)
      const title = formData.get('title').trim()
      const content = formData.get('content').trim()
      const tags = formData.get('tags').trim()
      
      console.log({ title, content, tags })
      const res = await fetch('/api/user/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          content,
          tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
        })
      })

      const data = await res.json()

      if (res.ok) {
        e.target.reset()
        fetchUserPosts()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Network error')
    }
  }

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">Loading your posts...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Posts</h1>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded-md mb-6 text-center">
          {error}
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-white text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300 mb-2">Title</label>
            <input  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              type="text"
              id="title"
              name="title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-300 mb-2">Content</label>
            <textarea className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              id="content"
              name="content"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              type="text"
              id="tags"
              name="tags"
              placeholder="e.g., tech, programming, web"
            />
          </div>

          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit" >
            Create Post
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg flex flex-col h-full">
              
              <div className="p-6 flex-grow">
                <h2 className="text-xl text-white mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-300 mb-4">
                  {post.content}
                </p>
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <button className="text-gray-400 hover:text-white">
                    Like {0}
                  </button>
                </div>
              </div>

            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}