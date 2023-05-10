import { useEffect, useState } from 'react'
import MainTabWrapper from './MainTabWrapper'
import { getDogInfo } from '../../Data/dogBreeds'
import { Autocomplete, Card, Checkbox, Grid, TextField, Typography } from '@mui/material'
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
  const [expanded, setExpanded] = useState<string | false>(false)

  useEffect(() => {
    getDogInfo()
      .then(res => {
        setAllDogs(res)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  const handleAccordions = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <MainTabWrapper title='Select up to five dog breeds'>
      <Grid container columns={{ xs: 1, sm: 6, md: 6 }}>
        <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={3} md={3}>
          <Autocomplete
            multiple
            openOnFocus={true}
            value={selectedDogs}
            disabled={!allDogs.length}
            getOptionDisabled={option => {
              const selected = selectedDogs.some(dog => dog.display === option.display)
              return !selected && selectedDogs.length >= 5
            }}
            id='dogBreedsAutoComplete'
            options={allDogs}
            disableCloseOnSelect
            onChange={(event, values) => {
              setSelectedDogs(values)
            }}
            getOptionLabel={option => option.display}
            isOptionEqualToValue={(option, value) => {
              return option.display === value.display
            }}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox
                    data-testid={`dogBreedsAutoCompleteOptionCheckbox_${
                      props['data-option-index' as keyof typeof props]
                    }`}
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <span data-testid={`dogBreedsAutoCompleteOption_${props['data-option-index' as keyof typeof props]}`}>
                    {option.display}
                  </span>
                </li>
              )
            }}
            renderInput={params => <TextField {...params} label={!allDogs.length ? 'Loading....' : 'Dog breeds'} />}
          />
          <Card
            sx={{
              display: { xs: 'none', md: 'block' },
              marginTop: '1rem',
              paddingTop: '0.5rem',
            }}
          >
            <BehaviorsList idPrefix='mainAutoCompleteTab' items={behaviors.mainTabAutoComplete}></BehaviorsList>
          </Card>
        </Grid>
        <Grid item={true} sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={3} md={3}>
          {selectedDogs.length > 0 ? (
            <div data-testid='mainAutoCompleteTabAccordions'>
              {selectedDogs.map((dog, index) => {
                const identifier = `panel-${index + 1}`
                return (
                  <ImageAccordion
                    key={index}
                    item={dog}
                    expandedIdentifier={identifier}
                    expanded={expanded === identifier}
                    handleAccordions={handleAccordions}
                    icon={<PetsIcon color='primary' sx={{ marginRight: '1ch' }} />}
                  />
                )
              })}
            </div>
          ) : (
            <Card sx={{ padding: '1rem' }} data-testid='mainAutoCompleteTabNoSelections'>
              <Typography component={'p'}>
                <PetsIcon color='primary' sx={{ marginRight: '1ch', verticalAlign: 'text-bottom' }} />
                No breeds selected
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </MainTabWrapper>
  )
}

export default MainTabAutoComplete
