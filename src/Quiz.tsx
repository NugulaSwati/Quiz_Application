// Quiz.tsx
import React, { useEffect, useState } from 'react'
import styles from './quiz.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import type { AppDispatch, RootState } from './redux/store'

import {
  fetchQuestionsFromApi,
  setStaticQuestions,
  selectAnswer,
  nextQuestion,
  prevQuestion,
  clearAnswer,
  submitQuiz,
  restartQuiz,
  setIndex,
} from './redux/quizSlice'

const Quiz: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [quizStarted, setQuizStarted] = useState(false)
  const [source, setSource] = useState<'static' | 'api' | null>(null)

  const {
    questions,
    currentIndex,
    selectedAnswers,
    score,
    done,
    loading,
    error
  } = useSelector((state: RootState) => state.quiz)

  useEffect(() => {
    if (!source) return

    if (source === 'static') {
      dispatch(setStaticQuestions())
    } else if (source === 'api') {
      dispatch(fetchQuestionsFromApi())
    }
  }, [source, dispatch])

  if (!quizStarted) {
    return (
      <div className={styles.container}>
        <h2 className={styles.leftTitle}>Engineering Trivia Quiz</h2>
        <h2 className={styles.title}>Choose Quiz Type</h2>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => {
            setQuizStarted(true)
            setSource('static')
          }}>
            Static Quiz
          </button>
          <button className={styles.btn} onClick={() => {
            setQuizStarted(true)
            setSource('api')
          }}>
            API Quiz
          </button>
          <button className={styles.btn} onClick={() => navigate('/history')}>
            View History
          </button> 
        </div>
      </div>
    )
  }

  if (loading) return <p>Loading questions...</p>
  if (error) return <p>Error: {error}</p>

  if (questions.length === 0) {
    return <p>No questions loaded.</p>
  }

  const current = questions[currentIndex]

  if (done) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Quiz Finished!</h2>
        <p className={styles.score}>Your Score: {score} / {questions.length}</p>
        <ul className={styles.summaryList}>
          {questions.map((q, i) => (
            <li key={i} className={styles.summaryItem}>
              <b>Q{i + 1}:</b> {q.question}<br />
              Your Answer: <span className={selectedAnswers[i] === q.answer ? styles.correctText : styles.incorrectText}>
                {selectedAnswers[i] || 'No Answer'}
              </span><br />
              Correct Answer: {q.answer}
            </li>
          ))}
        </ul>
        <div className={styles.restartBtns}>
          <button className={styles.btn} onClick={() => {
            dispatch(restartQuiz())
            setQuizStarted(false)
            setSource(null)
          }}>
            Restart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        {questions.map((_, i) => {
          let className = styles.progressSegment
          if (i === currentIndex) className += ` ${styles.current}`
          else if (selectedAnswers[i] !== null) className += ` ${styles.answered}`
          else className += ` ${styles.skipped}`
          return (
            <div
              key={i}
              className={className}
              onClick={() => dispatch(setIndex(i))}
              title={`Question ${i + 1}`}
            />
          )
        })}
      </div>

      <h3 className={styles.question}>Q{currentIndex + 1}: {current.question}</h3>
      <div className={styles.options}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => dispatch(selectAnswer(opt))}
            className={`${styles.optionBtn} ${selectedAnswers[currentIndex] === opt ? styles.correct : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={styles.buttons}>
        <button disabled={currentIndex === 0} onClick={() => dispatch(prevQuestion())}>Back</button>
        <button onClick={() => dispatch(clearAnswer())}>Clear</button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={() => dispatch(nextQuestion())}>Next</button>
        ) : (
          <button onClick={() => dispatch(submitQuiz())}>Submit</button>
        )}
      </div>
    </div>
  )
}

export default Quiz
