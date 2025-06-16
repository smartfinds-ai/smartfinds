import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SmartFinds</h1>
      <p className="mb-6 text-gray-600">Find the best deals using AI</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?"
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
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
