export default async function fetchWordData(word) {
  const response = await fetch(`/api/words-api/fetch-word-data?word=${word}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const parsedResponse = await response.json()
  return parsedResponse
}
