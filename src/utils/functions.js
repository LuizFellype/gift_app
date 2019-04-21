export const capitalize = word => {
  const letterUp = word[0].toUpperCase()
  const wordSeparated = [letterUp, ...word.slice(1)]
  return wordSeparated.join('')
}
