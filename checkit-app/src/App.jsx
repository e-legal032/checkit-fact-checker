import { useState, useEffect } from 'react';
import './App.css';
import Resultados from './components/Resultados';
import Buscador from './components/Buscador';
import lupaLogo from './assets/logo-lupa.png';
import Splash from './components/Splash';
import Footer from './components/Footer';


function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [region, setRegion] = useState('internacional');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [reiniciar, setReiniciar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  const buscar = async () => {
    if (!query.trim()) {
      alert("Por favor escribí una afirmación para buscar.");
      return;
    }
    setBusquedaRealizada(true);

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

  const limpiarBusqueda = () => {
    setQuery('');
    setResultados([]);
    setRecientes([]);
    setBusquedaRealizada(false);
    setReiniciar(prev => !prev);
  };

  useEffect(() => {
    if (resultados.length === 0 && query.trim()) {
      verRecientes();
    }
  }, [resultados, query]);

  return (
    <>
      {!splashDone && <Splash />}
      {splashDone && (
        <div className="header-principal">
          <div className="contenedor-app">
            <h1 className="titulo-principal">
              CheckIt
              <img src={lupaLogo} alt="lupa de verificación" className="logo-lupa" />
            </h1>
            <p className="subtitulo">Tu aliada para verificar información con fuentes confiables</p>
            <div className="leyenda-veredictos">
              <span className="leyenda-tag verdadero">✅ Verdadero</span>
              <span className="leyenda-tag falso">❌ Falso</span>
              <span className="leyenda-tag engañoso">⚠️ Engañoso</span>
              <span className="leyenda-tag parcial">🟡 Parcial</span>
              <span className="leyenda-tag indefinido">🔎 No claro</span>
            </div>

            <Buscador
              query={query}
              setQuery={setQuery}
              onBuscar={buscar}
              region={region}
              setRegion={setRegion}
              reiniciar={reiniciar}
            />

            {busquedaRealizada && (
              <button onClick={limpiarBusqueda} className="boton-limpiar">
                Limpiar búsqueda
              </button>
            )}
          </div>

          {busquedaRealizada && resultados.length === 0 && (
            <div className="mensaje-sin-resultados">
              <p>❗ No se encontraron verificaciones para “{query}”.</p>
              <p>📰 Mientras tanto, podés revisar estas verificaciones recientes:</p>
            </div>
          )}

          {resultados.length > 0 && (
            <Resultados resultados={resultados} titulo="Resultados de búsqueda" />
          )}

          {recientes.length > 0 && (
            <Resultados resultados={recientes} titulo="Verificaciones recientes" />
          )}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
