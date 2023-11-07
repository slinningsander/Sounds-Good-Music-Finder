import { useNavigate } from 'react-router-dom'
import GetAlbum from '../../queries/getAlbum'

const Albumpage = () => {
  const url = new URL(window.location.href)
  const navigate = useNavigate()
  const album_title = url.pathname.split('/').pop()
  const artist_name = url.pathname.split('/')[2]

  const { data, loading, error } = GetAlbum(album_title, artist_name)

  return console.log(data)
}

export default Albumpage
