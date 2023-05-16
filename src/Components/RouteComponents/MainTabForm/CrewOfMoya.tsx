import { Avatar, Box, Card, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import farscapeCharacters from '../../../Data/FarscapeCharacters'
import RestoreFromTrashTwoToneIcon from '@mui/icons-material/RestoreFromTrashTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

function CrewOfMoya() {
  const [characters, setCharacters] = useState(farscapeCharacters)
  const [banishedCount, setBanishedCount] = useState(0)

  useEffect(() => {
    const count = characters.filter(char => char.banished === true)
    setBanishedCount(count.length)
  }, [characters])

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
      <Typography variant='h4' id='moyaHeader'>
        Too Much Drama
      </Typography>
      <Typography>Select three... personalities... to banish from Moya.</Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        {characters.map((being, index) => {
          return (
            <Chip
              key={`moyaCrew_${index}`}
              disabled={being.characterName === 'Pilot' || (!being.banished && banishedCount >= 3)}
              avatar={<Avatar alt={being.characterName} src={being.image} />}
              label={being.characterName}
              variant='outlined'
              classes={{
                root: being.banished ? 'banishedChip' : '',
              }}
              sx={{
                marginY: '1rem',
                minWidth: '120px',
                justifyContent: 'space-between',
              }}
              onDelete={() => {
                const updated = characters.map(char => {
                  if (char.characterName === being.characterName) {
                    return Object.assign({ ...char }, { banished: !char.banished })
                  }
                  return char
                })
                setCharacters(updated)
              }}
              deleteIcon={
                being.banished ? (
                  <RestoreFromTrashTwoToneIcon classes={{ root: 'customChipIcon' }} />
                ) : (
                  <DeleteTwoToneIcon classes={{ root: 'customChipIcon' }} />
                )
              }
            />
          )
        })}
      </Box>
    </Card>
  )
}

export default CrewOfMoya
