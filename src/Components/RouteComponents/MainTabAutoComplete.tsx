import { useEffect, useState } from 'react'
import MainTabWrapper from './MainTabWrapper'
import { getDogInfo } from '../../Data/dogBreeds'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

type DogInfo = {
  imgSrc: string
  display: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

function MainTabAutoComplete() {
  const [allDogs, setAllDogs] = useState<DogInfo[]>([])
  const [selectedDogs, setSelectedDogs] = useState<DogInfo[]>([])

  useEffect(() => {
    getDogInfo()
      .then(res => {
        setAllDogs(res)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <MainTabWrapper title='Select up to five dog breeds'>
      {selectedDogs.map((dog, index) => {
        return <img style={{ height: '50px', width: '50px' }} key={index} src={dog.imgSrc} alt={dog.display} />
      })}
      <Autocomplete
        multiple
        disabled={!allDogs.length}
        getOptionDisabled={option => {
          const selected = selectedDogs.some(dog => dog.display === option.display)
          return !selected && selectedDogs.length >= 5
        }}
        id='dogBreedsMultiSelect'
        options={allDogs}
        disableCloseOnSelect
        onChange={(event, values) => {
          setSelectedDogs(values)
        }}
        getOptionLabel={option => option.display}
        isOptionEqualToValue={(option, value) => {
          return option.display === value.display
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option.display}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={params => <TextField {...params} label={!allDogs.length ? 'Loading...' : 'Dog breeds'} />}
      />
    </MainTabWrapper>
  )
}

export default MainTabAutoComplete
