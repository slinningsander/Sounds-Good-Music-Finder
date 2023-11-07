import { useNavigate } from 'react-router-dom'
import GetAlbum from '../../queries/getAlbum'

const Albumpage = () => {
  const url = new URL(window.location.href)
  const navigate = useNavigate()
  const album_title = url.pathname.split('/').pop()
  const artist_name = url.pathname.split('/')[2]
  const decodedArtistName = decodeURIComponent(artist_name || '')
  const decodedAlbumTitle = decodeURIComponent(album_title || '')

  const { data, loading, error } = GetAlbum(
    decodedAlbumTitle,
    decodedArtistName
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return console.log(data)
}

export default Albumpage
