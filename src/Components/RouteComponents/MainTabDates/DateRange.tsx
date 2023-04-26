import { Stack } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState } from 'react'

function DateRange() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DateTimePicker
            label='Start date'
            value={startDate}
            onChange={newStartDate => {
              setStartDate(newStartDate)
            }}
          />
          <DateTimePicker
            label='End date'
            value={endDate}
            onChange={newEndDate => {
              setEndDate(newEndDate)
            }}
          />
        </Stack>
      </LocalizationProvider>
    </>
  )
}

export default DateRange
