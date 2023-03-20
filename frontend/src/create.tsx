import React, { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { Data } from './interfaces';

export default function CreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    custom: '',
    start_time: '',
    end_time: undefined,
    location: '',
    information: '',
    website: ''
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://18.222.15.43:80/jams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data);

        let errorMessages = '';

        if (Array.isArray(data.detail)) {
          errorMessages = data.detail.map((error: any) => `${error.loc[1]}: ${error.msg}`).join('<br>');
        } else {
          errorMessages = data.detail;
        }

        const errorElem = document.getElementById("error");
        if (errorElem) {
          errorElem.innerHTML = errorMessages;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }



      const data = await response.json();
      console.log(data);

      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="button"><Link to="/">BACK TO LISTINGS</Link></div>
      <form onSubmit={handleSubmit}>
        <h4>Create session</h4>
        <label htmlFor="name">Session name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />

        <label htmlFor="sun">Sun</label>
        <input type="checkbox" id="sun" name="sun" checked={formData.sun} onChange={handleChange} />
        <label htmlFor="mon">Mon</label>
        <input type="checkbox" id="mon" name="mon" checked={formData.mon} onChange={handleChange} />
        <label htmlFor="tue">Tue</label>
        <input type="checkbox" id="tue" name="tue" checked={formData.tue} onChange={handleChange} />
        <label htmlFor="wed">Wed</label>
        <input type="checkbox" id="wed" name="wed" checked={formData.wed} onChange={handleChange} />
        <label htmlFor="thu">Thu</label>
        <input type="checkbox" id="thu" name="thu" checked={formData.thu} onChange={handleChange} />
        <label htmlFor="fri">Fri</label>
        <input type="checkbox" id="fri" name="fri" checked={formData.fri} onChange={handleChange} />
        <label htmlFor="sat">Sat</label>
        <input type="checkbox" id="sat" name="sat" checked={formData.sat} onChange={handleChange} />
        <label htmlFor="custom">Custom</label>
        <input type="text" id="custom" name="custom" value={formData.custom} onChange={handleChange} /><br/>

        <label htmlFor="start_time">Start time:</label>
        <input type="time" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required />
        <label htmlFor="end_time">End time:</label>
        <input type="time" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} /><br />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required /><br/>

        <label htmlFor="information">Information:</label>
        <input type="text" id="information" name="information" value={formData.information} onChange={handleChange} /><br/>

        <label htmlFor="website">Website:</label>
        <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} /><br/>

        <input type="submit" />
        <p id="error"></p>
      </form>
    </div>
  )
}
