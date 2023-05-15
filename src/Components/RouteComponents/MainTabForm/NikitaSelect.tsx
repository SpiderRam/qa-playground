import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormComponentProps } from '../MainTabForm'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function FormNikitaSelect({
  fieldRef,
  nikitas,
  setDisableSubmit,
}: FormComponentProps & { nikitas: string[]; setDisableSubmit: Dispatch<SetStateAction<boolean>> }) {
  const [value, setValue] = useState('')
  const [isInError, setIsInError] = useState(false)
  const label = 'Choose the best Nikita'

  useEffect(() => {
    if (value && value !== 'Peta Wilson') {
      setIsInError(true)
      setDisableSubmit(true)
    } else {
      setIsInError(false)
      setDisableSubmit(false)
    }
  }, [setDisableSubmit, value])

  return (
    <FormControl fullWidth required>
      <InputLabel error={isInError} id='nikitaLabel'>
        {label}
      </InputLabel>
      <Select
        inputRef={fieldRef}
        labelId='nikitaLabel'
        id='nikitaSelect'
        error={isInError}
        value={value}
        label={label}
        onChange={event => {
          const val = event.target.value
          if (val && val !== 'Peta Wilson') {
            setDisableSubmit(true)
          } else {
            setDisableSubmit(false)
          }
          setValue(val)
        }}
      >
        {nikitas.map((actress, index) => {
          return (
            <MenuItem key={`actress_${index}`} value={actress}>
              {actress}
            </MenuItem>
          )
        })}
      </Select>
      {isInError ? (
        <FormHelperText error={isInError}>Wrong. Peta Wilson is the only valid choice.</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  )
}

export default FormNikitaSelect
