import React from "react";
import ReactDom from "react-dom/client";
import Header from "./components/Header"

const App = () => {
  return (
    <div className="app">
      <h1 className="text-yellow-400">okokokokoko</h1>
    </div>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />)