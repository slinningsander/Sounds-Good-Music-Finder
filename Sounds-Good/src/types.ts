import { ReactNode } from 'react'

export type Children = ReactNode

export type AlbumEdgeType = {
  album: {
    album_title: string
    artistsCreatedAlbum: Array<{ artist_name: string }>
    album_art: string
  }
}

export type CommentType = {
  id: string
  text: string
}
