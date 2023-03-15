import React, { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import {Data, NewData} from './interfaces';

export default function EditForm() {

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
    info: '',
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

  const transformData = (data: Data) => {
    let days = "";
    if (data.sun) days += "Sun";
    if (data.mon) days += "Mon";
    if (data.tue) days += "Tue";
    if (data.wed) days += "Wed";
    if (data.thu) days += "Thu";
    if (data.fri) days += "Fri";
    if (data.sat) days += "Sat";
    if (data.custom) days += ", " + data.custom;

    const newData: NewData = {
      name: data.name,
      days: days,
      start_time: data.start_time,
      end_time: data.end_time || null,
      location: data.location,
      info: data.info,
      website: data.website,
    };

    console.log(newData.end_time);

    return newData;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/jams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformData(formData))
      });

      console.log(JSON.stringify(transformData(formData)));

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

      navigate('/edit');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="button"><Link to="/">BACK TO LISTINGS</Link></div>
      <form onSubmit={handleSubmit}>
        <h4>Edit session <Link to={`/delete/${useParams().id}`}><i className='fa fa-trash-o'></i></Link></h4>
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

        <label htmlFor="info">Information:</label>
        <input type="text" id="info" name="info" /><br/>

        <label htmlFor="website">Website:</label>
        <input type="text" id="website" name="website" /><br/>

        <input type="submit" />
        <p id="error"></p>
      </form>
    </div>
  )
}
