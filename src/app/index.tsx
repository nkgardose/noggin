import Players from './players'
import styles from './style.module.css'

const App = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <Players />
    </div>
  )
}

export default App
