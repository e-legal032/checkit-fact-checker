function Buscador({ query, setQuery, onBuscar, region, setRegion }) {
  const manejarInput = (e) => {
    setQuery(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <form onSubmit={manejarSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Escribí una afirmación para verificar..."
        value={query}
        onChange={manejarInput}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button type="submit" style={{ marginLeft: '1rem' }}>
        Buscar
      </button>
      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="radio"
            value="argentina"
            checked={region === 'argentina'}
            onChange={() => setRegion('argentina')}
          />
          Argentina
        </label>

        <label style={{ marginLeft: '1.5rem' }}>
          <input
            type="radio"
            value="internacional"
            checked={region === 'internacional'}
            onChange={() => setRegion('internacional')}
          />
          Internacional
        </label>
      </div>

    </form>
  );
}

export default Buscador;
