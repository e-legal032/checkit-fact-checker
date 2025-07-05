import { useRef, useEffect } from 'react';

function Buscador({ query, setQuery, onBuscar, region, setRegion, reiniciar }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (reiniciar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [reiniciar]);

  const manejarInput = (e) => {
    setQuery(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario-busqueda">
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribí una afirmación para verificar..."
        value={query}
        onChange={manejarInput}
        className="input-busqueda"
      />

      <button type="submit" className="boton-buscar">
        Buscar
      </button>

      <div className="selector-region">
        <label>
          <input
            type="radio"
            value="argentina"
            checked={region === 'argentina'}
            onChange={() => setRegion('argentina')}
          />
          Argentina
        </label>

        <label>
          <input
            type="radio"
            value="internacional"
            checked={region === 'internacional'}
            onChange={() => setRegion('internacional')}
          />
          Internacional
        </label>
      </div>

      <p className="aclaracion-region">
        Elegí la región para ajustar los resultados de búsqueda.
      </p>

      <p className="nota-aclaratoria">
        🔎 <strong>CheckIt</strong> te ayuda a verificar afirmaciones con <strong>fuentes confiables</strong> de todo el mundo.<br/>
        Escribí una frase y descubrí si fue chequeada.
      </p>
    </form>
  );
}

export default Buscador;
