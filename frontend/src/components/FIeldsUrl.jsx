import "../styles/FieldsUrl.css"

export default function FieldsUrl({ localUrl, serverUrl, onLocalChange, onServerChange}) {
    return (
      <div className="fields-container">
        <input 
        type="text" 
        placeholder="🖥️ URL Local"
        value={localUrl}
        onChange={onLocalChange}
        className="input"
        />

        <input 
        type="text" 
        placeholder="🌐 URL Servidor"
        value={serverUrl}
        onChange={onServerChange}
        className="input"
        />
      </div>
    );
  }
  