//import React from 'react'
import styles from './AlbumTagFilter.module.css'
import {
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'
import GetAllTags from '../../../../queries/getAllTags'
import GetAlbumsByTags from '../../../../queries/getAlbumsByTags'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  //selectFilterTags,
  //selectFilterTags,
  updateTags,
} from '../../../../redux/slices/tagFilterSlice'
//useEffect
export function AlbumTagFilter() {
  const [values, setValues] = useState<string[]>([])
  const dispatch = useDispatch()
  //const [selectedTags, setSelectedTags] = useState<string[]>([])
  //const selectedFilterTags = useSelector(selectFilterTags)
  const { data, loading, error } = GetAllTags()
  // const {
  //   data: albumsData,
  //   loading: albumsLoading,
  //   error: albumsError,
  // } = GetAlbumsByTags(selectedFilterTags)

  const alltags: string[] = []
  if (!loading && data.tags) {
    for (let i = 0; i < data.tags.length; i++) {
      alltags.push(data.tags[i].tag_name)
    }
    const options = alltags.map((option) => {
      const firstLetter = option.charAt(0).toUpperCase()
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        option: option,
      }
    })

    // if (albumsLoading) {
    //   console.log('albumsData is loading')
    // } else if (albumsError) {
    //   console.log('albumsData is error', albumsError || error)
    // } else if (albumsData) {
    //   console.log('Album Data: ', albumsData)
    // }

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

    const getPickedTags = (newValues: string[]) => {
      const tagsQueryFormat = newValues.map((item) => item.option)
      // {
      //tag_name: item.option,
      // }

      console.log('Formatted tags for query: ', tagsQueryFormat)
      setValues(newValues)
      dispatch(updateTags(tagsQueryFormat))
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
      </>
    )
  }
}
