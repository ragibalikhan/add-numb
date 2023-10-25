'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function AddNumbers() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === 'num1') {
        setNum1(e.target.value);
      } else if (e.target.name === 'num2') {
        setNum2(e.target.value);
      }
    };
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://127.0.0.1:5000/add', { num1, num2 });
        setResult(response.data.result);
        setError(undefined);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred.');
        }
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Two Numbers</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="num1"
            placeholder="Number 1"
            value={num1}
            onChange={handleInputChange}
            className="border rounded p-2 m-2 text-black" // Add text-black class
          />
          <input
            type="number"
            name="num2"
            placeholder="Number 2"
            value={num2}
            onChange={handleInputChange}
            className="border rounded p-2 m-2 text-black" // Add text-black class
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
        </form>
        {result && <p className="text-green-600">Result: {result}</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
      </div>
    );
  }
  
  export default AddNumbers;