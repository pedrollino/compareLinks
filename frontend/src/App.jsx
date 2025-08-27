import { useState } from 'react';

export default function App() {
  const [linkLocal, setLinkLocal] = useState('');
  const [linkServidor, setLinkServidor] = useState('');
  const [links, setLinks] = useState('');
  const [urlsOk, setUrlsOk] = useState('');
  const [urlsDiferentes, setUrlsDiferentes] = useState('');
  const [carregando, setCarregando] = useState(false);

  const capturar = async (tipo) => {
    setCarregando(true);

    const arrayLinks = links.split(/[\n,]+/).map(l => l.replaceAll('"', '').trim()).filter(Boolean);
    const baseUrl = tipo === "local" ? linkLocal : linkServidor;

    try {
      const res = await fetch('http://localhost:4000/capturar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseUrl, links: arrayLinks, prefix: tipo })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Erro ao capturar:", err.message);
    }

    setCarregando(false);
  };

  const comparar = async () => {
    setCarregando(true);
    setUrlsOk('');
    setUrlsDiferentes('');

    const arrayLinks = links.split(/[\n,]+/).map(l => l.replaceAll('"', '').trim()).filter(Boolean);

    try {
      const res = await fetch('http://localhost:4000/comparar-salvos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: arrayLinks })
      });
      const data = await res.json();
      setUrlsOk(data.urlsOk.join('\n'));
      setUrlsDiferentes(data.urlsDiferentes.join('\n'));
    } catch (err) {
      console.error("Erro ao comparar:", err.message);
    }

    setCarregando(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Visual Compare</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
        <input type="text" value={linkLocal} onChange={e => setLinkLocal(e.target.value)} placeholder="URL Local" />
        <input type="text" value={linkServidor} onChange={e => setLinkServidor(e.target.value)} placeholder="URL Servidor" />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <label>Links para comparar</label>
          <textarea
            value={links}
            onChange={e => setLinks(e.target.value)}
            placeholder="Links para comparar"
            style={{ flex: 1, height: '400px' }}
          />
        </div>

        <div>
          <label>URLs OK</label>
          <textarea value={urlsOk} readOnly placeholder="URLs OK" style={{ flex: 1, height: '400px' }} />
        </div>

        <div>
          <label>URLs com diferença</label>
          <textarea value={urlsDiferentes} readOnly placeholder="URLs com diferença" style={{ flex: 1, height: '400px' }} />
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => capturar("local")} disabled={carregando}>
          {carregando ? 'Capturando...' : 'Capturar Local'}
        </button>
        <button onClick={() => capturar("servidor")} disabled={carregando}>
          {carregando ? 'Capturando...' : 'Capturar Servidor'}
        </button>
        <button onClick={comparar} disabled={carregando}>
          {carregando ? 'Comparando...' : 'Comparar'}
        </button>
      </div>
    </div>
  );
}
