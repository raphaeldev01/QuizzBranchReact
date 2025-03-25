import { useState } from "react"
import { Plus, Minus, Save, AlertCircle, X } from "lucide-react"
// import Header from "../../componets/header/Header"
import styles from "./CreateQuiz.module.css"
import Header from "../../components/header/Header"
import config from "../../config.json"

export default function CreateQuizPage() {
  const [formError, setFormError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Quiz details state
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
    category: "General",
    difficulty: "Medium",
    timeEstimate: "10 min",
  })

  // Questions state
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" },
      ],
      correctAnswer: "a",
    },
  ])

  // Handle quiz details change
  const handleQuizDetailsChange = (e) => {
    const { name, value } = e.target
    setQuizDetails({
      ...quizDetails,
      [name]: value,
    })
  }

  // Handle question change
  const handleQuestionChange = (questionId, e) => {
    const { name, value } = e.target
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, [name]: value } : q)))
  }

  // Handle option change
  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) => (opt.id === optionId ? { ...opt, text: value } : opt)),
            }
          : q,
      ),
    )
  }

  // Handle correct answer change
  const handleCorrectAnswerChange = (questionId, value) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, correctAnswer: value } : q)))
  }

  // Add new question
  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1

    setQuestions([
      ...questions,
      {
        id: newId,
        question: "",
        options: [
          { id: "a", text: "" },
          { id: "b", text: "" },
          { id: "c", text: "" },
          { id: "d", text: "" },
        ],
        correctAnswer: "a",
      },
    ])
  }

  // Remove question
  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== questionId))
    } else {
      setFormError("You must have at least one question")
      setTimeout(() => setFormError(""), 3000)
    }
  }

  // Validate form
  const validateForm = () => {
    // Check quiz details
    if (!quizDetails.title.trim()) {
      setFormError("Quiz title is required")
      return false
    }

    if (!quizDetails.description.trim()) {
      setFormError("Quiz description is required")
      return false
    }

    // Check questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]

      if (!q.question.trim()) {
        setFormError(`Question ${i + 1} text is required`)
        return false
      }

      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].text.trim()) {
          setFormError(`Option ${q.options[j].id} in Question ${i + 1} is required`)
          return false
        }
      }
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const {token, userId} = JSON.parse(localStorage.getItem("user"))

    // In a real app, you would send this data to your backend
    const response = await (await fetch(config.URL+ "/quizz/create", {
      headers: {
        "content-type":"application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify({
        ...quizDetails, questions, owner: userId
      })
    })).json()

    console.log(response);
    

    // Show success message
    setSuccessMessage("Quiz created successfully!")

    // Clear form error if any
    setFormError("")

    // Redirect to home after a delay
      window.location.pathname = "/myQuizzes"
  }

  // Clear error message
  const clearError = () => {
    setFormError("")
  }

  // Clear success message
  const clearSuccess = () => {
    setSuccessMessage("")
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Create a New Quiz</h1>
          <p className={styles.pageDescription}>Fill in the details below to create your own quiz</p>
        </div>

        {formError && (
          <div className={styles.errorMessage}>
            <AlertCircle className={styles.errorIcon} />
            <span>{formError}</span>
            <button onClick={clearError} className={styles.closeButton}>
              <X className={styles.closeIcon} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className={styles.successMessage}>
            <span>{successMessage}</span>
            <button onClick={clearSuccess} className={styles.closeButton}>
              <X className={styles.closeIcon} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Quiz Details</h2>

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Quiz Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={quizDetails.title}
                onChange={handleQuizDetailsChange}
                placeholder="Enter a title for your quiz"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={quizDetails.description}
                onChange={handleQuizDetailsChange}
                placeholder="Describe what your quiz is about"
                className={styles.textarea}
                rows="3"
              ></textarea>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={quizDetails.category}
                  onChange={handleQuizDetailsChange}
                  className={styles.select}
                >
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

              <div className={styles.formGroup}>
                <label htmlFor="difficulty" className={styles.label}>
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={quizDetails.difficulty}
                  onChange={handleQuizDetailsChange}
                  className={styles.select}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="timeEstimate" className={styles.label}>
                  Time Estimate
                </label>
                <select
                  id="timeEstimate"
                  name="timeEstimate"
                  value={quizDetails.timeEstimate}
                  onChange={handleQuizDetailsChange}
                  className={styles.select}
                >
                  <option value="5 min">5 min</option>
                  <option value="10 min">10 min</option>
                  <option value="15 min">15 min</option>
                  <option value="20 min">20 min</option>
                  <option value="30 min">30 min</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Questions</h2>
              <button type="button" onClick={addQuestion} className={styles.addButton}>
                <Plus className={styles.buttonIcon} />
                Add Question
              </button>
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <h3 className={styles.questionTitle}>Question {index + 1}</h3>
                  <button type="button" onClick={() => removeQuestion(question.id)} className={styles.removeButton}>
                    <Minus className={styles.buttonIcon} />
                    Remove
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`question-${question.id}`} className={styles.label}>
                    Question Text
                  </label>
                  <input
                    type="text"
                    id={`question-${question.id}`}
                    name="question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(question.id, e)}
                    placeholder="Enter your question"
                    className={styles.input}
                  />
                </div>

                <div className={styles.optionsContainer}>
                  <div className={styles.optionsHeader}>
                    <h4 className={styles.optionsTitle}>Options</h4>
                    <div className={styles.correctAnswerSelect}>
                      <label htmlFor={`correct-${question.id}`} className={styles.correctAnswerLabel}>
                        Correct Answer:
                      </label>
                      <select
                        id={`correct-${question.id}`}
                        value={question.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(question.id, e.target.value)}
                        className={styles.correctAnswerDropdown}
                      >
                        {question.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            Option {option.id.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.optionsGrid}>
                    {question.options.map((option) => (
                      <div key={option.id} className={styles.optionItem}>
                        <label htmlFor={`option-${question.id}-${option.id}`} className={styles.optionLabel}>
                          Option {option.id.toUpperCase()}
                        </label>
                        <input
                          type="text"
                          id={`option-${question.id}-${option.id}`}
                          value={option.text}
                          onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                          placeholder={`Enter option ${option.id.toUpperCase()}`}
                          className={`${styles.input} ${question.correctAnswer === option.id ? styles.correctOption : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              <Save className={styles.buttonIcon} />
              Save Quiz
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

