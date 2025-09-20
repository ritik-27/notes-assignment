import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import { Home } from './components/Home';
import About from './components/About/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </>
        </Router>
      </NoteState>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;