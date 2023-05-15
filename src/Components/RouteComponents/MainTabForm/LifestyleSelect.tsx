import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormComponentProps } from '../MainTabForm'
import { useState } from 'react'

function FormLifestyleSelect({ lifestyles, fieldRef }: FormComponentProps & { lifestyles: string[] }) {
  const [lifestyleValue, setLifestyleValue] = useState<string>('')

  return (
    <Autocomplete
      onKeyUp={e => {
        setLifestyleValue(fieldRef.current?.value || '')
      }}
      onChange={(event, value) => {
        setLifestyleValue(value || '')
      }}
      value={lifestyleValue}
      id='lifestyleField'
      freeSolo
      options={lifestyles}
      renderInput={params => (
        <TextField
          {...params}
          helperText='Select an option or enter a custom value'
          label='Select ideal lifestyle'
          inputRef={fieldRef}
        />
      )}
    />
  )
}

export default FormLifestyleSelect
