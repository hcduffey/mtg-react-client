import './App.css';
import 'bulma/css/bulma.min.css';
import Nav from './components/Nav';
import Main from './pages/Main';
import {useState} from 'react';

function App() {
  const [loginSuccess, updateLoginSuccess] = useState(false);
  return (
    <div className="App">
      <Nav loginSuccess={loginSuccess} updateLoginSuccess={updateLoginSuccess} />
      <Main loginSuccess={loginSuccess} updateLoginSuccess={updateLoginSuccess} />
    </div>
  );
}

export default App;
