import { type FunctionComponent } from 'react'
import styles from './style.module.css'
import { type Player } from './Players'

interface IPlayerItem {
  player: Player
  isActive: boolean
  onClick: (toSubract: boolean) => any
}

const PlayerItem: FunctionComponent<IPlayerItem> = ({
  player: { name, score },
  isActive,
  onClick,
}) => (
  <div className={[styles.player, isActive ? styles.active : ''].join(' ')}>
    <div className={styles.score}>{score}</div>
    <div className={styles.name}>{name}</div>
    <div className={styles['score-control']}>
      <button
        onClick={() => {
          onClick(true)
        }}
        className={styles.subtract}
      >
        -
      </button>
      <button onClick={() => onClick(false)} className={styles.add}>
        +
      </button>
    </div>
  </div>
)

export default PlayerItem
