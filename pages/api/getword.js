import redis from '../../lib/redis'

export default async function getWord(req, res) {
  const response = await redis.get(req.query.word)
  res.status(200).json({ response })
}
