import React, { useState, useEffect, FormEvent, ChangeEventHandler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { Data } from "./interfaces";
import { useDataFetch } from './fetch';

export default function Listing() {
  const [data, setData] = useState<Data[]>([]);

  const handleFetch = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_DOMAIN + 'jams/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const parseTime = (timeString: string) => {
    const [hour, minute, second] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));
    date.setSeconds(parseInt(second, 10));
    return date;
  }

  const transformDate = (data: Data) => {
    let days = "";
    if (data.sun) days += "Sun";
    if (data.mon) days += "Mon";
    if (data.tue) days += "Tue";
    if (data.wed) days += "Wed";
    if (data.thu) days += "Thu";
    if (data.fri) days += "Fri";
    if (data.sat) days += "Sat";
    if (data.custom && days !== "") days += ", ";
    if (data.custom) days += data.custom;

    return days;
  };

  return (
    <div>
      <div className="button">
        <Link to="/create">
          <span className="button-text">ADD NEW SESSION</span>
          <span className="button-add">+</span>
        </Link>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <h4 className="session-name">{item.name} <Link to={`/edit/${item.id}`}><i className='fa fa-edit'></i></Link></h4>
            <p>{transformDate(item) == '' ? '' : 'Days: ' + transformDate(item)}</p>
            <p>Time: {parseTime(item.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + (item.end_time ? " - " + parseTime(item.end_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '')}</p>
            <p>{item.location ? 'Location: ' + item.location : ''}</p>
            <p>{item.information ? 'Information: ' + item.information : ''}</p>
            <p>{item.website ? 'Website: ' : ''}<a href={item.website} target="_blank">{item.website ? item.website : ''}</a></p>
            <iframe
              style={{border:0}}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDFVjn6rhF5ELFHPGbxn_PYvxCDZmulV7Q&q=${item.name} ${item.location}`}>
            </iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}
