function extraerVeredicto(rating) {
  if (!rating) return "🔎 Veredicto no disponible";
  const t = rating.toLowerCase();

  if (t.includes("falso") || t.includes("false")) return "❌ Falso";
  if (t.includes("verdadero") || t.includes("true")) return "✅ Verdadero";
  if (t.includes("engañoso") || t.includes("misleading")) return "⚠️ Engañoso";
  if (t.includes("parcial") || t.includes("partially")) return "🟡 Parcialmente cierto";

  return "🔎 Veredicto no claro";
}

function Tarjeta({ claimData }) {
  const claim = claimData.claimReview?.[0];
  const veredicto = extraerVeredicto(claim?.textualRating);

  return (
    <li
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        background: '#f9f9f9',
      }}
    >
      <h3>{claimData.text}</h3>

      {claim && (
        <>
          <p style={{
            display: 'inline-block',
            padding: '0.3rem 0.6rem',
            borderRadius: '4px',
            backgroundColor: '#eef',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {veredicto}
          </p>

          <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
            {claim.text}
          </p>

          <p style={{ marginBottom: '0.3rem' }}>
            Fuente: <strong>{claim.publisher?.name}</strong>
          </p>

          <a
            href={claim.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0077cc',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Ver análisis completo ↗
          </a>
        </>
      )}
    </li>
  );
}

export default Tarjeta;
