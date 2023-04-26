import { Typography } from '@mui/material'
import { ReactNode } from 'react'

function MainTabWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Typography variant='h3' sx={{ marginTop: '1.5rem' }}>
        {title}
      </Typography>
      {children}
    </>
  )
}

export default MainTabWrapper
