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
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-3">Home Page</h1>

      <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Filter by:</span>
          <select className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600">
            <option value="">All tags</option>
            <option value="tech">Tech</option>
            <option value="music">Music</option>
            <option value="news">News</option>
          </select>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}