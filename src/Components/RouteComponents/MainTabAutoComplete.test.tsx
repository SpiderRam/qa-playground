import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import MainTabAutoComplete from './MainTabAutoComplete'

jest.setTimeout(10000)

// npm run test:unit -- -t 'Main Tab - Autocomplete'

describe('Main Tab - Autocomplete', () => {
  it('should render autocomplete tab elements', async () => {
    render(<MainTabAutoComplete />)
    expect(screen.getByLabelText('Loading....')).toBeVisible()
    expect(screen.getByLabelText('Loading....')).toBeDisabled()
    expect(screen.getByText('Select up to five dog breeds')).toBeVisible()
    expect(screen.getByTestId('mainAutoCompleteTabBehaviorsList')).toBeVisible()
    expect(screen.getByTestId('mainAutoCompleteTabNoSelections')).toBeVisible()
    expect(screen.queryByTestId('mainAutoCompleteTabAccordions')).not.toBeInTheDocument()

    await waitFor(
      async () => {
        expect(screen.queryByLabelText('Loading....')).not.toBeInTheDocument()
      },
      { timeout: 4000 },
    )

    expect(screen.getByLabelText('Dog breeds')).toBeVisible()
    expect(screen.queryByLabelText('Dog breeds')).not.toBeDisabled()
  })

  it('should open autocomplete menu when field is clicked', async () => {
    await waitForFieldToRender()

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Dog breeds'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('should open autocomplete menu when field is focused', async () => {
    await waitForFieldToRender()

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    fireEvent.focus(screen.getByLabelText('Dog breeds'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })
})

const waitForFieldToRender = async () => {
  render(<MainTabAutoComplete />)
  await waitFor(
    async () => {
      expect(screen.getByLabelText('Dog breeds')).toBeVisible()
    },
    { timeout: 6000 },
  )
}
