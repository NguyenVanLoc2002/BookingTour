import { Routes, Route } from "react-router-dom";
import MainLayout from "./page/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </>
  );
}

export default App;
