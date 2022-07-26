import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./routes/Main";
import VideoRoomComponent from "./components/VideoRoomComponent";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/videoroom" element={<VideoRoomComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
