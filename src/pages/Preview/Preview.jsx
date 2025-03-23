"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, Clock, BarChart, Users, Star, BookOpen, CheckCircle } from "lucide-react"
import styles from "./Preview.module.css"
import { Link } from "react-router-dom"

import config from "../../config.json"

export default function QuizDetailsPage() {

  const quizId = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]

  const [quiz, setQuiz] = useState(false)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = React.useState()

  const GetData = async () => {
    const { token } = JSON.parse(localStorage.getItem("user"))

    setLoading(true);
    const response = await (await fetch(config.URL + "/quizz/get/" + quizId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).json()

    const quizData = response.infos

    setQuiz(quizData)
    setLoading(false)

    const datePublish = new Date(quizData.date.seconds * 1000)

    console.log(quizData.date);
    console.log(datePublish);
    
    setDate(`${datePublish.getUTCMonth() + 1}/${datePublish.getUTCDate()}/${datePublish.getFullYear()}`)
  }

  useEffect(() => {
    GetData()

  }, [])

  if (loading || !quiz) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.backLink} >
            <ArrowLeft className={styles.backIcon} />
            Back
          </Link>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>{quiz.category}</div>
          <h1 className={styles.title}>{quiz.title}</h1>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <Clock className={styles.statIcon} />
              <span>{quiz.timeEstimate}</span>
            </div>
            <div className={styles.stat}>
              <BookOpen className={styles.statIcon} />
              <span>{quiz.questions.length} Questions</span>
            </div>
            <div className={styles.stat}>
              <BarChart className={styles.statIcon} />
              <span>{quiz.difficulty}</span>
            </div>
          </div>
        </header>

        <div className={styles.twoColumns}>
          <main className={styles.mainContent}>
            <section className={styles.description}>
              <p>{quiz.description}</p>
            </section>

            {/* <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Topics</h2>
              <ul className={styles.topics}>
                {quiz.topics.map((topic, index) => (
                  <li key={index} className={styles.topic}>
                    <CheckCircle className={styles.checkIcon} />
                    {topic}
                  </li>
                ))}
              </ul>
            </section> */}

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Sample Questions</h2>
              <div className={styles.questions}>
                {quiz.questions.slice(0, 2).map((question, index) => (
                  <div key={index} className={styles.question}>
                    <span className={styles.questionNumber}>{index + 1}</span>
                    <p>{question.question}</p>
                  </div>
                ))}
              </div>
              <p className={styles.moreQuestions}>+ {quiz.questions.length - 2} more questions</p>
            </section>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.image} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {/* {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < Math.round(quiz.ratings.average) ? styles.starFilled : styles.star}
                        fill={i < Math.round(quiz.ratings.average) ? "currentColor" : "none"}
                      />
                    ))} */}
                  </div>
                  <div className={styles.ratingText}>
                    {/* {quiz.ratings.average} ({quiz.ratings.count}) */}
                  </div>
                </div>

                <div className={styles.completions}>
                  <Users className={styles.usersIcon} />
                  {/* <span>{quiz.completions.toLocaleString()} people completed this quiz</span> */}
                </div>

                <div className={styles.creator}>
                  Created by <span className={styles.creatorName}>{quiz.owner}</span>
                </div>

                <div className={styles.updated}>Last updated: {date}</div>

                <Link to={`/startquiz/${quizId}`} className={styles.startButton}>
                  Start Quiz
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

