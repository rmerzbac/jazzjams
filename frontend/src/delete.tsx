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

export default function DeletionForm() {
  const navigate = useNavigate();
  const id = useParams().id;

  const [data, setData] = useState<Data>();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch(`/jams/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        alert("Jam not found");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);

      console.log(data);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

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
      const response = await fetch(`/jams/${id}?reason=${encodeURIComponent(formData.reason)}`, {
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
      <div className="button"><Link to="/">BACK TO LISTINGS</Link></div>
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
