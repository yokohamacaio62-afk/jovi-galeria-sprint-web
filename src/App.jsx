import React, { useState, useEffect } from 'react';

// --- COMPONENTE FILHO: HEADER ---
function Header({ totalItems, onSearch }) {
  return (
    <header style={{ background: '#1e293b', color: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>Jovi Gallery - Enterprise Edition</h1>
      <p>Gerenciador Inteligente de Mídia e Conteúdo</p>
      <input 
        type="text" 
        placeholder="🔍 Pesquisar na central de conteúdo..." 
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '8px', width: '60%', borderRadius: '4px', border: 'none', marginTop: '10px' }}
      />
    </header>
  );
}

// --- COMPONENTE FILHO: ESTATÍSTICAS E MATH ---
function Statistics({ items, history }) {
  const total = items.length;
  const videosCount = items.filter(i => i.type === 'video').length;
  const imagesCount = total - videosCount;
  
  // Exemplo de uso de Math exigido pela sprint (arredondamento de percentual)
  const videoPercentage = total > 0 ? Math.round((videosCount / total) * 100) : 0;

  return (
    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #cbd5e1' }}>
      <h3>📊 Estatísticas e Histórico de Uso</h3>
      <p>Total de itens ativos: <strong>{total}</strong> | Imagens: {imagesCount} | Vídeos: {videosCount} ({videoPercentage}% do total)</p>
      <div style={{ maxHeight: '100px', overflowY: 'auto', background: '#fff', padding: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
        <strong>Log de Atividades Recentes:</strong>
        {history.slice(0, 5).map((log, idx) => (
          <div key={idx}>[{log.time}] {log.action}</div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE FILHO: FORMULÁRIO DE UPLOAD E ÁLBUNS ---
function UploadAndAlbums({ onAdd, albums, currentAlbum, setCurrentAlbum, onCreateAlbum }) {
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const type = file.type.includes('video') ? 'video' : 'image';
      onAdd({ id: Date.now(), url, type, album: currentAlbum, isPrivate: false, date: new Date().toLocaleDateString() });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexWrap: 'wrap' }}>
      <div>
        <h4>Novo Upload (Foto ou Vídeo)</h4>
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </div>
      <div>
        <h4>Álbum Atual:</h4>
        <select value={currentAlbum} onChange={(e) => setCurrentAlbum(e.target.value)} style={{ padding: '5px' }}>
          {albums.map(alb => <option key={alb} value={alb}>{alb}</option>)}
        </select>
      </div>
      <div>
        <h4>Criar Novo Álbum</h4>
        <input 
          type="text" 
          placeholder="Nome do álbum" 
          value={newAlbumName} 
          onChange={(e) => setNewAlbumName(e.target.value)}
        />
        <button onClick={() => { if(newAlbumName) { onCreateAlbum(newAlbumName); setNewAlbumName(''); }}} style={{ marginLeft: '5px' }}>Criar</button>
      </div>
    </div>
  );
}

// --- COMPONENTE FILHO: CARD DE ITEM INDIVIDUAL ---
function MediaCard({ item, onDelete, onToggleCompare, onTogglePrivacy }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center', position: 'relative' }}>
      <span style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px', background: item.isPrivate ? '#ef4444' : '#22c55e', color: '#fff', padding: '2px 5px', borderRadius: '4px' }}>
        {item.isPrivate ? 'Privado' : 'Público'}
      </span>

      {item.type === 'video' ? (
        <video src={item.url} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '4px' }} controls />
      ) : (
        <img src={item.url} alt="Mídia" style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '4px' }} />
      )}
      
      <p style={{ fontSize: '12px', margin: '5px 0' }}>Álbum: {item.album}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
        <button onClick={() => onTogglePrivacy(item.id)} style={{ fontSize: '11px', padding: '3px', cursor: 'pointer' }}>
          Tornar {item.isPrivate ? 'Público' : 'Privado'}
        </button>
        <button onClick={() => onToggleCompare(item)} style={{ fontSize: '11px', padding: '3px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Comparar Lado a Lado
        </button>
        <button onClick={() => onDelete(item.id)} style={{ fontSize: '11px', padding: '3px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Excluir (Lixeira)
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (PAI) ---
export default function App() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('@jovi_items')) || []);
  const [trash, setTrash] = useState(() => JSON.parse(localStorage.getItem('@jovi_trash')) || []);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('@jovi_history')) || []);
  const [albums, setAlbums] = useState(['Geral', 'Viagens', 'Trabalho']);
  const [currentAlbum, setCurrentAlbum] = useState('Geral');
  const [searchTerm, setSearchTerm] = useState('');
  const [compareList, setCompareList] = useState([]);

  // Persistência com localStorage
  useEffect(() => {
    localStorage.setItem('@jovi_items', JSON.stringify(items));
    localStorage.setItem('@jovi_trash', JSON.stringify(trash));
    localStorage.setItem('@jovi_history', JSON.stringify(history));
  }, [items, trash, history]);

  const logAction = (action) => {
    setHistory(prev => [{ action, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const addItem = (newItem) => {
    setItems([newItem, ...items]);
    logAction(`Adicionou novo item (${newItem.type}) no álbum ${newItem.album}`);
  };

  const moveToTrash = (id) => {
    const item = items.find(i => i.id === id);
    setItems(items.filter(i => i.id !== id));
    setTrash([item, ...trash]);
    logAction(`Moveu o item ID ${id} para a lixeira`);
  };

  const restoreFromTrash = (id) => {
    const item = trash.find(i => i.id === id);
    setTrash(trash.filter(i => i.id !== id));
    setItems([item, ...items]);
    logAction(`Restaurou o item ID ${id} da lixeira`);
  };

  const togglePrivacy = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, isPrivate: !i.isPrivate } : i));
    logAction(`Alterou a privacidade do item ID ${id}`);
  };

  const toggleCompare = (item) => {
    if (compareList.find(i => i.id === item.id)) {
      setCompareList(compareList.filter(i => i.id !== item.id));
    } else {
      if (compareList.length < 2) {
        setCompareList([...compareList, item]);
      } else {
        alert("Você só pode comparar 2 itens por vez.");
      }
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "jovi_gallery_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logAction("Exportou os dados da galeria");
  };

  // Filtragem por busca e álbum atual
  const filteredItems = items.filter(item => 
    item.album === currentAlbum && 
    (searchTerm === '' || item.date.includes(searchTerm) || item.type.includes(searchTerm))
  );

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '20px', maxWidth: '1100px', margin: '0 auto', background: '#f1f5f9', minHeight: '100vh' }}>
      
      <Header totalItems={items.length} onSearch={setSearchTerm} />
      
      <Statistics items={items} history={history} />

      <UploadAndAlbums 
        onAdd={addItem} 
        albums={albums} 
        currentAlbum={currentAlbum} 
        setCurrentAlbum={setCurrentAlbum} 
        onCreateAlbum={(name) => setAlbums([...albums, name])} 
      />

      {/* Ações Extras Exigidas: Exportar dados */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={exportData} style={{ padding: '8px 12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          📥 Exportar Dados do Conteúdo
        </button>
      </div>

      {/* Seção de Comparação Lado a Lado */}
      {compareList.length > 0 && (
        <div style={{ background: '#e0f2fe', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #7dd3fc' }}>
          <h4>⚖️ Comparação Lado a Lado ({compareList.length}/2)</h4>
          <div style={{ display: 'flex', gap: '20px' }}>
            {compareList.map(comp => (
              <div key={comp.id} style={{ border: '2px solid #0284c7', padding: '10px', background: '#fff', borderRadius: '6px' }}>
                {comp.type === 'video' ? <video src={comp.url} width="160" controls /> : <img src={comp.url} width="160" alt="" />}
                <br />
                <button onClick={() => toggleCompare(comp)} style={{ marginTop: '5px', fontSize: '11px', cursor: 'pointer' }}>Remover da Comparação</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade de Conteúdo Principal */}
      <h2 style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '5px' }}>Álbum: {currentAlbum} (Destaques e Mais Recentes)</h2>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {filteredItems.length === 0 ? (
          <p style={{ color: '#64748b' }}>Nenhum item encontrado neste álbum. Faça um upload acima!</p>
        ) : (
          filteredItems.map(item => (
            <MediaCard 
              key={item.id} 
              item={item} 
              onDelete={moveToTrash} 
              onToggleCompare={toggleCompare} 
              onTogglePrivacy={togglePrivacy} 
            />
          ))
        )}
      </div>

      {/* Seção de Lixeira (Recuperação de Itens Excluídos) */}
      {trash.length > 0 && (
        <div style={{ background: '#fee2e2', padding: '15px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
          <h3 style={{ color: '#991b1b' }}>🗑️ Lixeira (Recuperar Itens Excluídos)</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {trash.map(trh => (
              <div key={trh.id} style={{ background: '#fff', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <img src={trh.url} width="80" alt="" style={{ opacity: 0.5, borderRadius: '4px' }} />
                <br />
                <button onClick={() => restoreFromTrash(trh.id)} style={{ marginTop: '5px', fontSize: '11px', background: '#16a34a', color: '#fff', border: 'none', padding: '3px 6px', borderRadius: '3px', cursor: 'pointer' }}>
                  Restaurar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer padrão exigido */}
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#64748b', fontSize: '13px' }}>
        <p>Projeto Integrador - Engenharia de Software | Sprint 3 - Web Development com React</p>
      </footer>
    </div>
  );
}