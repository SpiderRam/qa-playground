import { Stack } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState } from 'react'

function SingleDate() {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date())

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label='Select a date'
          value={singleDate}
          onChange={newSingleDate => {
            setSingleDate(newSingleDate)
          }}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default SingleDate
