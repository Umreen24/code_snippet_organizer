import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddSnippet from './components/AddSnippet';
import ViewSnippets from './components/ViewSnippets';

function App() {
  return (
    <div>
      <AddSnippet/>
      <ViewSnippets/>
    </div>
  );
}

export default App;
