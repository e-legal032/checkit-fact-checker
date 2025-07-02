import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
  if (!query.trim()) {
    alert("Por favor escribí una afirmación para buscar.");
    return;
  }

  const apiKey = import.meta.env.VITE_FACTCHECK_API_KEY;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    setResultados(data.claims || []);
  } catch (error) {
    console.error('Error al buscar:', error);
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>CheckIt 🔍</h1>
      <input
        type="text"
        placeholder="Escribí una afirmación..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button onClick={buscar} style={{ marginLeft: '1rem' }}>Buscar</button>

      <ul>
        {resultados.map((item, index) => (
          <li key={index} style={{ marginTop: '1rem' }}>
            <strong>{item.text}</strong><br />
            <em>{item.claimReview?.[0]?.text}</em><br />
            Fuente: {item.claimReview?.[0]?.publisher?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
