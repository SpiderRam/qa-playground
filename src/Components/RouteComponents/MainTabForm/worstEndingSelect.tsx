import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormComponentProps } from '../MainTabForm'
import { useEffect, useState } from 'react'

function FormWorstEndingSelect({ fieldRef, endings }: FormComponentProps & { endings: string[] }) {
  const [value, setValue] = useState('')
  const [helperText, setHelperText] = useState<string | null>(null)
  const label = 'Which had the worst ending?'

  useEffect(() => {
    const commentary = {
      'Battlestar Galactica': 'All that tension and anticipation, for nothing.',
      'Game of Thrones': 'The books are better anyway.',
      Lost: 'Wrote themselves into a corner, then flopped.',
      'Star Trek Voyager': 'Janeway + Chakotay all the way.',
    }
    if (value && value.length) {
      setHelperText(commentary[value as keyof typeof commentary])
    } else {
      setHelperText(null)
    }
  }, [value])

  return (
    <FormControl fullWidth required>
      <InputLabel id='endingsLabel'>{label}</InputLabel>
      <Select
        inputRef={fieldRef}
        labelId='endingsLabel'
        id='endingsSelect'
        value={value}
        label={label}
        onChange={event => {
          const val = event.target.value
          setValue(val)
        }}
      >
        {endings.map((option, index) => {
          return (
            <MenuItem key={`option_${index}`} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : <></>}
    </FormControl>
  )
}

export default FormWorstEndingSelect
