import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react'
import useEventListener from '../../hooks/useEventListener'
import { KeyboardEvents } from '../../utils/keyboardCommands'
import PlayerItem from './PlayerItem'
import styles from './style.module.css'
import NoPlayers from './NoPlayers'

export interface Player {
  name: string
  score: number
}

const Players = (): JSX.Element => {
  const [players, setPlayers] = useState<Player[]>([])
  const [inputValue, setInputValue] = useState('')
  const [highlightedPlayer, setHighlightedPlayer] = useState(0)
  const input = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (players.length - 1 <= highlightedPlayer && highlightedPlayer !== 0)
      setHighlightedPlayer(players.length - 1)
  }, [players])

  useEventListener('keyup', (e: any) => {
    switch (e.key) {
      case KeyboardEvents.ArrowUp:
        if (highlightedPlayer - 1 >= 0)
          setHighlightedPlayer(
            (currHighlighedPlayer) => currHighlighedPlayer - 1
          )
        break
      case KeyboardEvents.ArrowDown:
        if (highlightedPlayer + 1 < players.length)
          setHighlightedPlayer(
            (currHighlighedPlayer) => currHighlighedPlayer + 1
          )
        break
      case KeyboardEvents.ArrowRight:
        handleClick(false, highlightedPlayer)
        break
      case KeyboardEvents.ArrowLeft:
        handleClick(true, highlightedPlayer)
        break
      case KeyboardEvents.Backspace:
        if (players.length > 0)
          setPlayers((currPlayers) => {
            const newPlayers = [...currPlayers]
            newPlayers.splice(highlightedPlayer, 1)
            return newPlayers
          })
    }
  })

  const handleSubmit = (): void => {
    const value = inputValue.trim()
    if (
      value.trim().length > 0 &&
      players.find(
        (player) => player.name.toLowerCase() === value.toLowerCase()
      ) === undefined
    ) {
      setPlayers((currPlayers) => [
        ...currPlayers,
        {
          name: value,
          score: 0,
        },
      ])
      setInputValue('')
    }
  }

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation()

    if (
      e.key === KeyboardEvents.ArrowDown &&
      highlightedPlayer + 1 < players.length
    ) {
      input.current?.blur()
      setHighlightedPlayer((currHighlighedPlayer) => currHighlighedPlayer + 1)
    }
    if (e.key === KeyboardEvents.ArrowUp && highlightedPlayer - 1 >= 0) {
      input.current?.blur()
      setHighlightedPlayer((currHighlighedPlayer) => currHighlighedPlayer - 1)
    }
    if (e.key === 'Enter') handleSubmit()
  }

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = (
    toSubtract: boolean,
    index: number = highlightedPlayer
  ): void => {
    setPlayers((currPlayers) => {
      const newPlayers = [...currPlayers]
      const player = newPlayers[index]
      const newScore = player.score + (toSubtract ? -1 : 1)
      newPlayers[index] = {
        ...player,
        score: newScore < 0 ? 0 : newScore,
      }
      return newPlayers
    })
  }

  return (
    <div className={styles.players}>
      <div className={styles['add-player']}>
        <div className={styles['input-container']}>
          <input
            type="text"
            ref={input}
            value={inputValue}
            onKeyUp={handleKeyUp}
            onChange={handleOnChange}
            placeholder="Add player"
          />
        </div>
        <button className={styles.submit} onClick={handleSubmit}>
          +
        </button>
      </div>
      <div className={styles['player-list']}>
        {players.length > 0 ? (
          players.map((player, i) => (
            <PlayerItem
              isActive={highlightedPlayer === i}
              onClick={(toSubract) => {
                handleClick(toSubract, i)
              }}
              key={player.name}
              player={player}
            />
          ))
        ) : (
          <NoPlayers />
        )}
      </div>
    </div>
  )
}

export default Players
