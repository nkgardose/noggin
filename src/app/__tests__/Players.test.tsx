import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KeyboardEvents } from '../../utils/keyboardCommands'
import Players from '../players'

describe('App', () => {
  it('renders properly', () => {
    const { container } = render(<Players />)

    expect(container).toMatchSnapshot()
  })
  it('renders correct content', () => {
    render(<Players />)

    expect(screen.getByText('No players... yet.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Add player')).toBeInTheDocument()
  })
  it('adds a new player', () => {
    render(<Players />)

    const input = screen.getByPlaceholderText('Add player')

    act(() => {
      userEvent.type(input, 'Vincent')
    })

    fireEvent.click(screen.getByText('+'))

    expect(screen.getByText('Vincent')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
  it("increases/decreases player's score", () => {
    render(<Players />)

    const input = screen.getByPlaceholderText('Add player')

    act(() => {
      userEvent.type(input, 'Vincent')
    })

    fireEvent.click(screen.getByText('+'))

    const [subtract, add] = [screen.getByText('-'), screen.getAllByText('+')[1]]

    fireEvent.click(add)
    fireEvent.click(add)
    fireEvent.click(subtract)

    expect(screen.getByText('1')).toBeInTheDocument()
  })
  it('can delete a player', () => {
    const { container } = render(<Players />)

    const input = screen.getByPlaceholderText('Add player')
    const addPlayerButton = screen.getByText('+')

    act(() => {
      userEvent.type(input, 'Vincent')
    })

    fireEvent.click(addPlayerButton)

    act(() => {
      userEvent.type(input, 'Mica')
    })

    fireEvent.click(addPlayerButton)

    expect(screen.getByText('Mica')).toBeInTheDocument()
    expect(screen.getByText('Vincent')).toBeInTheDocument()

    act(() => {
      fireEvent.keyUp(container, { key: KeyboardEvents.ArrowDown })
    })
    act(() => {
      fireEvent.keyUp(container, { key: KeyboardEvents.ArrowDown })
    })
    act(() => {
      fireEvent.keyUp(container, { key: KeyboardEvents.Backspace })
    })

    expect(screen.queryByText('Mica')).not.toBeInTheDocument()
  })
  it('can be used with just keyboard', async () => {
    render(<Players />)

    const input = screen.getByPlaceholderText('Add player')

    act(() => {
      input.focus()
    })

    act(() => {
      userEvent.type(input, 'Vincent')
    })

    await act(async () => userEvent.keyboard(`{${KeyboardEvents.Enter}}`))

    act(() => {
      userEvent.type(input, 'Mica')
    })

    await act(async () => userEvent.keyboard(`{${KeyboardEvents.Enter}}`))

    expect(screen.getByText('Vincent')).toBeInTheDocument()
    expect(screen.getByText('Mica')).toBeInTheDocument()

    act(() => {
      input.blur()
    })

    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowDown}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowRight}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowRight}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowUp}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowRight}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowRight}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.ArrowLeft}}`))

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    await act(async () => userEvent.keyboard(`{${KeyboardEvents.Backspace}}`))
    await act(async () => userEvent.keyboard(`{${KeyboardEvents.Backspace}}`))

    expect(screen.queryByText('Mica')).not.toBeInTheDocument()
    expect(screen.queryByText('Vincent')).not.toBeInTheDocument()
  })
})
