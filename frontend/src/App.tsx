import React, { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import './App.css';
import CreationForm from './create';
import Listing from './listing';
import Edit from './edit';
import Delete from './delete';


export default function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <h2>NYC JAZZ JAMS</h2>
        </div>

        <Routes>
          <Route path="/" element={<Listing/>}>
          </Route>
          <Route path="/listing" element={<Listing/>}>
          </Route>
          <Route path="/create" element={<CreationForm/>}>
          </Route>
          <Route path="/edit/:id" element={<Edit />}>
          </Route>
          <Route path="/delete/:id" element={<Delete />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}


/* import React from 'react';
import './App.css';

function CreationForm() {
  return (
    <form method="post" action="/jams/">
      <h4>Create session</h4>
      <label htmlFor="name">Session name:</label>
      <input type="text" id="name" name="name" /><br />

      <label htmlFor="sun">Sun</label>
      <input type="checkbox" id="sun" name="sun" />
      <label htmlFor="mon">Mon</label>
      <input type="checkbox" id="mon" name="mon" />
      <label htmlFor="tue">Tue</label>
      <input type="checkbox" id="tue" name="tue" />
      <label htmlFor="wed">Wed</label>
      <input type="checkbox" id="wed" name="wed" />
      <label htmlFor="thu">Thu</label>
      <input type="checkbox" id="thu" name="thu" />
      <label htmlFor="fri">Fri</label>
      <input type="checkbox" id="fri" name="fri" />
      <label htmlFor="sat">Sat</label>
      <input type="checkbox" id="sat" name="sat" />
      <label htmlFor="custom">Custom</label>
      <input type="text" id="custom" name="custom" /><br/>

      <label htmlFor="startTime">Start time:</label>
      <input type="time" id="startTime" name="startTime" />
      <label htmlFor="endTime">End time:</label>
      <input type="time" id="endTime" name="endTime" />

      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" /><br/>

      <label htmlFor="info">Information:</label>
      <input type="text" id="info" name="info" /><br/>

      <label htmlFor="website">Website:</label>
      <input type="text" id="website" name="website" /><br/>

      <input type="submit" />
    </form>
  )
}

export default function App() {
  return (
    <div className="App">
      <h2>NYC Jazz Jams</h2>
      <CreationForm />
    </div>
  );
}*/
