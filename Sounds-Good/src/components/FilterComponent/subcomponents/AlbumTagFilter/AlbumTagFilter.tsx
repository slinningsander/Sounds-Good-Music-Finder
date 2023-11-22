import {
  Alert,
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'
import GetAllTags from '../../../../queries/getAllTags'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateTags, resetState } from '../../../../redux/slices/tagFilterSlice'
import CloseIcon from '@mui/icons-material/Close'

export function AlbumTagFilter() {
  const [values, setValues] = useState<string[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [dispatch])
  // const selectedTags = useSelector((state) => state.filterTags.value)
  const { data, loading, error } = GetAllTags()

  const alltags: string[] = []

  if (!loading && data?.tags && !error) {
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

    const CustomChip = styled('div')(({ theme }) => ({
      backgroundColor: '#5C469C',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '16px',
      marginRight: '8px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        cursor: 'pointer',
        marginLeft: theme.spacing(1),
      },
      '& .MuiSvgIcon-root:hover': {
        color: 'rgba(255, 255, 255, 0.7)',
      },
      '&:hover .MuiSvgIcon-root': {
        display: 'block',
      },
    }))
    const GroupHeader = styled('div')({
      position: 'sticky',
      padding: '4px 10px',
      color: 'white',
      backgroundColor: '#5C469C',
    })

    const GroupItems = styled('ul')({
      padding: '0',
      backgroundColor: '#1D267D',
      color: 'white',
    })

    const getPickedTags = (newValues: string[]) => {
      const tagsQueryFormat = newValues.map((item) => item.option)
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
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Pick multiple... "
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      backgroundColor: '#1D267D',
                      color: 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <CustomChip key={index} {...getTagProps({ index })}>
                    {option.option}
                    <CloseIcon
                      onClick={() => {
                        const updatedValues = [...values]
                        updatedValues.splice(index, 1)
                        setValues(updatedValues)
                        getPickedTags(updatedValues)
                      }}
                    />
                  </CustomChip>
                ))
              }
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
          //className={styles.tagSearch}
        />
      </>
    )
  } else {
    return (
      <>
        <Alert severity="info">Was not able to load tag filter</Alert>
      </>
    )
  }
}
