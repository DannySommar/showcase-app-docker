import postsData from '../data/posts.json' with { type: 'json' };

export async function getPosts(req, res) {
  try {
    res.json(postsData.posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
}