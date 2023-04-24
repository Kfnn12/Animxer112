import React from 'react'
import { Comments, HomePage } from './Pages'
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import { Users } from './Pages';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <HomePage />
            }
          ></Route>
          <Route
            exact
            path="/comment"
            element={
              <Comments
              />
            }
          />
          <Route
            exact
            path="/user"
            element={
              <Users
              />
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App