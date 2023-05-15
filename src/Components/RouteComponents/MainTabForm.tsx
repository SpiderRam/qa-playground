import { Button, Grid } from '@mui/material'
import MainTabWrapper from './MainTabWrapper'
import { MutableRefObject, useRef, useState } from 'react'
import FormNameField from './MainTabForm/NameField'
import FormHouseSelect from './MainTabForm/HouseSelect'
import FormResistanceSelect from './MainTabForm/ResistanceSelect'
import FormLifestyleSelect from './MainTabForm/LifestyleSelect'
import FormNikitaSelect from './MainTabForm/NikitaSelect'
import FormWorstEndingSelect from './MainTabForm/worstEndingSelect'
import FormGameRatings from './MainTabForm/GameRatings'

const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
const lifestyles = ['Hobbit', 'Storm Trooper', 'Belter', 'Mutant', 'Fremen', 'Klingon']
const resistanceOptions = ['Futile', 'Useless']
const worstEndings = ['Battlestar Galactica', 'Game of Thrones', 'Lost', 'Star Trek Voyager']
const nikitas = ['Anne Parillaud', 'Jade Leung', 'Bridget Fonda', 'Sanjay Dutt', 'Peta Wilson', 'Maggie Q']

export type FormData = {
  userName?: string
  hogwartsHouse?: string
  resistance?: string
  lifestyle?: string
  nikita?: 'Peta Wilson'
  worstEnding?: string
  gameRatings?: {
    Wingspan: number
    'Terraforming Mars': number
    Ascension: number
    'Bob Ross': number
    'Cat Lady': number
    Firefly: number
  }
  // crewOfMoya - https://mui.com/material-ui/react-chip/#avatar-chip
  reynoldsEssay?: string
  chickenGood?: boolean
  eloraDanan?: boolean
  truth?: boolean
  knowMore?: boolean
  booksAreBetter?: boolean
  sequelsRock?: boolean
  cowsMakeMilk?: boolean
  fiveLights?: boolean
  cosima?: boolean
}

export type FormComponentProps = {
  fieldRef: MutableRefObject<HTMLInputElement | undefined>
}

function MainTabForm() {
  const userFieldRef = useRef<HTMLInputElement>()
  const houseFieldRef = useRef<HTMLInputElement>()
  const lifestyleFieldRef = useRef<HTMLInputElement>()
  const resistanceFieldRef = useRef<HTMLInputElement>()
  const endingsFieldRef = useRef<HTMLInputElement>()
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const handleSubmit = () => {
    const formData = {
      userName: userFieldRef.current?.value,
      hogwartsHouse: houseFieldRef.current?.value || '',
      lifestyle: lifestyleFieldRef.current?.value || '',
      resistance: resistanceFieldRef.current?.value || '',
      worstEnding: endingsFieldRef.current?.value || '',
    }
    console.log('SUBMIT!', formData)
  }

  return (
    <MainTabWrapper title='Nerd survey'>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Grid container columns={{ xs: 1, sm: 4, md: 4 }}>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={2} md={2}>
            <FormNameField fieldRef={userFieldRef} setDisableSubmit={setDisableSubmit} />
          </Grid>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormHouseSelect fieldRef={houseFieldRef} houses={houses} />
          </Grid>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormResistanceSelect fieldRef={resistanceFieldRef} resistanceOptions={resistanceOptions} />
          </Grid>
        </Grid>
        <Grid container columns={{ xs: 1, sm: 3, md: 3 }}>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormLifestyleSelect lifestyles={lifestyles} fieldRef={lifestyleFieldRef} />
          </Grid>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormNikitaSelect nikitas={nikitas} fieldRef={lifestyleFieldRef} setDisableSubmit={setDisableSubmit} />
          </Grid>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormWorstEndingSelect endings={worstEndings} fieldRef={endingsFieldRef} />
          </Grid>
        </Grid>
        <Grid container columns={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={1} md={1}>
            <FormGameRatings />
          </Grid>
        </Grid>
        <Button type='submit' disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </MainTabWrapper>
  )
}

export default MainTabForm
