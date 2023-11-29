import {
  Alert,
  Autocomplete,
  FormControlLabel,
  TextField,
  styled,
} from '@mui/material'
import GetAllTags from '../../../graphql/queries/getAllTags'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateTags } from '../../../redux/slices/tagFilterSlice'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../../../redux/store'
import { Tag } from '../../../types'

export function AlbumTagFilter() {
  // Redux hooks for dispatching actions and selecting state
  const dispatch = useDispatch()
  const selectedTags = useSelector((state: RootState) => state.filterTags.value)

  // State for storing and updating selected tags
  const [values, setValues] = useState<Tag[]>([])

  // Transform selected tags for display when they change
  useEffect(() => {
    const transformedSelectedTags = selectedTags.map((tag) => {
      const firstLetter = tag.charAt(0).toUpperCase()
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        option: tag,
      }
    })
    setValues(transformedSelectedTags)
  }, [selectedTags])

  // Fetch all tags from GraphQL query
  const { data, loading, error } = GetAllTags()

  // Array to store all tags
  const alltags: string[] = []

  // Push fetched tags to the array
  if (!loading && data?.tags && !error) {
    for (let i = 0; i < data.tags.length; i++) {
      alltags.push(data.tags[i].tag_name)
    }
    // Transform fetched tags for display
    const options = alltags.map((option) => {
      const firstLetter = option.charAt(0).toUpperCase()
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        option: option,
      }
    })

    // Custom styles for rendering tags
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

    // Custom styles for rendering group headers
    const GroupHeader = styled('div')({
      position: 'sticky',
      padding: '4px 10px',
      color: 'white',
      backgroundColor: '#5C469C',
    })

    // Custom styles for rendering group items
    const GroupItems = styled('ul')({
      padding: '0',
      backgroundColor: '#1D267D',
      color: 'white',
    })

    // Function to handle the selection of tags
    const getPickedTags = (newValues: Tag[]) => {
      console.log(newValues)
      const tagsQueryFormat = newValues.map((item) => item.option)
      setValues(newValues)
      dispatch(updateTags(tagsQueryFormat))
    }

    // Render the Autocomplete component with necessary props and styles
    return (
      <>
        <FormControlLabel
          control={
            <Autocomplete
              value={values}
              onChange={(_event: unknown, newValue: Tag[] | null) => {
                console.log(newValue)
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
                  <CustomChip {...getTagProps({ index })}>
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
          data-cy="Autocomplete"
        />
      </>
    )
  } else {
    // Render an info alert if loading or error occurs
    return (
      <>
        <Alert severity="info">Was not able to load tag filter</Alert>
      </>
    )
  }
}
