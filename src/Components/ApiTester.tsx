"use client"
import { useState } from 'react';

type Response = {
    word_count: number;
    piter_lamjin_index: number;
    matches: Array<{
      highlight: string;
      percent: number;
      url: string;
    }>;
  };

type DetectionType = 'anti_plagiarism' | 'ai_detection';

const ApiTester = () => {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<Response | string>('');
  const [detectionType, setDetectionType] = useState<DetectionType>('anti_plagiarism');

  const handleDetection = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/${detectionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult('For Anti-Plagiarism Testing type minimum 15 words');
      }
    } catch (error) {
      setResult('Error occurred');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Detection and Anti-Plagiarism Testing</h1>
      <div className="mb-4">
        <label className="block text-gray-600">Text Input</label>
        <textarea
          className="w-full h-24 p-2 border rounded text-black"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Select Detection Type</label>
        <select
          className="w-full p-2 border rounded text-black"
          value={detectionType}
          onChange={(e) => setDetectionType(e.target.value as DetectionType)}
        >
          <option value="anti_plagiarism">Anti-Plagiarism Detection</option>
          <option value="ai_detection">AI Detection</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleDetection}
      >
        Detect
      </button>
      <div className="mt-4">
        {typeof result === 'string' ? (
            <p className="text-red-500">{result}</p>
        ) : (
            <>
            <p>Word count: {result.word_count}</p>
            <p>Piter Lamjin index: {result.piter_lamjin_index}</p>
            <div>
                <p>Matches:</p>
                <ul>
                {result.matches.map((match, index) => (
                    <li key={index}>
                    <p>Highlight: {match.highlight}</p>
                    <p>Percent: {match.percent}</p>
                    <p>URL: {match.url}</p>
                    </li>
                ))}
                </ul>
            </div>
            </>
        )}
        </div>


    </div>
  );
};

export default ApiTester;
