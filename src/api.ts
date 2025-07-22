import type { Question } from './questions'

export async function fetchApiQuestions(): Promise<Question[]> {
  const res = await fetch(
    'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
  )
  const data = await res.json()

  return data.results.map((item: any) => ({
    question: decodeHtml(item.question),
    options: shuffleArray([
      ...item.incorrect_answers,
      item.correct_answer,
    ]),
    answer: item.correct_answer,
  }))
}

function shuffleArray(arr: string[]) {
  return arr.sort(() => Math.random() - 0.5)
}

function decodeHtml(html: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
