import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Main from '../../../Components/Routes/Main'

const fieldSetup = () => {
  const utils = render(<Main />)
  const input: HTMLInputElement = screen.getByLabelText(/Enter list item/i)
  return {
    input,
    ...utils,
  }
}

const addFieldValue = (value: string, input: HTMLInputElement) => {
  fireEvent.change(input, { target: { value } })
  expect(input.value).toBe(value)
  return input
}

const getDeleteButton = async (textContent: string) => {
  const listItems = await getListItems()

  const deleteTarget = listItems.find(item => item.text === textContent)

  if (!deleteTarget) {
    throw new Error('No target found in getDeleteButton')
  }

  return deleteTarget.deleteButton
}

const getListItems = async () => {
  const elements = await screen.findAllByRole('mainTabListItem')
  const items = elements.map((item, index) => ({
    text: within(item).getByTestId(`mainTabListItem_${index}`).textContent,
    deleteButton: within(item).getByTestId(`mainTabListItemDeleteButton_${index}`),
  }))
  return items
}

it('should render the no items message', async () => {
  render(<Main />)
  const message = screen.getByText(/no items added yet/i)
  expect(message).toBeInTheDocument()
})

it('should render the behaviors list', async () => {
  render(<Main />)
  const title = screen.getByText(/behaviors/i)
  expect(title).toBeInTheDocument()
  const list = screen.getByRole('list', {
    name: /behaviors/i,
  })
  const { getAllByRole } = within(list)
  const items = getAllByRole('listitem')
  expect(items.length).toBe(6)
})

it('should render the list text field', async () => {
  render(<Main />)
  const input = screen.getByLabelText(/Enter list item/i)
  const addButton = screen.getByLabelText(/add item/i)
  const clearButton = screen.getByLabelText(/clear field/i)
  expect(input).toBeInTheDocument()
  expect(addButton).toBeInTheDocument()
  expect(addButton).toHaveAttribute('disabled')
  expect(clearButton).toBeInTheDocument()
  expect(clearButton).toHaveAttribute('disabled')
})

it('should verify clear button', async () => {
  const { input } = fieldSetup()
  addFieldValue('TODO: write e2e tests', input)

  const addButton = screen.getByLabelText(/add item/i)
  const clearButton = screen.getByLabelText(/clear field/i)

  fireEvent.click(clearButton)
  expect(input).toHaveFocus()
  expect(addButton).toHaveAttribute('disabled')
  expect(clearButton).toHaveAttribute('disabled')
})

it('should verify add button', async () => {
  const itemValue = 'TODO: write e2e tests'
  const { input } = fieldSetup()
  addFieldValue(itemValue, input)

  const addButton = screen.getByLabelText(/add item/i)
  const clearButton = screen.getByLabelText(/clear field/i)

  fireEvent.click(addButton)
  expect(input).toHaveFocus()
  expect(addButton).toHaveAttribute('disabled')
  expect(clearButton).toHaveAttribute('disabled')

  const firstListItem = screen.getByTestId('mainTabListItem_0')
  expect(firstListItem).toBeInTheDocument()
  expect(firstListItem).toHaveTextContent(itemValue)
})

it('should verify item deletion', async () => {
  const { input } = fieldSetup()
  const itemValues = ['Item 1', 'Item 2', 'Item 3']

  const addButton = screen.getByLabelText(/add item/i)

  itemValues.forEach(item => {
    addFieldValue(item, input)
    fireEvent.click(addButton)
  })

  let listItems = await getListItems()
  expect(listItems.length).toEqual(itemValues.length)

  if (!listItems) {
    throw new Error(`No listItems found`)
  }

  const itemTwoDeleteButton = await getDeleteButton(itemValues[1])
  fireEvent.click(itemTwoDeleteButton)

  listItems = await getListItems()
  expect(listItems.length).toEqual(itemValues.length - 1)

  const itemOneDeleteButton = await getDeleteButton(itemValues[0])
  fireEvent.click(itemOneDeleteButton)

  listItems = await getListItems()
  expect(listItems.length).toEqual(itemValues.length - 2)

  const itemThreeDeleteButton = await getDeleteButton(itemValues[2])
  fireEvent.click(itemThreeDeleteButton)

  const message = screen.getByText(/no items added yet/i)
  expect(message).toBeInTheDocument()
})
