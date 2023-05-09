import { Accordion } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ImageInfo } from '../RouteComponents/MainTabAutoComplete'
import { ReactNode } from 'react'

export default function ImageAccordion({ item, index, icon }: { item: ImageInfo; index: number; icon?: ReactNode }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color='secondary' />}
        aria-controls={`panel-${index + 1}-content`}
        id={`panel-${index + 1}-header`}
      >
        {icon}
        <Typography>{item.display}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component='div'>
          <img src={item.imgSrc} alt={item.display} className='responsiveImage' />
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
