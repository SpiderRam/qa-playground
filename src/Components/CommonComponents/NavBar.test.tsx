import React from 'react'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { pages } from '../../Data/NavRoutes'

const nasa = pages.find(page => page.title === 'Nasa')
const cards = pages.find(page => page.title === 'Cards')

// npm run test:unit -- -t 'Component - NavBar'

describe('Component - NavBar', () => {
  it('should render the desktop actions', async () => {
    if (!nasa || !cards) {
      throw new Error(`No value for Nasa or Cards routes in NavBar test:\nCARDS: ${cards}\nNASA: ${nasa}`)
    }
    render(
      <Router>
        <NavBar />
      </Router>,
    )

    const desktopIcon = screen.getByTestId('navDesktopIcon')
    expect(desktopIcon).toBeInTheDocument()
    const desktopLinkToHome = screen.getByTestId('desktopNavLinkToHome')
    expect(desktopLinkToHome).toBeInTheDocument()
    expect(desktopLinkToHome).toHaveAttribute('href', '/')
    const nasaLink = screen.getByTestId(`navBarLink_${nasa.title}`)
    expect(nasaLink).toBeInTheDocument()
    expect(nasaLink).toHaveAttribute('href', `/${nasa.route}`)
    const cardsLink = screen.getByTestId(`navBarLink_${cards.title}`)
    expect(cardsLink).toBeInTheDocument()
    expect(cardsLink).toHaveAttribute('href', `/${cards.route}`)
    const infoButton = screen.getByTestId('navBarInfoButton')
    expect(infoButton).toBeInTheDocument()
  })
})
