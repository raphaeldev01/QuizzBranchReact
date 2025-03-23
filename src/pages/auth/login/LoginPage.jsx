import React, { useState } from "react"
// import Link from "next/link"
import { Link } from "react-router-dom"
import { Brain, Eye, EyeOff, Mail, Lock } from "lucide-react"
import styles from "./page.module.css"
import global from "../../../config.json"

export default function LoginPage() {
  const [user, setuser] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!user || !password) {
      setError("Please enter both user and password")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await (await fetch(global.URL + "/auth/loginuser", {
        method: "POST",
        body: JSON.stringify({
          userId: user,
          password: password
        }),
        headers: {
          "content-type": "application/json"
        }
      })).json()

      if (response.error) {
        throw response.msg
      } else {
        console.log(response)
        window.localStorage.setItem("user", JSON.stringify({
          userId: user,
          token: response.token
        }))

        window.location.pathname = "/"
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const checkUser = () => {
    const infos = window.localStorage.getItem("user")

    if (infos) return window.location.pathname = "/"
  }

  React.useEffect(() => {
    checkUser()
  }, [])

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
              <h1 className={styles.formTitle}>Log in to your account</h1>
              <p className={styles.formSubtitle}>Welcome back! Please enter your details.</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="user" className={styles.label}>
                  username
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="user"
                    type="text"
                    placeholder="Enter your username"
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordLabel}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <Link to="/forgetpass" className={styles.forgotPassword}>
                    Forgot password?
                  </Link>
                </div>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className={styles.passwordIcon} />
                    ) : (
                      <Eye className={styles.passwordIcon} />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>



            <div className={styles.signupPrompt}>
              Don't have an account?{" "}
              <Link to="/singup" className={styles.signupLink}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

