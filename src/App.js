import React from 'react';
import './App.css';
import TodoManager from './components/ToDoManager'
import Filter from './components/Filter'
import Footer from './components/Footer'
import Header from './components/Header'
import uuid from 'uuid/v4'

function App() {
  return (
    <div style={ aeppWrapper }>
      <Header key={ uuid() }/>
      <TodoManager key={uuid()}></TodoManager>
      <footer className="footer">
        <Footer key={ uuid() }/>
        <Filter key={ uuid() }/>
      </footer>
    </div>
  );
}

const aeppWrapper = {
  "fontFamily": "Avenir, Helvetica, Arial, sans-serif",
  "WebkitFontSmoothing": "antialiased",
  "MozOsxFontSmoothing": "grayscale",
  "textAlign": "center",
  "color": "#2c3e50"
}

// const loadingBars = {
//   position: absolute;
//   top: 100px;
//   margin-left: auto;
//   margin-right: auto;
//   left: 0;
//   right: 0;
// }

export default App;
