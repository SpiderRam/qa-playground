import { TextField } from '@mui/material'
import { FormComponentProps } from '../MainTabForm'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

function FormNameField({ fieldRef }: FormComponentProps & { setDisableSubmit: Dispatch<SetStateAction<boolean>> }) {
  const [value, setValue] = useState('')

  return (
    <TextField
      inputRef={fieldRef}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
      }}
      value={value}
      color='primary'
      required
      fullWidth
      id='nameField'
      label='Your Name'
      variant='outlined'
    />
  )
}

export default FormNameField
