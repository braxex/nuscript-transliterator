export default async function fetchWordData(searchString) {
  let resultData = null
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_HOST}/words/${searchString}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.NEXT_PUBLIC_API_HOST,
          'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )
    resultData = await response.json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
  return resultData
}
