import "../styles/Results.css"

export default function Results({ title, placeholder }) {
  return (
    <div className="result-box">
      <label>{title}</label>
      <textarea
        readOnly
        placeholder={placeholder}
        className="result-textarea"
      />
    </div>
  );
}
