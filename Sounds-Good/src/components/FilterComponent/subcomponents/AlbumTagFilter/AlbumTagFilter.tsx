import React from 'react'
import styles from './AlbumTagFilter.module.css'
import {
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'
import GetAllTags from '../../../../queries/getAllTags'

export function AlbumTagFilter() {
  const { data, loading, error } = GetAllTags()
  const alltags: string[] = []
  for (let i = 0; i < 559; i++) {
    if (!loading) {
      // console.log(data.tags[i].tag_name)
      alltags.push(data.tags[i].tag_name)
    }
  }

  // const options = mockData.map((option) => {
  //   const firstLetter = option.title[0].toUpperCase()
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   }
  // })

  const options = alltags.map((option) => {
    const firstLetter = option.charAt(0).toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      // Assign the entire string to a property
      option: option,
    }
  })
  const optionValues = options.map((o) => o.option)
  console.log(options)

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

  function getPickedTags(values: string[]) {
    //den lagger med å hente verdier!
    console.log(values)
  }
  return (
    <>
      <FormControlLabel
        control={
          <Autocomplete
            value={values}
            onChange={(event: unknown, newValue: string[] | null) => {
              setValues(newValue || [])
              getPickedTags(values)
            }}
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
    </>
  )
}

const mockData = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
]
