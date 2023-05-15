import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormComponentProps } from '../MainTabForm'
import { useState } from 'react'

function FormResistanceSelect({ fieldRef, resistanceOptions }: FormComponentProps & { resistanceOptions: string[] }) {
  const [value, setValue] = useState('')

  return (
    <FormControl fullWidth>
      <InputLabel id='resistanceOptionsLabel'>Resistance is...</InputLabel>
      <Select
        inputRef={fieldRef}
        labelId='resistanceOptionsLabel'
        id='resistanceOptions'
        value={value}
        label='Resistance is...'
        onChange={event => {
          setValue(event.target.value)
        }}
      >
        {resistanceOptions.map((option, index) => {
          return (
            <MenuItem key={`option_${index}`} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default FormResistanceSelect
