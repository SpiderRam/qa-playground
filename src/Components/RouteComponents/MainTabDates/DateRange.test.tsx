import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import DateRange from './DateRange'
import { add, addDays, format, isFirstDayOfMonth, isLastDayOfMonth, subDays } from 'date-fns'

// npm run test:unit -- -t 'Main Tab Dates - Date Range'

describe('Main Tab Dates - Date Range', () => {
  it('should display correct start and end dates by default', async () => {
    render(<DateRange />)
    const { todayDate, oneWeekOut } = getStartAndEndDates()
    const startField = screen.getByLabelText(/start date/i)
    const endField = screen.getByLabelText(/end date/i)

    expect(startField).toHaveValue(formatDateTime(todayDate))
    expect(endField).toHaveValue(formatDateTime(oneWeekOut))
  })

  it('should clear all field values when clear all button is clicked', async () => {
    jest.setTimeout(10000)
    render(<DateRange />)
    const { todayDate, oneWeekOut } = getStartAndEndDates()
    const startField = screen.getByLabelText(/start date/i)
    const endField = screen.getByLabelText(/end date/i)
    const rangedField = screen.getByLabelText(/date within range/i)
    const clearAllButton = screen.getByRole('button', { name: /clear all/i })

    selectTodayInRangedField(todayDate)

    expect(startField).toHaveValue(formatDateTime(todayDate))
    expect(endField).toHaveValue(formatDateTime(oneWeekOut))

    fireEvent.click(clearAllButton)

    expect(startField).toHaveValue('')
    expect(endField).toHaveValue('')
    expect(rangedField).toHaveValue('')
  })

  it('should test field icon buttons', async () => {
    jest.setTimeout(10000)
    render(<DateRange />)
    const { todayDate } = getStartAndEndDates()

    expect(screen.getByTestId('startDateClearButton')).toBeEnabled()
    expect(screen.getByTestId('endDateClearButton')).toBeEnabled()
    expect(screen.getByTestId('rangedDateClearButton')).toBeDisabled()
    expect(screen.getByTestId('startDateCalendarButton')).toBeEnabled()
    expect(screen.getByTestId('endDateCalendarButton')).toBeEnabled()
    expect(screen.getByTestId('rangedDateCalendarButton')).toBeEnabled()

    selectTodayInRangedField(todayDate)

    await waitFor(
      async () => {
        expect(screen.queryByTestId('rangedDateClearButton')).toBeEnabled()
      },
      { timeout: 1000 },
    )

    const clearButtons = ['startDateClearButton', 'endDateClearButton', 'rangedDateClearButton']

    for (const id of clearButtons) {
      fireEvent.click(screen.getByTestId(id))
      expect(screen.queryByTestId(id)).toBeDisabled()
      if (id === 'startDateClearButton') {
        expect(screen.queryByTestId('rangedDateCalendarButton')).toBeDisabled()
      }
    }
  })

  it('should test error styling on ranged date field', async () => {
    // todo
  })

  /**
   * NOTE: this unit test is not handling changing the month view of
   * the date picker. If the default values create a range in which
   * the start or end date falls outside the current month, logic
   * will be skipped.  This test is poor, and should be augmented
   * or replaced by additional layers.
   */
  it('should disable all dates outside of the range', async () => {
    render(<DateRange />)
    const { todayDate, oneWeekOut } = getStartAndEndDates()

    const dayTooEarly = subDays(todayDate, 1)
    const dayTooLate = addDays(oneWeekOut, 1)
    const dayTooEarlyIsInThisMonth = !isLastDayOfMonth(dayTooEarly)
    const dayTooLateIsInThisMonth = !isFirstDayOfMonth(dayTooEarly)
    const dayTooEarlyDigit = format(dayTooEarly, 'd')
    const dayTooLateDigit = format(dayTooLate, 'd')

    const rangedCalendarIcon = screen.getByTestId('rangedDateCalendarButton')
    fireEvent.click(rangedCalendarIcon)

    if (dayTooEarlyIsInThisMonth) {
      // if the month is the same, verify that dayDisabledBefore is disabled
      const dayTooEarlyElement = screen.getByRole('gridcell', { name: dayTooEarlyDigit })
      expect(dayTooEarlyElement).toBeDisabled()
    }

    if (dayTooLateIsInThisMonth) {
      // if the month is the same, verify that dayDisabledAfter is disabled
      const dayTooLateElement = screen.getByRole('gridcell', { name: dayTooLateDigit })
      expect(dayTooLateElement).toBeDisabled()
    }

    if (dayTooEarlyIsInThisMonth && dayTooLateIsInThisMonth) {
      // if all dates fall within the month, check all valid dates
      for (let validDay = Number(dayTooEarlyDigit) + 1; validDay <= Number(dayTooLateDigit) - 1; validDay++) {
        const dayTooLateElement = screen.getByRole('gridcell', { name: String(validDay) })
        try {
          expect(dayTooLateElement).toBeEnabled()
        } catch (error) {
          throw new Error(`Expected <${validDay}> to be enabled.`)
        }
      }
    } else {
      // otherwise, confirm only that today is enabled
      const todayDigit = format(todayDate, 'd')
      const todayElement = screen.getByRole('gridcell', { name: todayDigit })
      expect(todayElement).toBeEnabled()
    }
  })
})

const formatDateTime = (date: Date) => {
  const formatted = format(date, 'MM/dd/yyyy hh:mm aa').toLowerCase()
  // Mui is adding these ugly chars in the field
  const addMuiNonsense = formatted.replaceAll(' ', '⁩ ⁦')
  return addMuiNonsense
}

const getStartAndEndDates = () => {
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)
  const oneWeekOut = add(todayDate, { weeks: 1 })
  oneWeekOut.setHours(23, 59, 59, 59)
  return { todayDate, oneWeekOut }
}

const selectTodayInRangedField = async (todayDate: Date) => {
  const todayDigit = format(todayDate, 'd')
  const rangedField = screen.getByLabelText(/date within range/i)
  const rangedCalendarIcon = screen.getByTestId('rangedDateCalendarButton')

  fireEvent.click(rangedCalendarIcon)

  const rangedDatePopup = await screen.findByTestId('rangedDatePopup')
  const todayElement = within(rangedDatePopup).getByRole('gridcell', { name: todayDigit })

  fireEvent.click(todayElement)

  await waitFor(
    async () => {
      expect(rangedDatePopup).not.toBeVisible()
    },
    { timeout: 1000 },
  )

  await waitFor(
    async () => {
      expect(rangedField).toHaveValue(formatDateTime(todayDate))
    },
    { timeout: 1000 },
  )
}
