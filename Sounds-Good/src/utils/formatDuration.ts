export default function formatDuration(duration: number): string {
  if (duration === 0) {
    return 'N/A'
  } else {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60

    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${formattedMinutes}:${formattedSeconds}`
  }
}
