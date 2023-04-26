import { Card, CardContent, CircularProgress, Grid, Link, Typography } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState, useEffect } from 'react'
import { getHistory } from '../../../Data/thisDayInHistory'

type HistoryResponse = {
  selected: {
    pages: {
      content_urls: {
        desktop: {
          page: string
        }
      }
    }[]
    text: string
    year: number
  }[]
}

function SingleDate() {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date())
  const [history, setHistory] = useState<HistoryResponse | null>()
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    if (!singleDate) {
      return
    }
    getHistory(singleDate)
      .then(res => {
        setHistory(res)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [singleDate])

  useEffect(() => {
    setShowLoading(false)
  }, [history])

  const renderCards = () => {
    if (history) {
      return (
        <Grid container columns={{ xs: 1, sm: 6, md: 6 }}>
          {history.selected.map((item, index) => {
            const url = item.pages[0].content_urls.desktop.page
            if (url) {
              return (
                <Grid key={index} item={true} sx={{ paddingX: '1vw', paddingTop: '2rem' }} xs={1} sm={3} md={3}>
                  <Link sx={{ textDecoration: 'none' }} color='secondary' href={url} target='_blank'>
                    <Card>
                      <CardContent>
                        <Typography color='primary' component='span' sx={{ fontSize: '2rem' }}>
                          {item.year}
                        </Typography>
                        <Typography component='p'>{item.text}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              )
            } else {
              return <></>
            }
          })}
        </Grid>
      )
    } else {
      return <></>
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['month', 'day']}
        format='MMMM d'
        label='Select a date'
        value={singleDate}
        onChange={(newSingleDate, context) => {
          if (context.validationError) {
            return
          }
          setShowLoading(true)
          setSingleDate(newSingleDate)
        }}
      />
      {showLoading ? (
        <Typography component='div' sx={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Typography>
      ) : (
        <>{renderCards()}</>
      )}
    </LocalizationProvider>
  )
}

export default SingleDate
