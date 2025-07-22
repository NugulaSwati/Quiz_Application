import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPastResults } from './redux/quizSlice'
import type { RootState, AppDispatch } from './redux/store'
import { useNavigate } from 'react-router-dom'
import styles from './quiz.module.css'

const History: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const pastResults = useSelector((state: RootState) => state.quiz.pastResults)

  useEffect(() => {
    dispatch(loadPastResults())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz History</h2>

      {pastResults.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        pastResults
          .slice()
          .reverse()
          .map((result, index) => (
            <div key={index} className={styles.resultCard}>
              <p><strong>Date:</strong> {result.date}</p>
              <p><strong>Score:</strong> {result.score} / {result.totalQuestions}</p>
              <details>
                <summary>View Answers</summary>
                <ul>
                  {result.selectedAnswers.map((ans, i) => (
                    <li key={i}>
                      <span>Q{i + 1}:</span> {ans.question}<br />
                      Your Answer: <span style={{ color: ans.selectedOption === ans.correctAnswer ? 'green' : 'red' }}>
                        {ans.selectedOption || 'No Answer'}
                      </span><br />
                      Correct Answer: {ans.correctAnswer}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))
      )}

      <div className={styles.backButtonContainer}>
        <button className={styles.btn} onClick={() => navigate('/')}>
          ← Back to Quiz
        </button>
      </div>
    </div>
  )
}

export default History
