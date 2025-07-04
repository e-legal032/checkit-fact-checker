import { useState, useEffect } from 'react';
import './App.css';
import Resultados from './components/Resultados';
import Buscador from './components/Buscador';

function App() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [region, setRegion] = useState('internacional');

const buscar = async () => {
  if (!query.trim()) {
    alert("Por favor escribí una afirmación para buscar.");
    return;
  }

  let consulta = query.trim();
  if (region === 'argentina') {
    consulta += ' Argentina';
  }

  const apiKey = import.meta.env.VITE_FACTCHECK_API_KEY;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(consulta)}&key=${apiKey}`;

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
  useEffect(() => {
    if (resultados.length === 0 && query.trim()) {
      verRecientes();
    }
  }, [resultados, query]);

  return (
  <div style={{ padding: '2rem' }}>
    <h1>CheckIt 🔍</h1>
    <Buscador query={query}
    setQuery={setQuery}
    onBuscar={buscar} 
    region={region}
    setRegion={setRegion}/>

    {/* 🧠 Si se hizo una búsqueda pero no hay resultados */}
      {resultados.length === 0 && query.trim() && (
        <div style={{ marginTop: '2rem' }}>
          <p>❗ No se encontraron verificaciones para “{query}”.</p>
          <p>📰 Mientras tanto, podés revisar estas verificaciones recientes:</p>
        </div>
      )}

      {/* ✅ Mostrar resultados de búsqueda si hay */}
      {resultados.length > 0 && (
        <Resultados resultados={resultados} titulo="Resultados de búsqueda" />
      )}

      {/* 🕑 Mostrar verificaciones recientes si están disponibles */}
      {recientes.length > 0 && (
        <Resultados resultados={recientes} titulo="Verificaciones recientes" />
      )}
  
  </div>
);

}

export default App;
