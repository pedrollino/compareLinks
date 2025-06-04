import { useState } from 'react';

export default function App() {
  const [linkLocal, setLinkLocal] = useState('');
  const [linkServidor, setLinkServidor] = useState('');
  const [links, setLinks] = useState('');
  const [urlsOk, setUrlsOk] = useState('');
  const [urlsDiferentes, setUrlsDiferentes] = useState('');
  const [carregando, setCarregando] = useState(false);

  const analisar = async () => {
    setCarregando(true);
    setUrlsOk('');
    setUrlsDiferentes('');

    const arrayLinks = links.split(/[\n,]+/).map(l => l.replaceAll('"', '').trim()).filter(Boolean);

    try {
      const res = await fetch('http://localhost:4000/comparar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkLocal, linkServidor, links: arrayLinks })
      });
      const data = await res.json();
      setUrlsOk(data.urlsOk.join('\n'));
      setUrlsDiferentes(data.urlsDiferentes.join('\n'));
    } catch (err) {
      console.error("Erro ao analisar:", err.message);
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

      <div style={{ marginTop: '1rem' }}>
        <button onClick={analisar} disabled={carregando}>
          {carregando ? 'Analisando...' : 'Analisar URLs'}
        </button>
      </div>
    </div>
  );
}
