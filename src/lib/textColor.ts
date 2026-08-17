const hashText = (text: string) => {
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export const initialsFor = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

// Hue is derived from the initials (not the full text) so entries that share
// initials share a color, and the 360-degree spread keeps unrelated initials
// from colliding the way a small fixed palette did.
export const colorFor = (text: string) => {
  const hue = hashText(initialsFor(text)) % 360
  return { bg: `hsl(${hue}, 60%, 40%)`, fg: '#ffffff' }
}
