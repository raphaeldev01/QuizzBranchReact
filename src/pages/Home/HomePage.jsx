// import Link from "next/link"
import { Brain, Search, Filter, TrendingUp, Clock, BarChart, ArrowDown, ArrowBigDown, ArrowDownCircle, ArrowDown01 } from "lucide-react"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import config from "../../config.json"
import Header from "../../components/header/Header"

export default function HomePage() {


  // Quiz data - in a real app, this would come from a database
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")))
  const [menuActive, setMenuActive] = React.useState(false)

  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterCategory, setFilterCategory] = React.useState("all")
  const [loading, setLoading] = React.useState(true)
  const [takenQuizzes, setTakenQuizzes] = React.useState([])

  const [quizzes, setQuizzes] = React.useState([])
  const [quizzesPop, setQuizzesPop] = React.useState([])
  const [histoty, setHistoty] = React.useState([])

  const filteredCreatedQuizzes = quizzes.filter((quiz) => {
    if (!quiz.title) return;

    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || quiz.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  }).map((quiz) => {
    const itsMaked = histoty.filter(r => r.quizId === quiz.quizId)

    if(itsMaked.length > 0) {
      return {...quiz, did: true}
    } else {
      return {...quiz}
    }
  })

  const filteredPopQuizzes = quizzesPop.filter((quiz) => {
    if (!quiz.title) return;

    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || quiz.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  }).map((quiz) => {
    const itsMaked = histoty.filter(r => r.quizId === quiz.quizId)

    if(itsMaked.length > 0) {
      return {...quiz, did: true}
    } else {
      return {...quiz}
    }
  })

  const GetDatas = async () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      localStorage.removeItem("user")
      window.location.pathname = "/login"
    }

    const historyRes = await (await fetch(config.URL + "/user/gethistory", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json"
      }
    })).json()

    console.log(historyRes.infos);
    

    setHistoty(historyRes.infos)

    const response = await (await fetch(config.URL + "/quizz/getall", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json"
      }
    })).json()

    if (response.error) {
      localStorage.removeItem("user")
      window.location.pathname = "/login"
    }

    setQuizzes(response.quizzes)

    const newarr = response.quizzes.sort((a, b) => b.popularity - a.popularity)
    setQuizzesPop(newarr.slice(0, 4))
  }

  const separePopularity = () => {


  }

  React.useEffect(() => {
    GetDatas()
  }, [])



  return (
    <div className={styles.container}>
      
  <Header />
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
                  <input
                    type="search"
                    placeholder="Search quizzes..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className={styles.filterContainer}>
                  <Filter className={styles.filterIcon} />
                  <select className={styles.filterSelect} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="General">General</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Science">Science</option>
                    <option value="Literature">Literature</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.categoryTags}>
              <button onClick={(e) => setFilterCategory("all")} className={`${styles.categoryTag} ${filterCategory == "all" && styles.active}`}>All</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "General" && styles.active}`}>General</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Geography" && styles.active}`}>Geography</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "History" && styles.active}`}>History</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Science" && styles.active}`}>Science</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Literature" && styles.active}`}>Literature</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Entertainment" && styles.active}`}>Entertainment</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Sports" && styles.active}`}>Sports</button>
              <button onClick={(e) => setFilterCategory(e.target.innerText)} className={`${styles.categoryTag} ${filterCategory == "Technology" && styles.active}`}>Technology</button>
            </div>

            <h2 className={styles.sectionTitle}>
              <TrendingUp className={styles.sectionIcon} />
              Popular Quizzes
            </h2>
            <div className={styles.quizGrid}>
              {filteredPopQuizzes
                .map((quiz) => (
                  <Link to={`/quiz/${quiz.quizId}`} key={quiz.id} className={`${quiz.did && styles.did} ${styles.quizCard}`}>
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
              {filteredCreatedQuizzes.map((quiz) => (
                <Link to={`/quiz/${quiz.quizId}`} key={quiz.id} className={`${quiz.did && styles.did} ${styles.quizCard}`}>
                  <div className={styles.quizCardImageContainer}>
                    <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.quizCardImage} />
                    <span className={styles.categoryBadge}>{quiz.category}</span>
                  </div>
                  <div className={styles.quizCardContent}>
                    <h3 className={styles.quizCardTitle}>{quiz.title} </h3>
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

