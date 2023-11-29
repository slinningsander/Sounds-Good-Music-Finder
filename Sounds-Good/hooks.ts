import { useEffect, useState } from 'react'

const mobileBpUpper = 768

export function useMobile(): boolean {
  const [width, setWidth] = useState(window.innerWidth)
  const updateMedia = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })
  return width < mobileBpUpper
}
