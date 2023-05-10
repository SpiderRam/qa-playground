import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import SingleDate from './SingleDate'
import { format } from 'date-fns'

// npm run test:unit -- -t 'Main Tab Dates - Single Date'

jest.setTimeout(10000)

describe('Main Tab Dates - Single Date', () => {
  it('should display single date field with formatted default value', async () => {
    render(<SingleDate />)
    const { expectedDate } = formatSingleDate()
    const dateField: HTMLInputElement = screen.getByLabelText(/select a date/i)

    expect(dateField).toBeVisible()
    // Mui is adding invisible unicode chars in the field, see issue:
    // https://github.com/mui/mui-x/issues/8150
    const fieldValue = dateField.value.replace(/[\u2066\u2067\u2068\u2069\u200e]/g, '')
    expect(fieldValue).toEqual(expectedDate)
  })

  it('should render cards with the expected features', async () => {
    render(<SingleDate />)
    await waitFor(
      async () => {
        expect(screen.queryByTestId('dayInHistoryCard_0')).toBeVisible()
      },
      { timeout: 6000 },
    )

    const cardHref = screen.getByTestId('dayInHistoryCard_0').getAttribute('href')
    expect(cardHref).toContain('https://en.wikipedia.org/wiki/')

    expect(screen.getByTestId('dayInHistoryCardTitle_0')).toBeVisible()
    expect(screen.getByTestId('dayInHistoryCardContent_0')).toBeVisible()
  })

  it('should not have any disabled dates in the picker', async () => {
    render(<SingleDate />)
    const calendarIcon = screen.getByLabelText(/Choose date/)

    fireEvent.click(calendarIcon)

    const popup = screen.getByRole('dialog')
    const disabledDates = within(popup).getAllByRole('gridcell')

    const someDayIsDisabled = disabledDates.some(date => {
      const classString = date.getAttribute('class')
      if (!classString) {
        throw new Error('No classString found for someDayIsDisabled')
      }
      return classString.includes('Mui-disabled')
    })

    expect(someDayIsDisabled).toEqual(false)
  })

  it('should display spinner when the date changes', async () => {
    render(<SingleDate />)
    expect(screen.queryByTestId('singleDateLoadingSpinner')).not.toBeInTheDocument()

    const calendarIcon = screen.getByLabelText(/Choose date/)
    fireEvent.click(calendarIcon)

    const popup = screen.getByRole('dialog')
    const { dayDigit } = formatSingleDate()
    const newDay = dayDigit === 1 ? 2 : dayDigit - 1
    const targetDayElement = within(popup).getByRole('gridcell', { name: String(newDay) })

    fireEvent.click(targetDayElement)
    expect(screen.getByTestId('singleDateLoadingSpinner')).toBeVisible()
  })
})

const formatSingleDate = (date = new Date()) => {
  const formatted = format(date, 'MMMM d')
  const day = format(date, 'd')
  return {
    expectedDate: formatted,
    dayDigit: Number(day),
  }
}
