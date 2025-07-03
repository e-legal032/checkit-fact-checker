import { useState } from 'react';
import './App.css';
import Resultados from './components/Resultados';
import Buscador from './components/Buscador';


function App() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [recientes, setRecientes] = useState([]);


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
const verRecientes = async () => {
  const apiKey = import.meta.env.VITE_FACTCHECK_API_KEY;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=a&maxAgeDays=7&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    setRecientes(data.claims || []);
  } catch (error) {
    console.error('Error al buscar recientes:', error);
  }
};



  return (
  <div style={{ padding: '2rem' }}>
    <h1>CheckIt 🔍</h1>
    <Buscador query={query} setQuery={setQuery} onBuscar={buscar} />

    {/* Mostrar resultados */}
    {resultados.length > 0 ? (
      <ul>
        {resultados.length === 0 && query && (
          <div style={{ marginTop: '1rem' }}>
            <p>❗ No se encontraron resultados para “{query}”.</p>
            <p>Probá con frases como:</p>
            <ul>
              <li>“vacuna covid causa infertilidad”</li>
              <li>“Putin está muerto”</li>
              <li>“el cambio climático es un invento”</li>
            </ul>
            <button onClick={verRecientes} style={{ marginTop: '1rem' }}>
              Ver verificaciones recientes
            </button>
          </div>
        )}

      <Resultados resultados={resultados} titulo="Resultados de búsqueda" />
      {recientes.length > 0 && (
        <Resultados resultados={recientes} titulo="Verificaciones recientes" />
      )}


      </ul>
    ) : (
      query && <p style={{ marginTop: '1rem' }}>❗ No se encontraron resultados para “{query}”.</p>
    )}
  </div>
);

}

export default App;
