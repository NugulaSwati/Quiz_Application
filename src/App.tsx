import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import History from "./History";

export default function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
