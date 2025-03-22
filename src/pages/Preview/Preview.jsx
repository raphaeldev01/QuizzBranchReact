"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, BarChart, Users, Star, BookOpen, CheckCircle } from "lucide-react"
import styles from "./Preview.module.css"
import { Link } from "react-router-dom"

export default function QuizDetailsPage() {
  
  const quizId = "geography"

  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock quiz data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const quizData = {
        id: quizId,
        title:
          quizId === "geography"
            ? "World Geography"
            : quizId === "history"
              ? "Ancient History"
              : quizId === "science"
                ? "Basic Science"
                : "Quiz",
        description:
          quizId === "geography"
            ? "Test your knowledge of countries, capitals, and landmarks around the world. This comprehensive quiz covers all continents and major geographical features."
            : quizId === "history"
              ? "Explore civilizations and important events from the ancient world. From Egypt to Rome, test your knowledge of ancient history."
              : quizId === "science"
                ? "Cover the fundamentals of physics, chemistry, and biology. Perfect for students and science enthusiasts alike."
                : "Test your knowledge with this quiz.",
        longDescription:
          quizId === "geography"
            ? "This geography quiz will take you on a journey around the world, testing your knowledge of countries, capitals, major landmarks, rivers, mountains, and more. Whether you're a geography enthusiast or just looking to brush up on your world knowledge, this quiz offers a comprehensive challenge covering all continents and major geographical features."
            : quizId === "history"
              ? "Step back in time with our Ancient History quiz. You'll explore the great civilizations of Egypt, Greece, Rome, China, and Mesopotamia. Test your knowledge of important historical figures, major events, architectural wonders, and cultural developments that shaped the ancient world."
              : quizId === "science"
                ? "This Basic Science quiz covers the fundamental concepts across physics, chemistry, and biology. From Newton's laws to the periodic table and cell biology, this quiz is perfect for students and science enthusiasts looking to test their understanding of core scientific principles."
                : "A comprehensive quiz to test your knowledge on various topics.",
        category:
          quizId === "geography"
            ? "Geography"
            : quizId === "history"
              ? "History"
              : quizId === "science"
                ? "Science"
                : "General",
        difficulty: quizId === "history" ? "Hard" : "Medium",
        questions: [
          {
            id: 1,
            question: "What is the capital of France?",
            options: [
              { id: "a", text: "London" },
              { id: "b", text: "Paris" },
              { id: "c", text: "Berlin" },
              { id: "d", text: "Madrid" },
            ],
            correctAnswer: "b",
          },
          {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: [
              { id: "a", text: "Venus" },
              { id: "b", text: "Jupiter" },
              { id: "c", text: "Mars" },
              { id: "d", text: "Saturn" },
            ],
            correctAnswer: "c",
          },
          {
            id: 3,
            question: "What is the largest ocean on Earth?",
            options: [
              { id: "a", text: "Atlantic Ocean" },
              { id: "b", text: "Indian Ocean" },
              { id: "c", text: "Arctic Ocean" },
              { id: "d", text: "Pacific Ocean" },
            ],
            correctAnswer: "d",
          },
        ],
        topics:
          quizId === "geography"
            ? ["Countries & Capitals", "Major Landmarks", "Rivers & Lakes", "Mountains & Deserts", "Oceans & Seas"]
            : quizId === "history"
              ? ["Ancient Egypt", "Greek Civilization", "Roman Empire", "Ancient China", "Mesopotamia"]
              : quizId === "science"
                ? [
                    "Basic Physics",
                    "Chemistry Fundamentals",
                    "Biology Concepts",
                    "Scientific Method",
                    "Famous Scientists",
                  ]
                : ["General Knowledge"],
        ratings: {
          average: 4.7,
          count: 128,
          distribution: [2, 5, 10, 33, 78],
        },
        completions: 1243,
        createdBy: "QuizMaster Team",
        lastUpdated: "2023-11-15",
        timeEstimate:
          quizId === "geography"
            ? "8 min"
            : quizId === "history"
              ? "12 min"
              : quizId === "science"
                ? "6 min"
                : "10 min",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSh0_wEdvv_O7Yoam2M7-hLCuqnWbixMx-0JM024--3BQfblP_s2tuSOsmtFmZYtksW0lUG8j6ShPHMA7qnBDN_XB_hbLxZ-Dbz5l72RAE",
      }

      setQuiz(quizData)
      setLoading(false)
    }, 800)
  }, [quizId])

  if (loading) {
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
              <p>{quiz.longDescription}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Topics</h2>
              <ul className={styles.topics}>
                {quiz.topics.map((topic, index) => (
                  <li key={index} className={styles.topic}>
                    <CheckCircle className={styles.checkIcon} />
                    {topic}
                  </li>
                ))}
              </ul>
            </section>

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
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < Math.round(quiz.ratings.average) ? styles.starFilled : styles.star}
                        fill={i < Math.round(quiz.ratings.average) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <div className={styles.ratingText}>
                    {quiz.ratings.average} ({quiz.ratings.count})
                  </div>
                </div>

                <div className={styles.completions}>
                  <Users className={styles.usersIcon} />
                  <span>{quiz.completions.toLocaleString()} people completed this quiz</span>
                </div>

                <div className={styles.creator}>
                  Created by <span className={styles.creatorName}>{quiz.createdBy}</span>
                </div>

                <div className={styles.updated}>Last updated: {quiz.lastUpdated}</div>

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

