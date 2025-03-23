
import { useState } from "react"
// import Link from "next/link"
import { Brain, Mail, ArrowLeft } from "lucide-react"
import styles from "../login/page.module.css"
import { Link } from "react-router-dom"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState("")


  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!email) {
  //     setError("Please enter your email address")
  //     return
  //   }

  //   setError("")
  //   setIsLoading(true)

  //   // Simulate API call
  //   try {
  //     // In a real app, this would be an actual API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000))

  //     setIsSubmitted(true)
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>  
        <div className={styles.loginContainer}>
          <div className={styles.logoContainer}> 
            <Link to="/" className={styles.logoLink}>
              <Brain className={styles.logoIcon} />
              <span className={styles.logoText}>QuizMaster</span>
            </Link>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>Reset your password</h1>
              <p className={styles.formSubtitle}>
                {isSubmitted
                  ? "Check your email for a reset link"
                  : "Enter your email and we'll send you a link to reset your password"}
              </p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {isSubmitted ? (
              <div className={styles.successMessage}>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className={styles.successSubtext}>
                  If you don't see it in your inbox, please check your spam folder.
                </p>

                <Link to="/login" className={styles.backToLoginLink}>
                  <ArrowLeft className={styles.backIcon} />
                  Back to login
                </Link>
              </div>
            ) : (
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                </button>

                <div className={styles.formFooter}>
                  <Link to="/login" className={styles.backToLoginLink}>
                    <ArrowLeft className={styles.backIcon} />
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

