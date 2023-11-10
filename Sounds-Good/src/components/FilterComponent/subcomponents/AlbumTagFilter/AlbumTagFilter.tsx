import React from 'react'
import styles from './AlbumTagFilter.module.css'
import {
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'
import GetAllTags from '../../../../queries/getAllTags'
import GetAlbumsByTags from '../../../../queries/getAlbumsByTags'

export function AlbumTagFilter() {
  const { data, loading, error } = GetAllTags()
  const alltags: string[] = []
  for (let i = 0; i < 558; i++) {
    if (!loading) {
      alltags.push(data.tags[i].tag_name)
    }
  }
  const options = alltags.map((option) => {
    const firstLetter = option.charAt(0).toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      option: option,
    }
  })

  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const {
    data: albumsData,
    loading: albumsLoading,
    error: albumsError,
  } = GetAlbumsByTags(selectedTags)

  React.useEffect(() => {
    if (albumsLoading) {
      console.log('albumsData is loading')
    } else if (albumsError) {
      console.log('albumsData is error', albumsError)
    } else if (albumsData) {
      console.log('Album Data: ', albumsData)
    }
  }, [albumsData, albumsLoading, albumsError])

  const GroupHeader = styled('div')({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: 'white',
    backgroundColor: '#800080',
  })

  const GroupItems = styled('ul')({
    padding: '0',
    backgroundColor: 'white',
  })

  const [values, setValues] = React.useState<string[]>([])
  if (loading) return <h1>loading..</h1>
  if (error) return <h1>error</h1>

  function getPickedTags(newValues: any[]) {
    const tagsQueryFormat = newValues.map((item) => ({ tag_name: item.option }))
    console.log('Formatted tags for query: ', tagsQueryFormat)
    setValues(newValues)
    setSelectedTags(tagsQueryFormat) // updates selectedTags with tagsQueryFormat (expected object)
  }
  return (
    <>
      <FormControlLabel
        control={
          <Autocomplete
            value={values}
            onChange={(event: unknown, newValue: string[] | null) => {
              setValues(newValue || [])
              getPickedTags(newValue || [])
            }}
            isOptionEqualToValue={(option, value) =>
              option.option === value.option
            }
            multiple
            limitTags={2}
            size="small"
            id="tag-search"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            // options={options}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.option}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Rock" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            sx={{ width: '300px' }}
          />
        }
        labelPlacement="top"
        label="Search tags"
        className={styles.tagSearch}
      />

      {/* {albumsData && albumsData.albumsConnection && (
        <ul className={styles.albums_by_tags_list}>
          {albumsData.albumsConnection.edges.map((edge, index) => (
            <li key={index}>{edge.node.album_title}</li>
          ))}
        </ul>
      )} */}
    </>
  )
}
