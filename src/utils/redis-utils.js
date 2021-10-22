export const getRedisEntry = async word => {
  const response = await fetch(`/api/redis/get-entry?word=${word}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const fetchedResponse = await response.json()
  const parsedResponse = await JSON.parse(fetchedResponse.response)
  return parsedResponse
}

export const setRedisEntry = async (word, wordData) => {
  const response = await fetch(`/api/redis/set-entry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: word, apiResponse: wordData }),
  })
  const parsedResponse = await response.json()
  return parsedResponse
}
