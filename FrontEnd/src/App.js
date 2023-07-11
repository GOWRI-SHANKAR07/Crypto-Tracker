import { Routes, Route } from "react-router-dom"
import  './App.css';
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./Components/Header";
import Alert from "./Components/Alert";

function App() {
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/coins/:id" element={ <CoinPage/> } />
      </Routes>
      <Alert />
    </div>
  )
}


export default App;
