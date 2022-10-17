import './App.css';
import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';

function App() {

  const [values, setValues] = useState({
    route: "signin"
  })

  const onRouteChange = () => {
    setValues({...values, route: 'signin'})
  }

  return (
    <div className="App">
      <Register />
      {/* <SignIn /> */}
      {/* <Navigation /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
