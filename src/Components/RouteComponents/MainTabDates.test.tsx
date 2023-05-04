import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import MainTabDates from './MainTabDates'

// npm run test:unit -- -t 'Main Tab - Dates'

describe('Main Tab - Dates', () => {
  it('should display single date view when tab is first selected', async () => {
    render(<MainTabDates />)

    const title = screen.getByText('On this day in history....')
    expect(title).toBeVisible()

    const singleButton = screen.getByText(/single/i)
    expect(singleButton).toHaveClass('Mui-selected')

    const singleField = screen.getByLabelText('Select a date')
    expect(singleField).toBeVisible()
  })

  it('should display ranged date view when toggled', async () => {
    render(<MainTabDates />)

    const rangeButton = screen.getByRole('button', { name: /range/i })
    fireEvent.click(rangeButton)

    expect(rangeButton).toHaveClass('Mui-selected')
    const title = screen.getByText('Dates within dates')
    expect(title).toBeVisible()

    const startField = screen.getByLabelText('Start date')
    expect(startField).toBeVisible()
    const endField = screen.getByLabelText('End date')
    expect(endField).toBeVisible()
    const rangeField = screen.getByLabelText('Date within range')
    expect(rangeField).toBeVisible()
    const clearAllButton = screen.getByRole('button', { name: /clear all/i })
    expect(clearAllButton).toBeVisible()
    const behaviors = screen.getByTestId('mainTextFieldTabBehaviorsList')
    expect(behaviors).toBeVisible()
  })
})
