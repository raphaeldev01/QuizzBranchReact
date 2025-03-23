// import Link from "next/link"
import { Brain, Search, Filter, TrendingUp, Clock, BarChart, ArrowDown, ArrowBigDown, ArrowDownCircle, ArrowDown01 } from "lucide-react"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"
import React from "react"
import config from "../../config.json"

export default function HomePage() {
  // Quiz data - in a real app, this would come from a database
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")))
  const [menuActive, setMenuActive] = React.useState(false)

  const [quizzes, setQuizzes]=React.useState([])

  const GetDatas = async () => {
    const {token} = JSON.parse(localStorage.getItem("user"))

    const response = await (await fetch(config.URL+"/quizz/getall", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type":"application/json"
      }
    })).json()

    setQuizzes(response.quizzes)
  }

  React.useEffect(() => {
    GetDatas()
  }, [])

  // const quizzes = [
  //   {
  //     id: "geography",
  //     title: "World Geography",
  //     description: "Test your knowledge of countries, capitals, and landmarks around the world.",
  //     category: "Geography",
  //     difficulty: "Medium",
  //     questions: 10,
  //     timeEstimate: "8 min",
  //     image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSh0_wEdvv_O7Yoam2M7-hLCuqnWbixMx-0JM024--3BQfblP_s2tuSOsmtFmZYtksW0lUG8j6ShPHMA7qnBDN_XB_hbLxZ-Dbz5l72RAE",
  //     popular: true,
  //   },
  //   {
  //     id: "history",
  //     title: "Ancient History",
  //     description: "Explore civilizations and important events from the ancient world.",
  //     category: "History",
  //     difficulty: "Hard",
  //     questions: 15,
  //     timeEstimate: "12 min",
  //     image: "https://lh5.googleusercontent.com/p/AF1QipMiq8zbQz74ahZttWk6Nf_ASq3ARdE8TPLeVDof=w243-h174-n-k-no-nu",
  //   },
  //   {
  //     id: "science",
  //     title: "Basic Science",
  //     description: "Cover the fundamentals of physics, chemistry, and biology.",
  //     category: "Science",
  //     difficulty: "Easy",
  //     questions: 8,
  //     timeEstimate: "6 min",
  //     image: "https://streetscience.com.au/wp-content/uploads/2022/05/microscope-lab-coats-history-of-microscopes.png",
  //     popular: true,
  //   },
  //   {
  //     id: "literature",
  //     title: "Classic Literature",
  //     description: "Test your knowledge of famous authors and their works.",
  //     category: "Literature",
  //     difficulty: "Medium",
  //     questions: 12,
  //     timeEstimate: "10 min",
  //     image: "https://www.euroschoolindia.com/wp-content/uploads/2023/11/role-of-literature-in-shaping-societal-values-jpg.webp",
  //   },
  //   {
  //     id: "movies",
  //     title: "Movie Trivia",
  //     description: "How well do you know your favorite films and actors?",
  //     category: "Entertainment",
  //     difficulty: "Easy",
  //     questions: 10,
  //     timeEstimate: "7 min",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-FHFrehUpXOThRdDwy5HmaBntW8pSKhp2Q&s",
  //     popular: true,
  //   },
  //   {
  //     id: "music",
  //     title: "Music Through the Ages",
  //     description: "From classical to contemporary, test your music knowledge.",
  //     category: "Entertainment",
  //     difficulty: "Medium",
  //     questions: 12,
  //     timeEstimate: "9 min",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCK_qRe7sAY5mC5YQIbo7Y-pfOPcWvW7ppwQ&s",
  //   },
  //   {
  //     id: "sports",
  //     title: "Sports Champions",
  //     description: "Test your knowledge of sports history and famous athletes.",
  //     category: "Sports",
  //     difficulty: "Medium",
  //     questions: 10,
  //     timeEstimate: "8 min",
  //     image: "https://img.freepik.com/fotos-gratis/ferramentas-esportivas_53876-138077.jpg",
  //   },
  //   {
  //     id: "tech",
  //     title: "Technology & Innovation",
  //     description: "How well do you know the history of technology and recent innovations?",
  //     category: "Technology",
  //     difficulty: "Hard",
  //     questions: 15,
  //     timeEstimate: "12 min",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4Q25MYvgKeSgtED-Cse4WKkqOoFSWaf02Q&s",
  //   },
  // ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Brain className={styles.logoIcon} />
            <span className={styles.logoText}>QuizzBranch</span>
          </div>
          <nav className={styles.nav}>
            <Link to="#" className={`${styles.navLink} ${styles.active}`}>
              Home
            </Link>
            <Link to="/myQuizzes" className={styles.navLink}>
              My Quizzes
            </Link>
            <Link to="#" className={styles.navLink}>
              Leaderboard
            </Link>
            <Link to="/create" className={styles.navLink}>
              Create Quiz
            </Link>
          </nav>
          {user ? <>
            <div className={styles.user} onClick={() => setMenuActive(!menuActive)}>
              {user.userId} <ArrowDown size="20px" />
            </div>
            <div className={`${styles.menu} ${!menuActive && styles.disable }`}>
              <div onClick={() => {window.location.pathname = "/config"}}>Configs</div>
              <div onClick={() => {window.location.pathname = "/profile"}}>Profile</div>
              <div onClick={() => {
                localStorage.removeItem("user")
                setUser(false)
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

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroHeader}>
              <div>
                <h1 className={styles.heroTitle}>Discover Quizzes</h1>
                <p className={styles.heroSubtitle}>Choose from our collection of quizzes and test your knowledge</p>
              </div>
              <div className={styles.searchFilters}>
                <div className={styles.searchContainer}>
                  <Search className={styles.searchIcon} />
                  <input type="search" placeholder="Search quizzes..." className={styles.searchInput} />
                </div>
                <div className={styles.filterContainer}>
                  <Filter className={styles.filterIcon} />
                  <select className={styles.filterSelect}>
                    <option value="all">All Categories</option>
                    <option value="geography">Geography</option>
                    <option value="history">History</option>
                    <option value="science">Science</option>
                    <option value="literature">Literature</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.categoryTags}>
              <button className={styles.categoryTag}>All</button>
              <button className={styles.categoryTag}>Popular</button>
              <button className={styles.categoryTag}>Geography</button>
              <button className={styles.categoryTag}>History</button>
              <button className={styles.categoryTag}>Science</button>
              <button className={styles.categoryTag}>Literature</button>
              <button className={styles.categoryTag}>Entertainment</button>
              <button className={styles.categoryTag}>Sports</button>
              <button className={styles.categoryTag}>Technology</button>
            </div>

            <h2 className={styles.sectionTitle}>
              <TrendingUp className={styles.sectionIcon} />
              Popular Quizzes
            </h2>
            <div className={styles.quizGrid}>
              {quizzes
                .filter((quiz) => quiz.popular)
                .map((quiz) => (
                  <Link to={`/quiz/${quiz.id}`} key={quiz.id} className={styles.quizCard}>
                    <div className={styles.quizCardImageContainer}>
                      <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.quizCardImage} />
                      <span className={styles.categoryBadge}>{quiz.category}</span>
                    </div>
                    <div className={styles.quizCardContent}>
                      <h3 className={styles.quizCardTitle}>{quiz.title}</h3>
                      <p className={styles.quizCardDescription}>{quiz.description}</p>
                    </div>
                    <div className={styles.quizCardFooter}>
                      <div className={styles.quizCardMeta}>
                        <Clock className={styles.quizCardMetaIcon} />
                        {quiz.timeEstimate}
                      </div>
                      <div className={styles.quizCardMeta}>
                        <BarChart className={styles.quizCardMetaIcon} />
                        {quiz.difficulty}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <h2 className={styles.sectionTitle}>All Quizzes</h2>
            <div className={styles.quizGrid}>
              {quizzes.map((quiz) => (
                <Link to={`/quiz/${quiz.quizId}`} key={quiz.id} className={styles.quizCard}>
                  <div className={styles.quizCardImageContainer}>
                    <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.quizCardImage} />
                    <span className={styles.categoryBadge}>{quiz.category}</span>
                  </div>
                  <div className={styles.quizCardContent}>
                    <h3 className={styles.quizCardTitle}>{quiz.title}</h3>
                    <p className={styles.quizCardDescription}>{quiz.description}</p>
                  </div>
                  <div className={styles.quizCardFooter}>
                    <div className={styles.quizCardMeta}>
                      <Clock className={styles.quizCardMetaIcon} />
                      {quiz.timeEstimate}
                    </div>
                    <div className={styles.quizCardMeta}>
                      <BarChart className={styles.quizCardMetaIcon} />
                      {quiz.difficulty}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Brain className={styles.footerLogoIcon} />
              <span className={styles.footerLogoText}>QuizMaster</span>
            </div>
            <div className={styles.footerLinks}>
              <Link to="#" className={styles.footerLink}>
                Terms
              </Link>
              <Link to="#" className={styles.footerLink}>
                Privacy
              </Link>
              <Link to="#" className={styles.footerLink}>
                Help
              </Link>
              <Link to="#" className={styles.footerLink}>
                Contact
              </Link>
            </div>
            <div className={styles.footerCopyright}>© 2025 QuizMaster. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

