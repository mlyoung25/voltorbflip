import React from "react"
import styles from "./styles/pages/index.module.scss"
import GameContainer from "./components/gameContainer"
import About from "./components/about"

export default function App() {
  return (
    <div className={styles.container}>
      <GameContainer />
      <About />
    </div>
  )
}
