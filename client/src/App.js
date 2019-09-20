import React from 'react';
import './App.css';
import AddSnippet from './components/AddSnippet';
import ViewSnippets from './components/ViewSnippets';
import UpdateSnippet from './components/UpdateSnippet';
import Register from './components/Register';

function App() {
  return (
    <div>
      <AddSnippet/>
      <ViewSnippets/>
      <UpdateSnippet/>
      <Register/>
    </div>
  );
}

export default App;
