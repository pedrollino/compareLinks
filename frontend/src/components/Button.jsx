import "../styles/Button.css"

export default function Button({ onClick, carregando }) {
    return (
      <div className="button-container">
        <button onClick={onClick} disabled={carregando}>
        {carregando ? "⏳ Analisando..." : "🚀 Analisar URLs"}
        </button>
      </div>
    );
  }
  