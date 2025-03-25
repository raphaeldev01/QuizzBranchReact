
import { useState } from "react"
// import Link from "next/link"
import { Brain, Mail, ArrowLeft } from "lucide-react"
import styles from "../login/page.module.css"
import { Link } from "react-router-dom"

import config from "../../../config.json"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "teste@gmail.com")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [code, setCode] = useState("")
  const [pass, setPass] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault( )

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setError("")
    setIsLoading(true)

    try {
        const response = await (await fetch(config.URL+"/auth/forgotReset", {
          method: "POST",
          body: JSON.stringify({
            email,
            code,
            password: pass
          }),
          headers: {
            "content-type":"application/json"
          }
        })).json()

        if(response.error) {
            throw response.msg
        }
        else {
            window.location.pathname =  "/login"
        }

      setIsSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>  
        <div className={styles.loginContainer}>
          <div className={styles.logoContainer}> 
            <Link to="/" className={styles.logoLink}>
              <Brain className={styles.logoIcon} />
              <span className={styles.logoText}>QuizzBranch</span>
            </Link>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>Reset your password</h1>
              <p className={styles.formSubtitle}>
                Reset your password by entering your email: <b> {email}</b>. You will receive a code to reset your password.
              </p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {isSubmitted ? (
              <div className={styles.successMessage}>
                
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Code
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="code"
                      type="number"
                      placeholder="Enter your recup code"
                      value={code}
                      onChange={(e) => e.target.value.length < 6 ? setCode(e.target.value) : null}
                      className={styles.input}
                      maxLength={5}
                      max={99999}
                      required
                    />
                  </div>
                  <label htmlFor="email" className={styles.label}>
                    New Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="pass"
                      type="password"
                      placeholder="Enter your new password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <button className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Reset password"}
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

