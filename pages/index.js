import { useState } from 'react';
import SearchForm from '../components/SearchForm';

export default function Home() {
  const [results, setResults] = useState([]);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SmartFinds</h1>
      <p className="mb-6 text-gray-600">Find the best deals using AI</p>
      <SearchForm onResults={setResults} />
      <div className="mt-6 space-y-4">
        {results.map((item, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-700">{item.title}</a>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
