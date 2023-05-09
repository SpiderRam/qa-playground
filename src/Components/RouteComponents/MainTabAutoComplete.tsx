import { useEffect, useState } from 'react'
import MainTabWrapper from './MainTabWrapper'
import { getDogInfo } from '../../Data/dogBreeds'
import { Autocomplete, Card, Checkbox, Grid, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import behaviors from '../../Data/Behaviors'
import BehaviorsList from '../CommonComponents/BehaviorsList'
import ImageAccordion from '../CommonComponents/ImageAccordion'
import PetsIcon from '@mui/icons-material/Pets'

export type ImageInfo = {
  imgSrc: string
  display: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

function MainTabAutoComplete() {
  const [allDogs, setAllDogs] = useState<ImageInfo[]>([])
  const [selectedDogs, setSelectedDogs] = useState<ImageInfo[]>([])

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
      <Grid container columns={{ xs: 1, sm: 6, md: 6 }}>
        <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={3} md={3}>
          <Autocomplete
            multiple
            value={selectedDogs}
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
            renderInput={params => <TextField {...params} label={!allDogs.length ? 'Loading...' : 'Dog breeds'} />}
          />
          <Card
            sx={{
              display: { xs: 'none', md: 'block' },
              marginTop: '1rem',
              paddingTop: '0.5rem',
            }}
          >
            <BehaviorsList idPrefix='mainMultiSelectTab' items={behaviors.mainTabMultiSelect}></BehaviorsList>
          </Card>
        </Grid>
        <Grid item={true} sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={3} md={3}>
          {selectedDogs.map((dog, index) => {
            return (
              <ImageAccordion
                key={index}
                item={dog}
                index={index}
                icon={<PetsIcon color='primary' sx={{ marginRight: '1ch' }} />}
              />
            )
          })}
        </Grid>
      </Grid>
    </MainTabWrapper>
  )
}

export default MainTabAutoComplete
