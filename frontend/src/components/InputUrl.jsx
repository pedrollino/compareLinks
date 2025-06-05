import "../styles/InputUrl.css"

export default function InputUrl({ value, onChange }) {
    return (
      <div className="input-area">
        <label>Links para comparar</label>
        <textarea 
        placeholder="Cole as URLs aqui..."
        value={value}
        onChange={onChange}
        className="input-textarea"
        />
      </div>
    );
  }
  