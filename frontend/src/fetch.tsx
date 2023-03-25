import { useState, useEffect } from "react";
import { Data } from './interfaces';
import { useNavigate } from "react-router-dom";

export const useDataFetch = (id: string) => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>();

  const handleFetch = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_DOMAIN + `jams/${id}`, {
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

  useEffect(() => {
    handleFetch();
  }, []);

  return data;
};
