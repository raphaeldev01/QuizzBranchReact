import { ArrowDown, Brain } from "lucide-react"
import styles from "./Header.module.css"
import Link from "../Links"
import React from "react"

export default function Header() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")))
  const [menuActive, setMenuActive] = React.useState(false)


  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <Brain className={styles.logoIcon} />
            <span className={styles.logoText}>QuizzBranch</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/myQuizzes" className={styles.navLink}>
            My Quizzes
          </Link>
          
          <Link to="/create" className={styles.navLink}>
            Create Quiz
          </Link>
        </nav>
        {user ? <>
            <div className={`${!menuActive && styles.disable} ${styles.user}`} onClick={() => setMenuActive(!menuActive)}>
              {user.userId} <ArrowDown size="20px" />
            </div>
            <div className={`${styles.menu} ${!menuActive && styles.disable }`}>
              <div onClick={() => {
                localStorage.removeItem("user")
                setUser(false)
                window.location.pathname = "/login"
              }}>Leave</div>
            </div>
          </> : <>
            <div className={styles.authButtons}>
              <Link to={"/login"} className={styles.buttonOutline}>Log in</Link>
              <Link to={"/singup"} className={styles.buttonPrimary}>Sign up</Link>
            </div>
          </>}
      </div>
    </header>
  )
}

