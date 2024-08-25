"use client";
import React from "react";
import axios from 'axios';

function Home() {
  const [jsonData, setJsonData] = React.useState('');
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonData);

      const result = await axios.post('/api/bfhl', parsedJson, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setResponse(result.data);

    } catch (err) {
      setError(err.message);
    }
  };

  const formatResponse = () => {
    if (!response) return '';

    switch (selectedOption) {
      case 'numbers':
        return `Numbers: ${response.numbers.join(', ')}`;
      case 'alphabets':
        return `Alphabets: ${response.alphabets.join(', ')}`;
      case 'highest_lowercase_alphabet':
        return `Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet.join(', ')}`;
      default:
        return ''; 
    }
  };

  const formattedResponse = formatResponse();

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
      
      <div>
        <label htmlFor="options">Filter Results: </label>
        <select id="options" onChange={handleSelectChange} value={selectedOption}>
          <option value="">Select an option</option>
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
        </select>
      </div>
      
      {formattedResponse && <p>{formattedResponse}</p>}
    </div>
  );
}

export default Home;
