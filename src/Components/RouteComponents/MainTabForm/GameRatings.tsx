import Backdrop from '@mui/material/Backdrop'
import SpeedDial from '@mui/material/SpeedDial'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import CloseIcon from '@mui/icons-material/Close'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { MouseEvent, useEffect, useState } from 'react'
import {
  Stack,
  Card,
  Rating,
  Typography,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material'
import gameObjects from '../../../Data/BoardGames'
import InfoSnack from '../../CommonComponents/InfoSnack'
import { toCamelCase } from '../../../Utils/formatters'
import { isMobile } from 'react-device-detect'

type BoardGame = {
  icon: JSX.Element
  name: string
  value: number | null
  image: string
  blurb: string
}

function FormGameRatings() {
  const [open, setOpen] = useState(false)
  const [games, setGames] = useState(gameObjects)
  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSelect = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const selected = games.find(game => game.name === e.currentTarget.textContent)
    setSelectedGame(selected || null)
    handleClose()
  }

  useEffect(() => {
    if (selectedGame) {
      const updated = games.find(game => game.name === selectedGame.name)
      setSelectedGame(updated || null)
    }
  }, [games, selectedGame])

  return (
    <Card
      sx={{
        transform: 'translateZ(0px)',
        flexGrow: 1,
        padding: '2rem 1rem',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        minHeight: '375px',
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        sx={{ position: 'absolute', top: 16, left: 16 }}
        icon={<EditTwoToneIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction='down'
        FabProps={{
          size: isMobile ? 'medium' : 'large',
          color: 'secondary',
        }}
      >
        {games.map(game => (
          <SpeedDialAction
            key={game.name}
            icon={game.icon}
            tooltipTitle={game.name}
            tooltipOpen
            onClick={e => {
              handleSelect(e)
            }}
            tooltipPlacement='right'
          />
        ))}
      </SpeedDial>
      <Typography variant='h4' id='gameRatingsHeader'>
        Game Ratings
      </Typography>
      {selectedGame ? (
        <></>
      ) : (
        <Button
          color='secondary'
          sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
          onClick={() => {
            const updated = games.map(game => {
              return Object.assign({ ...game }, { value: null })
            })
            setGames(updated)
          }}
        >
          Clear All
        </Button>
      )}
      {selectedGame ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            marginTop: '1.5rem',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <IconButton aria-label={`Close ${selectedGame.name} detail`} onClick={() => setSelectedGame(null)}>
                <CloseIcon color='secondary' />
              </IconButton>
            </CardActions>
            <CardMedia component='img' image={selectedGame.image} title={`${selectedGame.name}`} />
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {selectedGame.name}
                <InfoSnack
                  message={selectedGame.blurb}
                  autoHide={null}
                  iconButtonClasses={{ root: 'colorSecondary' }}
                  buttonId={`${toCamelCase(selectedGame.name)}Info`}
                  direction='up'
                  anchor={{ vertical: 'bottom', horizontal: 'right' }}
                />
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <Rating
                  name={selectedGame.name}
                  value={selectedGame.value}
                  precision={0.5}
                  onChange={(event, value) => {
                    const updated = games.map(game => {
                      if (game.name === selectedGame.name) {
                        const newGame = Object.assign({ ...game }, { value })
                        return newGame
                      } else {
                        return game
                      }
                    })
                    setGames(updated)
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <Stack>
            {games.map((game, index) => {
              return (
                <Box
                  key={`ratingKey_${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                  }}
                >
                  <Typography sx={{ marginRight: '3ch', fontWeight: '600' }} component='legend'>
                    {game.name}
                  </Typography>
                  <Rating
                    precision={0.5}
                    size={isMobile ? 'small' : 'medium'}
                    name={game.name}
                    value={game.value}
                    readOnly
                  />
                </Box>
              )
            })}
          </Stack>
        </Box>
      )}
    </Card>
  )
}

export default FormGameRatings
