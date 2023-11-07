import styles from './FilterComponent.module.css'
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import TuneIcon from '@mui/icons-material/Tune'
import React from 'react'

export function FilterComponent() {
  const iconCheckLabel = { inputProps: { 'aria-label': 'Icon Checkbox' } }

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

  const [checked, setChecked] = React.useState(false)
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const filterForm = (
    <FormGroup
      className={styles.formGroup}
      sx={
        checked
          ? {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }
          : { display: 'none' }
      }
    >
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Artists"
        labelPlacement="top"
        className={styles.filterCheck}
      />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Albums"
        labelPlacement="top"
        className={styles.filterCheck}
      />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Songs"
        labelPlacement="top"
        className={styles.filterCheck}
      />
      <FormControlLabel
        control={
          <Autocomplete
            multiple
            limitTags={2}
            id="tag-search"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            // defaultValue={[mockData[13], mockData[12], mockData[11]]} //defaultValue
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
    </FormGroup>
  )
  return (
    <React.Fragment>
      <FormControlLabel
        value="top"
        id="iconCheck"
        control={
          <Checkbox
            {...iconCheckLabel}
            icon={<TuneIcon sx={{ border: '2px solid gray' }} />}
            checkedIcon={
              <TuneIcon
                sx={{ border: '2px solid gray', background: '#99ccff' }}
              />
            }
            checked={checked}
            onChange={handleChecked}
          />
        }
        label="Filter"
        labelPlacement="top"
      />
      {filterForm}
    </React.Fragment>
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
