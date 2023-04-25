import styles from './style.module.css'
import { TbMoodSad } from 'react-icons/tb'

const NoPlayers = (): JSX.Element => {
  return (
    <div className={styles['no-players']}>
      <TbMoodSad size={40} />
      <p>No players... yet.</p>
    </div>
  )
}

export default NoPlayers
