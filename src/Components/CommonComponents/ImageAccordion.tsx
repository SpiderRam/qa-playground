import { Accordion } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ImageInfo } from '../RouteComponents/MainTabAutoComplete'
import { ReactNode } from 'react'

export default function ImageAccordion({
  item,
  icon,
  expanded,
  expandedIdentifier,
  handleAccordions,
}: {
  item: ImageInfo
  icon?: ReactNode
  expanded: boolean
  expandedIdentifier: string
  handleAccordions: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}) {
  return (
    <Accordion expanded={expanded} onChange={handleAccordions(expandedIdentifier)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color='secondary' />}
        aria-controls={`${expandedIdentifier}-content`}
        id={`${expandedIdentifier}-header`}
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
