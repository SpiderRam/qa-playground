import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import MainTabWrapper from './MainTabWrapper'
import { useState } from 'react'
import SingleDate from './MainTabDates/SingleDate'
import DateRange from './MainTabDates/DateRange'

type DateViewOptions = 'single' | 'range'

function MainTabDates() {
  const [dateView, setDateView] = useState<DateViewOptions>('single')

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newAlignment: DateViewOptions) => {
    setDateView(newAlignment)
  }

  return (
    <>
      <MainTabWrapper title='Date Pickers'>
        <Box sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <ToggleButtonGroup value={dateView} exclusive onChange={handleViewChange} aria-label='text alignment'>
            <ToggleButton value='single' aria-label='display single date'>
              Single
            </ToggleButton>
            <ToggleButton value='range' aria-label='display date range'>
              Range
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {dateView === 'single' ? <SingleDate /> : <DateRange />}
      </MainTabWrapper>
    </>
  )
}

export default MainTabDates
