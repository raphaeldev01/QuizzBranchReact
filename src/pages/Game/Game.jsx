"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle, XCircle, ArrowLeft, Clock, BarChart } from "lucide-react"
import styles from "./Game.module.css"
import { Link } from "react-router-dom"
import config from "../../config.json"

export default function QuizPage() {

  const quizId = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]

  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [startTime, setStartTime] = React.useState(0)

  const getDatas = async () => {
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
  }
  // Mock quiz data - in a real app, this would be fetched from an API
  useEffect(() => {
    setStartTime(Date.now());
    // Simulate API fetch
    // setTimeout(() => {
    //   // const quizData = {
    //   //   id: quizId,
    //   //   title:
    //   //     quizId === "geography"
    //   //       ? "World Geography"
    //   //       : quizId === "history"
    //   //         ? "Ancient History"
    //   //         : quizId === "science"
    //   //           ? "Basic Science"
    //   //           : "Quiz",
    //   //   description: "Test your knowledge with this quiz.",
    //   //   category:
    //   //     quizId === "geography"
    //   //       ? "Geography"
    //   //       : quizId === "history"
    //   //         ? "History"
    //   //         : quizId === "science"
    //   //           ? "Science"
    //   //           : "General",
    //   //   difficulty: quizId === "history" ? "Hard" : "Medium",
    //   //   questions: [
    //   //     {
    //   //       id: 1,
    //   //       question: "What is the capital of France?",
    //   //       options: [
    //   //         { id: "a", text: "London" },
    //   //         { id: "b", text: "Paris" },
    //   //         { id: "c", text: "Berlin" },
    //   //         { id: "d", text: "Madrid" },
    //   //       ],
    //   //       correctAnswer: "b",
    //   //     },
    //   //     {
    //   //       id: 2,
    //   //       question: "Which planet is known as the Red Planet?",
    //   //       options: [
    //   //         { id: "a", text: "Venus" },
    //   //         { id: "b", text: "Jupiter" },
    //   //         { id: "c", text: "Mars" },
    //   //         { id: "d", text: "Saturn" },
    //   //       ],
    //   //       correctAnswer: "c",
    //   //     },
    //   //     {
    //   //       id: 3,
    //   //       question: "What is the largest ocean on Earth?",
    //   //       options: [
    //   //         { id: "a", text: "Atlantic Ocean" },
    //   //         { id: "b", text: "Indian Ocean" },
    //   //         { id: "c", text: "Arctic Ocean" },
    //   //         { id: "d", text: "Pacific Ocean" },
    //   //       ],
    //   //       correctAnswer: "d",
    //   //     },
    //   //   ],
    //   // }

    //   // setQuiz(quizData)
    //   // setLoading(false)
    // }, 1000)

    getDatas()
  }, [quizId])

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true)

      // Check if answer is correct
      if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsSubmitted(false)
    } else {
      // Quizz Completed
    //   {
    //     id: "geography",
    //     title: "World Geography",
    //     category: "Geography",
    //     difficulty: "Medium",
    //     dateTaken: "2024-03-10",
    //     score: 8,
    //     totalQuestions: 10,
    //     timeSpent: "7 min",
    //     image: "/placeholder.svg?height=200&width=400",
    // },
      const endTime = Date.now()
      const timeSpent = (Math.floor((endTime - startTime) / 1000) / 60).toFixed(2)
      const date = new Date();
      const dateTaken = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`
    
      const obj = {
        quizId,
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        totalQuestions: quiz.questions.length,
        score,
        image: quiz.image,
        timeSpent: `${timeSpent} min`,
        dateTaken
      }

      const { token } = JSON.parse(localStorage.getItem("user"))

      const response =  (await fetch(config.URL+"/user/addhistory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      }))

      console.log(  response);
      

      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading quiz...</p>
      </div>
    )
  }

  return (
    <div className={styles.quizPageContainer}>
      <div className={styles.container}>
        <Link to={"/"} className={styles.backButton} >
          <ArrowLeft className={styles.backButtonIcon} />
          Back to Quizzes
        </Link>

        <div className={styles.quizHeader}>
          <div className={styles.quizInfo}>
            <h1 className={styles.quizTitle}>{quiz.title}</h1>
            <p className={styles.quizDescription}>{quiz.description}</p>
            <div className={styles.quizBadges}>
              <span className={styles.quizBadge}>
                <BarChart className={styles.quizBadgeIcon} />
                {quiz.difficulty}
              </span>
              <span className={styles.quizBadge}>
                <Clock className={styles.quizBadgeIcon} />
                {quiz.questions.length * 2} min
              </span>
              <span className={styles.categoryBadge}>{quiz.category}</span>
            </div>
          </div>
          <div className={styles.quizProgress}>
            {!quizCompleted && (
              <div className={styles.questionCounter}>
                <div className={styles.questionCounterLabel}>Question</div>
                <div className={styles.questionCounterNumbers}>
                  {currentQuestion + 1} <span className={styles.questionCounterTotal}>/ {quiz.questions.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {!quizCompleted ? (
          <div className={styles.quizCard}>
            <div className={styles.questionHeader}>
              <h2 className={styles.questionTitle}>{quiz.questions[currentQuestion].question}</h2>
            </div>
            <div className={styles.questionOptions}>
              {quiz.questions[currentQuestion].options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = isSubmitted && option.id === quiz.questions[currentQuestion].correctAnswer
                const isIncorrect =
                  isSubmitted && isSelected && option.id !== quiz.questions[currentQuestion].correctAnswer

                return (
                  <div
                    key={option.id}
                    className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ""} ${isCorrect ? styles.optionCorrect : ""} ${isIncorrect ? styles.optionIncorrect : ""}`}
                    onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
                  >
                    <input
                      type="radio"
                      id={option.id}
                      name="answer"
                      value={option.id}
                      checked={selectedAnswer === option.id}
                      onChange={() => !isSubmitted && setSelectedAnswer(option.id)}
                      disabled={isSubmitted}
                      className={styles.optionInput}
                    />
                    <label htmlFor={option.id} className={styles.optionLabel}>
                      {option.text}
                    </label>
                    {isCorrect && <CheckCircle className={styles.optionIcon} />}
                    {isIncorrect && <XCircle className={styles.optionIcon} />}
                  </div>
                )
              })}
            </div>
            <div className={styles.quizActions}>
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className={`${styles.actionButton} ${!selectedAnswer ? styles.actionButtonDisabled : ""}`}
                >
                  Submit Answer
                </button>
              ) : (
                <button onClick={handleNextQuestion} className={styles.actionButton}>
                  {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "See Results"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.resultsCard}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>Quiz Completed!</h2>
              <p className={styles.resultsSubtitle}>You've completed the {quiz.title} quiz</p>
            </div>
            <div className={styles.resultsContent}>
              <div className={styles.scoreDisplay}>
                <div className={styles.scoreNumber}>
                  {score} / {quiz.questions.length}
                </div>
                <p className={styles.scoreMessage}>
                  {score === quiz.questions.length
                    ? "Perfect score! Excellent job!"
                    : score >= quiz.questions.length / 2
                      ? "Good job! You passed the quiz."
                      : "Keep practicing to improve your score."}
                </p>
              </div>
            </div>
            <div className={styles.resultsActions}>
              <button onClick={resetQuiz} className={styles.actionButton}>
                Try Again
              </button>
              <Link to={"/"} className={styles.actionButtonOutline} >
                Back to Quizzes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

