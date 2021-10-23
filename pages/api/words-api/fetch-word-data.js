export default async function fetchWordData(req, res) {
  try {
    const response = await fetch(`https://${process.env.API_HOST}/words/${req.query.word}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.API_HOST,
        'x-rapidapi-key': process.env.API_KEY,
      },
    })
    const parsedResponse = await response.json()
    res.status(200).json(await parsedResponse)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
