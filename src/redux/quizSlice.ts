import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import { fetchApiQuestions } from '../api';
import { staticQuestions } from '../questions';
import type { Question } from '../questions';

export interface PastAnswer {
  question: string;
  selectedOption: string | null;
  correctAnswer: string;
}

export interface PastResult {
  quizType: string;
  score: number;
  totalQuestions: number;
  selectedAnswers: PastAnswer[];
  date: string;
}

export interface QuizState {
  questions: Question[];
  selectedAnswers: (string | null)[];
  currentIndex: number;
  score: number;
  done: boolean;
  loading: boolean;
  error: string | null;
  pastResults: PastResult[];
}

const initialState: QuizState = {
  questions: [],
  selectedAnswers: [],
  currentIndex: 0,
  score: 0,
  done: false,
  loading: false,
  error: null,
  pastResults: [],
};

export const fetchQuestionsFromApi = createAsyncThunk<Question[]>(
  'quiz/fetchApiQuestions',
  fetchApiQuestions
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStaticQuestions(state) {
      state.questions = staticQuestions;
      state.selectedAnswers = Array(staticQuestions.length).fill(null);
      state.currentIndex = 0;
      state.score = 0;
      state.done = false;
      state.loading = false;
      state.error = null;
    },
    selectAnswer(state, action: PayloadAction<string>) {
      state.selectedAnswers[state.currentIndex] = action.payload;
    },
    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
      }
    },
    prevQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
    clearAnswer(state) {
      state.selectedAnswers[state.currentIndex] = null;
    },
    submitQuiz(state) {
      let total = 0;
      const summary = state.questions.map((q, i) => {
        const correct = state.selectedAnswers[i] === q.answer;
        if (correct) total++;
        return {
          question: q.question,
          selectedOption: state.selectedAnswers[i],
          correctAnswer: q.answer,
        };
      });

      const result: PastResult = {
        quizType: 'Quiz',
        score: total,
        totalQuestions: state.questions.length,
        selectedAnswers: summary,
        date: new Date().toLocaleString(),
      };

      const existing: PastResult[] = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      const updated = [...existing, result];
      localStorage.setItem('quizHistory', JSON.stringify(updated));
      state.pastResults = updated;
      state.score = total;
      state.done = true;
    },
    restartQuiz(state) {
      state.questions = [];
      state.selectedAnswers = [];
      state.currentIndex = 0;
      state.score = 0;
      state.done = false;
      state.loading = false;
      state.error = null;
    },
    setIndex(state, action: PayloadAction<number>) {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentIndex = action.payload;
      }
    },
    loadPastResults(state) {
      const data: PastResult[] = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      state.pastResults = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsFromApi.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.selectedAnswers = Array(action.payload.length).fill(null);
        state.currentIndex = 0;
        state.loading = false;
        state.done = false;
      })
      .addCase(fetchQuestionsFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load questions';
      });
  },
});

export const {
  setStaticQuestions,
  selectAnswer,
  nextQuestion,
  prevQuestion,
  clearAnswer,
  submitQuiz,
  restartQuiz,
  setIndex,
  loadPastResults,
} = quizSlice.actions;

export default quizSlice.reducer;
