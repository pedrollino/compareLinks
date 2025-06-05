import { useState } from 'react';
import Header from './components/Header';
import Results from './components/Results';
import InputUrl from './components/InputUrl';
import Button from './components/Button';
import FieldsUrl from './components/FIeldsUrl';
import "./App.css";

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
    <div className='app-container'>
      <Header />
      <div>
      <FieldsUrl 
          linkLocal={linkLocal}
          serverUrl={linkServidor}
          onLocalChange={(e) => setLinkLocal(e.target.value)}
          onServerChange={(e) => setLinkServidor(e.target.value)}
        />
      </div>
      <div className='main-content'>
        <InputUrl value={links} onChange={(e) => setLinks(e.target.value)}/>
        <Results 
        title="✅ URLs OK"
        placeholder="URLs OK"
        value={urlsOk}
        />
        <Results 
        title="⚠️ URLs com diferença"
        placeholder="URLs com diferença"
        value={urlsDiferentes}
        />
      </div>
      <Button 
      onClick={analisar} 
      carregando={carregando}
      />
    </div>
  );
}
