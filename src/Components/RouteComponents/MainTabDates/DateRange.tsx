import { Button, Card, Grid, Stack, Typography } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState } from 'react'
import behaviors from '../../../Data/Behaviors'
import BehaviorsList from '../../CommonComponents/BehaviorsList'
import { add } from 'date-fns'
import { customSlots } from './datePickerSlots'
import { isMobile } from 'react-device-detect'

function DateRange() {
  const today = new Date()
  const oneWeekOut = add(today, { weeks: 1 })
  const [startDate, setStartDate] = useState<Date | null | undefined>(today)
  const [endDate, setEndDate] = useState<Date | null | undefined>(oneWeekOut)
  const [rangedDate, setRangedDate] = useState<Date | null | undefined>(null)
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const [rangedDateOpen, setRangedDateOpen] = useState(false)

  return (
    <>
      <Grid container columns={{ xs: 1, sm: 6, md: 6 }}>
        <Grid item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={3} md={3}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
              Select min and max dates
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  label='Start date'
                  value={startDate}
                  open={startDateOpen}
                  onChange={(newStartDate, context) => {
                    if (context.validationError) {
                      return
                    }
                    if (!isMobile) {
                      setStartDateOpen(false)
                    }
                    setStartDate(newStartDate)
                  }}
                  slots={customSlots({
                    setDateMethod: setStartDate,
                    dateOpen: startDateOpen,
                    popperToggleMethod: () => {
                      setStartDateOpen(!startDateOpen)
                    },
                    clearButtonDisabled: !startDate,
                    calendarButtonDisabled: false,
                  })}
                />
                <DateTimePicker
                  label='End date'
                  value={endDate}
                  open={endDateOpen}
                  onChange={(newEndDate, context) => {
                    if (context.validationError) {
                      return
                    }
                    if (!isMobile) {
                      setEndDateOpen(false)
                    }
                    setEndDate(newEndDate)
                  }}
                  slots={customSlots({
                    setDateMethod: setEndDate,
                    dateOpen: endDateOpen,
                    popperToggleMethod: () => {
                      setEndDateOpen(!endDateOpen)
                    },
                    clearButtonDisabled: !endDate,
                    calendarButtonDisabled: false,
                  })}
                />
              </Stack>
            </LocalizationProvider>
          </Card>
        </Grid>
        <Grid item={true} sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={3} md={3}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
              Select date within your range
            </Typography>
            <Stack spacing={5.5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  open={rangedDateOpen}
                  disabled={!startDate || !endDate}
                  label='Date within range'
                  value={rangedDate}
                  maxDateTime={endDate}
                  minDateTime={startDate}
                  onChange={(newRangedDate, context) => {
                    if (context.validationError) {
                      return
                    }
                    if (!isMobile) {
                      setRangedDateOpen(false)
                    }
                    setRangedDate(newRangedDate)
                  }}
                  slots={customSlots({
                    setDateMethod: setRangedDate,
                    dateOpen: rangedDateOpen,
                    popperToggleMethod: () => {
                      setRangedDateOpen(!rangedDateOpen)
                    },
                    clearButtonDisabled: !rangedDate,
                    calendarButtonDisabled: !startDate || !endDate,
                  })}
                />
              </LocalizationProvider>
              <Button
                variant='outlined'
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                  setRangedDate(null)
                }}
              >
                Clear All
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          display: { xs: 'none', md: 'block' },
          marginTop: '1rem',
          paddingTop: '0.5rem',
        }}
      >
        <BehaviorsList idPrefix='mainTextFieldTab' items={behaviors.mainTabDates}></BehaviorsList>
      </Card>
    </>
  )
}

export default DateRange
