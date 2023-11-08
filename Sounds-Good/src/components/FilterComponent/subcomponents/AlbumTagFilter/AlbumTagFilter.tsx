import React from 'react'
import styles from './AlbumTagFilter.module.css'
import {
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'

export function AlbumTagFilter() {
  const options = mockData.map((option) => {
    const firstLetter = option.title[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    }
  })
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
  return (
    <>
      <div>{`value: ${
        values !== null
          ? `'${values.forEach((value) => console.log(value.title))}'`
          : 'null'
      }`}</div>
      <FormControlLabel
        control={
          <Autocomplete
            value={values}
            onChange={(_event: unknown, value: string[]) => {
              setValues(value)
            }}
            multiple
            limitTags={2}
            size="small"
            id="tag-search"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
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
