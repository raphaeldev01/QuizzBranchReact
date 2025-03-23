"use client"

import { useState, useEffect } from "react"
import { Clock, BarChart, Edit, Trash, Plus, Search, Filter, Calendar, Trophy } from "lucide-react"

import styles from "./MyQuizzesPage.module.css"
import Header from "../../components/header/Header"
import Link from "../../components/Links"

import config from "../../config.json"

export default function MyQuizzesPage() {
    const [activeTab, setActiveTab] = useState("created")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [loading, setLoading] = useState(true)
    const [createdQuizzes, setCreatedQuizzes] = useState([])
    const [takenQuizzes, setTakenQuizzes] = useState([])

    // Mock data - in a real app, this would be fetched from an API
    const GetDatas = async () => {
        const { token } = JSON.parse(localStorage.getItem("user"))

        const response = await (await fetch(config.URL + "/quizz/getQuizzesByOwner",
            {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )).json()

        setCreatedQuizzes(response.quizzes)
        setLoading(false)
        
    }

    useEffect(() => {
        // Simulate API fetch
        GetDatas()

        setTimeout(() => {
            const mockCreatedQuizzes = [
                {
                    id: "custom-geography",
                    title: "World Geography Challenge",
                    description: "Test your knowledge of countries, capitals, and landmarks around the world.",
                    category: "Geography",
                    difficulty: "Medium",
                    questions: 12,
                    timeEstimate: "10 min",
                    dateCreated: "2023-11-15",
                    image: "/placeholder.svg?height=200&width=400",
                    published: true,
                },
                {
                    id: "custom-science",
                    title: "Science Fundamentals",
                    description: "Cover the basics of physics, chemistry, and biology.",
                    category: "Science",
                    difficulty: "Easy",
                    questions: 8,
                    timeEstimate: "6 min",
                    dateCreated: "2023-12-03",
                    image: "/placeholder.svg?height=200&width=400",
                    published: true,
                },
                {
                    id: "custom-movies",
                    title: "Film Directors Quiz",
                    description: "Test your knowledge of famous film directors and their works.",
                    category: "Entertainment",
                    difficulty: "Hard",
                    questions: 15,
                    timeEstimate: "12 min",
                    dateCreated: "2024-01-20",
                    image: "/placeholder.svg?height=200&width=400",
                    published: false,
                },
            ]

            const mockTakenQuizzes = [
                {
                    id: "geography",
                    title: "World Geography",
                    category: "Geography",
                    difficulty: "Medium",
                    dateTaken: "2024-03-10",
                    score: 8,
                    totalQuestions: 10,
                    timeSpent: "7 min",
                    image: "/placeholder.svg?height=200&width=400",
                },
                {
                    id: "history",
                    title: "Ancient History",
                    category: "History",
                    difficulty: "Hard",
                    dateTaken: "2024-02-28",
                    score: 12,
                    totalQuestions: 15,
                    timeSpent: "14 min",
                    image: "/placeholder.svg?height=200&width=400",
                },
                {
                    id: "science",
                    title: "Basic Science",
                    category: "Science",
                    difficulty: "Easy",
                    dateTaken: "2024-03-05",
                    score: 8,
                    totalQuestions: 8,
                    timeSpent: "5 min",
                    image: "/placeholder.svg?height=200&width=400",
                },
                {
                    id: "movies",
                    title: "Movie Trivia",
                    category: "Entertainment",
                    difficulty: "Easy",
                    dateTaken: "2024-03-15",
                    score: 7,
                    totalQuestions: 10,
                    timeSpent: "8 min",
                    image: "/placeholder.svg?height=200&width=400",
                },
            ]

            // setCreatedQuizzes(mockCreatedQuizzes)
            setTakenQuizzes(mockTakenQuizzes)
            // setLoading(false)
        }, 800)
    }, [])

    // Filter quizzes based on search query and category
    const filteredCreatedQuizzes = createdQuizzes.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === "all" || quiz.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const filteredTakenQuizzes = takenQuizzes.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === "all" || quiz.category === filterCategory
        return matchesSearch && matchesCategory
    })

    // Get unique categories from all quizzes
    const allQuizzes = [...createdQuizzes, ...takenQuizzes]
    const categories = ["all", ...new Set(allQuizzes.map((quiz) => quiz.category))]

    // Handle delete quiz (in a real app, this would call an API)
    const handleDeleteQuiz = async (quizId, e) => {
        e.preventDefault()
        e.stopPropagation()

        const { token } = JSON.parse(localStorage.getItem("user"))

        console.log(quizId);
        

        if (window.confirm("Are you sure you want to delete this quiz?")) {
            await fetch(config.URL+"/quizz/removequizzbyid", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type":"application/json"
                },
                body: JSON.stringify({quizzId: quizId})
            })

            GetDatas();
        }
    }

    // Handle edit quiz
    const handleEditQuiz = (quizId, e) => {
        e.preventDefault()
        e.stopPropagation()

        // In a real app, this would navigate to an edit page with the quiz ID
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p className={styles.loadingText}>Loading your quizzes...</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>My Quizzes</h1>
                    <p className={styles.pageDescription}>Manage your created quizzes and view your quiz history</p>
                </div>

                <div className={styles.tabsContainer}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === "created" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("created")}
                        >
                            Created Quizzes
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "taken" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("taken")}
                        >
                            Quiz History
                        </button>
                    </div>
                </div>

                <div className={styles.filtersContainer}>
                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} />
                        <input
                            type="search"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.filterContainer}>
                        <Filter className={styles.filterIcon} />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className={styles.filterSelect}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === "all" ? "All Categories" : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {activeTab === "created" && (
                    <div className={styles.quizzesSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Created Quizzes</h2>
                            <Link to="/create" className={styles.createButton}>
                                <Plus className={styles.createButtonIcon} />
                                Create New Quiz
                            </Link>
                        </div>

                        {filteredCreatedQuizzes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p className={styles.emptyStateText}>
                                    {searchQuery || filterCategory !== "all"
                                        ? "No quizzes match your search criteria."
                                        : "You haven't created any quizzes yet."}
                                </p>
                                {!searchQuery && filterCategory === "all" && (
                                    <Link to="/create-quiz" className={styles.emptyStateButton}>
                                        Create Your First Quiz
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.quizGrid}>
                                {filteredCreatedQuizzes.map((quiz) => (
                                    <Link to={`/quiz/${quiz.id}/details`} key={quiz.id} className={styles.quizCard}>
                                        <div className={styles.quizCardImageContainer}>
                                            <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.quizCardImage} />
                                            <span className={styles.categoryBadge}>{quiz.category}</span>
                                            {!quiz.published && <span className={styles.draftBadge}>Draft</span>}
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
                                        <div className={styles.quizCardActions}>
                                            <button
                                                className={styles.quizCardAction}
                                                onClick={(e) => handleEditQuiz(quiz.id, e)}
                                                title="Edit Quiz"
                                            >
                                                <Edit className={styles.quizCardActionIcon} />
                                            </button>
                                            <button
                                                className={styles.quizCardAction}
                                                onClick={(e) => handleDeleteQuiz(quiz.quizId, e)}
                                                title="Delete Quiz"
                                            >
                                                <Trash className={styles.quizCardActionIcon} />
                                            </button>
                                        </div>
                                        <div className={styles.quizCardDate}>
                                            <Calendar className={styles.quizCardDateIcon} />
                                            Created: {quiz.dateCreated}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "taken" && (
                    <div className={styles.quizzesSection}>
                        <h2 className={styles.sectionTitle}>Quiz History</h2>

                        {filteredTakenQuizzes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p className={styles.emptyStateText}>
                                    {searchQuery || filterCategory !== "all"
                                        ? "No quizzes match your search criteria."
                                        : "You haven't taken any quizzes yet."}
                                </p>
                                {!searchQuery && filterCategory === "all" && (
                                    <Link to="/" className={styles.emptyStateButton}>
                                        Discover Quizzes
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.quizGrid}>
                                {filteredTakenQuizzes.map((quiz) => (
                                    <Link to={`/quiz/${quiz.id}/details`} key={quiz.id} className={styles.quizCard}>
                                        <div className={styles.quizCardImageContainer}>
                                            <img src={quiz.image || "/placeholder.svg"} alt={quiz.title} className={styles.quizCardImage} />
                                            <span className={styles.categoryBadge}>{quiz.category}</span>
                                            <div className={styles.scoreDisplay}>
                                                <Trophy className={styles.scoreIcon} />
                                                <span className={styles.scoreText}>
                                                    {quiz.score}/{quiz.totalQuestions}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.quizCardContent}>
                                            <h3 className={styles.quizCardTitle}>{quiz.title}</h3>
                                            <div className={styles.quizCardScore}>
                                                <div className={styles.scoreBar}>
                                                    <div
                                                        className={styles.scoreBarFill}
                                                        style={{
                                                            width: `${(quiz.score / quiz.totalQuestions) * 100}%`,
                                                            backgroundColor:
                                                                quiz.score === quiz.totalQuestions
                                                                    ? "#10b981" // Perfect score
                                                                    : quiz.score >= quiz.totalQuestions * 0.7
                                                                        ? "#3b82f6" // Good score
                                                                        : quiz.score >= quiz.totalQuestions * 0.4
                                                                            ? "#f59e0b" // Average score
                                                                            : "#ef4444", // Poor score
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className={styles.scorePercentage}>
                                                    {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.quizCardFooter}>
                                            <div className={styles.quizCardMeta}>
                                                <Clock className={styles.quizCardMetaIcon} />
                                                {quiz.timeSpent}
                                            </div>
                                            <div className={styles.quizCardMeta}>
                                                <BarChart className={styles.quizCardMetaIcon} />
                                                {quiz.difficulty}
                                            </div>
                                        </div>
                                        <div className={styles.quizCardDate}>
                                            <Calendar className={styles.quizCardDateIcon} />
                                            Taken: {quiz.dateTaken}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

