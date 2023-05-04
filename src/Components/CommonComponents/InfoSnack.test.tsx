import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import InfoSnack from './InfoSnack'

const buttonId = 'unitTestButton'
const message = 'Unit test info snack'

// npm run test:unit -- -t 'Component - InfoSnack'

describe('Component - InfoSnack', () => {
  it('should render InfoSnack button', async () => {
    render(<InfoSnack buttonId={buttonId} message={message} />)

    const button = screen.getByTestId(buttonId)
    expect(button).toBeInTheDocument()
  })

  it('should display and hide the snack bar', async () => {
    render(<InfoSnack buttonId={buttonId} message={message} />)

    const button = screen.getByTestId(buttonId)
    fireEvent.click(button)
    await screen.findByText(message)

    await waitFor(
      async () => {
        const snackMessage = screen.queryByText(message)
        expect(snackMessage).not.toBeInTheDocument()
      },
      { timeout: 4000 },
    )
  })
})
