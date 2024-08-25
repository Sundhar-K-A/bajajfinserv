"use client"
import React from "react";
import axios from 'axios';

function Home() {
  const [jsonData, setJsonData] = React.useState('');
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonData);
      const result = await axios.post('https://bajajfinserv-gamma.vercel.app/api/bfhl', jsonData);
      setResponse(result.data);

      const alphabets = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i)); // a-z
      const numbers = Array.from({length: 10}, (_, i) => i.toString());
      const highestLowercase = alphabets.sort((a, b) => b.localeCompare(a))[0];
      setOptions([...alphabets, ...numbers, highestLowercase]);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>JSON Input Form</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <textarea 
          value={jsonData} 
          onChange={handleInputChange}
          placeholder="Enter valid JSON"
          rows="5" 
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {options.length > 0 && (
        <select multiple>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Home;