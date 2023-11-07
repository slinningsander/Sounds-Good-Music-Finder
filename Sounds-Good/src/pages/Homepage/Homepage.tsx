import Search from '../../components/Search/Search.tsx'
import ArtistCardContainer from '../../components/ArtistCardContainer/ArtistCardContainer.tsx'
export default function Homepage() {
  return (
    <>
      <h1>This is the Homepage!</h1>
      <Search />
      <ArtistCardContainer input="A" />
    </>
  )
}
