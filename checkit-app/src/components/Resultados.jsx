import Tarjeta from './Tarjeta';

function Resultados({ resultados, titulo }) {
  if (resultados.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      {titulo && <h2>{titulo}</h2>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {resultados.map((item, index) => (
          <Tarjeta key={index} claimData={item} />
        ))}
      </ul>
    </div>
  );
}

export default Resultados;
