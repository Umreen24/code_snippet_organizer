import React from 'react';
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
