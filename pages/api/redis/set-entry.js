import redis from '../../../lib/redis'

export default async function setEntry(req, res) {
  const payload = req.body
  if (!payload) {
    res.status(400).json({
      error: 'Payload can not be empty',
    })
  } else {
    const { key, apiResponse } = payload
    await redis.set(key, JSON.stringify(apiResponse))
    res.status(200).json({ body: 'success' })
  }
}
