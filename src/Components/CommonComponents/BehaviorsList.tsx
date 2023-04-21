import { Typography } from '@mui/material'

type BehaviorsListProps = {
  items: string[]
  idPrefix: string
}

function BehaviorsList({ items, idPrefix }: BehaviorsListProps) {
  return (
    <>
      <Typography
        sx={{
          fontSize: '1.7rem',
          marginTop: '0.5rem',
        }}
        id={`${idPrefix}BehaviorsListHeader`}
      >
        Behaviors
      </Typography>
      <ul
        data-testid={`${idPrefix}BehaviorsList`}
        aria-labelledby={`${idPrefix}BehaviorsListHeader`}
        className='behaviors'
      >
        {items.map((item, index) => {
          return <li key={`behavior_${index}`}>{item}</li>
        })}
      </ul>
    </>
  )
}

export default BehaviorsList
