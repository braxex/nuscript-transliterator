const fetchWordData = async searchString => {
  let resultData = null
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_KEY}/words/${searchString}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.NEXT_PUBLIC_API_KEY,
          'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )
    resultData = await response.json()
  } catch (err) {
    // swallow error
    // eslint-disable-next-line no-console
    console.log(err)
  }
  return resultData
}

export default fetchWordData
