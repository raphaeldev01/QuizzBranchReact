import React, { useState } from "react"
import { Brain, Eye, EyeOff, Mail, Lock, User, Github, ChromeIcon as Google } from "lucide-react"
import styles from "../login/page.module.css"
import { Link,  } from "react-router-dom"
import global from "../../../config.json"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      const response = await (await fetch(global.URL+"/auth/newuser", {
        method: "POST",
        body: JSON.stringify({
          userId: name,
          password: password,
          email,
        }),
        headers: {
          "content-type":"application/json"
        }
      })).json()

      console.log(response);
      

      if(response.error) {
        throw response.msg
      }else {
        console.log(response)
        window.localStorage.setItem("user", JSON.stringify({
          userId: name,
          token: response.token
        }))

        window.location.pathname =  "/"
      }

    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const checkUser =  () => {
    const infos = window.localStorage.getItem("user")

    if(infos) return window.location.pathname = "/"
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
              <h1 className={styles.formTitle}>Create an account</h1>
              <p className={styles.formSubtitle}>Join QuizMaster to start testing your knowledge</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Username
                </label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    
                    required
                  />
                </div>
              </div>

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

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                    minLength={6}
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
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            

            <div className={styles.signupPrompt}>
              Already have an account?{" "}
              <Link to="/login" className={styles.signupLink}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

