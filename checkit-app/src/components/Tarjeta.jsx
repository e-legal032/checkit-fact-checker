import styles from './Tarjeta.module.css';

function extraerVeredicto(rating) {
  if (!rating) return "🔎 Veredicto no disponible";
  const t = rating.toLowerCase();

  if (t.includes("falso") || t.includes("false")) return "❌ Falso";
  if (t.includes("verdadero") || t.includes("true")) return "✅ Verdadero";
  if (t.includes("engañoso") || t.includes("misleading")) return "⚠️ Engañoso";
  if (t.includes("parcial") || t.includes("partially")) return "🟡 Parcialmente cierto";

  return "🔎 Veredicto no claro";
}

function claseEstilo(veredicto) {
  if (veredicto.includes("✅")) return styles.veredictoVerdadero;
  if (veredicto.includes("❌")) return styles.veredictoFalso;
  if (veredicto.includes("⚠️")) return styles.veredictoEngañoso;
  if (veredicto.includes("🟡")) return styles.veredictoParcial;
  return styles.veredictoIndefinido;
}

function Tarjeta({ claimData }) {
  const claim = claimData.claimReview?.[0];
  const veredicto = extraerVeredicto(claim?.textualRating);
  const claseVeredicto = claseEstilo(veredicto);

  return (
    <li className={`${styles.tarjeta} ${claseVeredicto}`}>
      <h3 className={styles.titulo}>{claimData.text}</h3>

      {claim && (
        <>
          <p className={styles.veredicto}>{veredicto}</p>
          <p className={styles.textoFuente}>{claim.text}</p>
          <p className={styles.fuente}>
            Fuente: <strong>{claim.publisher?.name}</strong>
          </p>
          <a
            href={claim.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Ver análisis completo ↗
          </a>
        </>
      )}
    </li>
  );
}

export default Tarjeta;
