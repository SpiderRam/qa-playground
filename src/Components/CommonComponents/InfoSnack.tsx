import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import { useState, ComponentType } from 'react'
import { IconButton } from '@mui/material'

type TransitionProps = Omit<SlideProps, 'direction'>

type InfoSnackProps = {
  message: string | JSX.Element
  buttonId: string
  direction?: 'left' | 'right' | 'up' | 'down' | undefined
  anchor?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
}

export default function InfoSnack({
  message,
  buttonId,
  direction = 'left',
  anchor = { vertical: 'top', horizontal: 'right' },
}: InfoSnackProps) {
  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction={direction} />
  }

  const [open, setOpen] = useState(false)
  const [transition, setTransition] = useState<ComponentType<TransitionProps> | undefined>(undefined)

  const handleClick = (Transition: ComponentType<TransitionProps>) => () => {
    setTransition(() => Transition)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <IconButton classes={{ root: 'colorUnset' }} data-testid={buttonId} onClick={handleClick(SlideTransition)}>
        <InfoTwoToneIcon></InfoTwoToneIcon>
      </IconButton>

      <Snackbar
        classes={{
          anchorOriginTopRight: 'navSnack',
        }}
        ContentProps={{
          classes: {
            root: 'infoSnackContent',
          },
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={anchor}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      />
    </div>
  )
}
