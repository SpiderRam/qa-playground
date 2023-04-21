import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import { useState, ComponentType } from 'react'

type TransitionProps = Omit<SlideProps, 'direction'>

type InfoSnackProps = {
  message: string | JSX.Element
  direction?: 'left' | 'right' | 'up' | 'down' | undefined
  anchor?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
}

export default function DirectionSnackbar({
  message,
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
      <InfoTwoToneIcon onClick={handleClick(SlideTransition)}>Right</InfoTwoToneIcon>

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
