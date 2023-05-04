import React from 'react'
import { render, screen } from '@testing-library/react'
import BehaviorsList from './BehaviorsList'

// npm run test:unit -- -t 'Component - BehaviorsList'

describe('Component - BehaviorsList', () => {
  it('should render behaviors list', async () => {
    const items = ['item 1', 'item 2']
    render(<BehaviorsList items={items} idPrefix='unitTest' />)

    const header = screen.getByText('Behaviors')
    const item1 = screen.getByText(items[0])
    const item2 = screen.getByText(items[1])
    expect(header).toBeInTheDocument()
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })
})
