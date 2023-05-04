import {
  ClickAwayListener,
  IconButton,
  InputAdornment,
  Popper,
  PopperProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import EventIcon from '@mui/icons-material/Event'
import { PickersActionBarProps, PickersActionBar } from '@mui/x-date-pickers'
import { isMobile } from 'react-device-detect'

type CustomSlotsProps = {
  setDateMethod: Dispatch<SetStateAction<Date | null | undefined>>
  dateOpen: boolean
  popperToggleMethod: () => void
  clearButtonDisabled: boolean
  calendarButtonDisabled: boolean
  idPrefix: string
}

const customSlots = ({
  setDateMethod,
  clearButtonDisabled,
  calendarButtonDisabled,
  popperToggleMethod,
  dateOpen,
  idPrefix,
}: CustomSlotsProps) => {
  const slots: {
    inputAdornment: () => JSX.Element
    popper: (props: PopperProps) => JSX.Element
    actionBar?: (props: PickersActionBarProps) => JSX.Element
    textField?: (props: TextFieldProps) => JSX.Element
  } = {
    // Add a clear field icon - this is not currently supported
    // out of the box by Mui: https://github.com/mui/mui-x/issues/4450
    inputAdornment: () => {
      return (
        <InputAdornment position='end'>
          <>
            <IconButton
              data-testid={`${idPrefix}ClearButton`}
              disabled={clearButtonDisabled}
              onClick={() => {
                setDateMethod(null)
              }}
              aria-label='clear field'
            >
              <ClearIcon />
            </IconButton>
          </>
          <>
            <IconButton
              data-testid={`${idPrefix}CalendarButton`}
              disabled={calendarButtonDisabled}
              onClick={() => {
                popperToggleMethod()
              }}
              aria-label='open date time picker'
            >
              <EventIcon />
            </IconButton>
          </>
        </InputAdornment>
      )
    },
    // Overriding the default icon means it is necessary to take control
    // of the open state, so a click away listener is needed to close
    // the popup when the user clicks outside of it.
    popper: (props: PopperProps) => {
      const controlledProps = Object.assign({}, props)
      controlledProps.open = dateOpen
      return (
        <ClickAwayListener
          onClickAway={() => {
            popperToggleMethod()
          }}
        >
          <Popper data-testid={`${idPrefix}Popup`} sx={{ zIndex: 10 }} {...controlledProps} />
        </ClickAwayListener>
      )
    },
  }

  if (isMobile) {
    // On mobile, the popper should close when the user clicks the OK
    // or cancel button, and that must also now be controlled manually.
    slots.actionBar = (props: PickersActionBarProps) => {
      return (
        <PickersActionBar
          {...props}
          onClick={() => {
            popperToggleMethod()
          }}
        />
      )
    }

    // On mobile, the input adornment icons are hidden altogether, and
    // the click event must be transferred to the field itself.
    slots.textField = (props: TextFieldProps) => {
      return (
        <TextField
          {...props}
          onClick={() => {
            popperToggleMethod()
          }}
        />
      )
    }
  }
  return slots
}

export { customSlots }
