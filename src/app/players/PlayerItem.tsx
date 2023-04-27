import { type FunctionComponent } from 'react'
import styles from './style.module.css'
import { type Player } from './Players'

interface IPlayerItem {
  player: Player
  isActive: boolean
  onClick: () => any
  onControlClick: (toSubract: boolean) => any
}

const PlayerItem: FunctionComponent<IPlayerItem> = ({
  player: { name, score },
  isActive,
  onClick,
  onControlClick,
}) => (
  <div
    tabIndex={0}
    className={[styles.player, isActive ? styles.active : ''].join(' ')}
    onClick={onClick}
    role="button"
    onKeyDown={onClick}
  >
    <div className={styles.score}>{score}</div>
    <div className={styles.name}>{name}</div>
    <div className={styles['score-control']}>
      <button onClick={() => onControlClick(true)} className={styles.subtract}>
        -
      </button>
      <button onClick={() => onControlClick(false)} className={styles.add}>
        +
      </button>
    </div>
  </div>
)

export default PlayerItem
