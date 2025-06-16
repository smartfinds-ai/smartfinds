import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Kérlek, írj be valamit a kereséshez!');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Hiba a keresés során');
      }

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>SmartFinds AI-powered Deal Finder</h1>

      <input
        type="text"
        placeholder="Mit keresel?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <button onClick={handleSearch} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
        Keresés
      </button>

      {loading && <p>Keresés folyamatban...</p>}
      {error && <p style={{ color: 'red' }}>Hiba: {error}</p>}

      <div style={{ marginTop: 20 }}>
        {results.map((item, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: 18, color: '#0070f3' }}>
              {item.title}
            </a>
            <p>Ár: {item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
