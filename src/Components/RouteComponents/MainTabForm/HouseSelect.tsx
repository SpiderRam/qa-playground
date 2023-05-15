import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormComponentProps } from '../MainTabForm'
import { useState } from 'react'

function FormHouseSelect({ fieldRef, houses }: FormComponentProps & { houses: string[] }) {
  const [value, setValue] = useState('')
  const label = "Hogwart's House"

  return (
    <FormControl fullWidth>
      <InputLabel id='hogwartsHouseLabel'>{label}</InputLabel>
      <Select
        inputRef={fieldRef}
        labelId='hogwartsHouseLabel'
        id='hogwartsHouseSelect'
        value={value}
        label={label}
        onChange={event => {
          setValue(event.target.value)
        }}
      >
        {houses.map((house, index) => {
          return (
            <MenuItem key={`house_${index}`} value={house}>
              {house}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default FormHouseSelect
