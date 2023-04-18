import React from 'react'
import { render, screen } from '@testing-library/react'
import Main from '../../../Components/Routes/Main'

it('should render main title and tabs', async () => {
  render(<Main />)
  const header = screen.getByText(/Interactive Components/i)
  expect(header).toBeInTheDocument()
  const tabNames = ['Text Field & List', 'Date Picker', 'MultiSelect', 'Form', 'Data Grid', 'Dashboard', 'Swiper']
  tabNames.forEach(tabName => {
    const text = new RegExp(tabName, 'i')
    const tab = screen.getByText(text)
    expect(tab).toBeInTheDocument()
  })
})
