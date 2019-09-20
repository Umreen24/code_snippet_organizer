import React from 'react';
import './App.css';
import AddSnippet from './components/AddSnippet';
import ViewSnippets from './components/ViewSnippets';
import UpdateSnippet from './components/UpdateSnippet';

function App() {
  return (
    <div>
      <AddSnippet/>
      <ViewSnippets/>
      <UpdateSnippet/>
    </div>
  );
}

export default App;
