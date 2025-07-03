function Buscador({ query, setQuery, onBuscar }) {
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
    </form>
  );
}

export default Buscador;
