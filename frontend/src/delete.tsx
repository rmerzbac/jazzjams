import React, { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import { Data } from './interfaces';
import { useDataFetch } from './fetch';

export default function DeletionForm() {
  const navigate = useNavigate();
  const id = useParams().id;
  const data = useDataFetch(id || '');

  const [formData, setFormData] = useState({
    reason: ''
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = target.value;
      const name = target.name;

      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_DOMAIN + `jams/${id}?reason=${encodeURIComponent(formData.reason)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(JSON.stringify(formData));

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
      <div className="button">
        <Link to="/">
          <span className="button-text">BACK TO LISTINGS</span>
          <span className="button-back-arrow">←</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <h4>Delete "{data ? data.name : ''}"</h4>
        <label htmlFor="reason">Reason for deletion:</label>
        <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} required /><br />

        <input type="submit" />
        <p id="error"></p>
      </form>
    </div>
  )
}
