import './App.css';
import Header from './components/layout/Header';
import Button from './components/common/Button';

function App() {
  const testButton = () => {
    alert('Botão de teste clicado!');
  };

  return (
    <div className="App">
      <Header />
      
      {/* Espaço para compensar o header fixo */}
      <div style={{ marginTop: '100px', padding: '20px' }}>
        <h1>EcoChain - Teste dos Componentes</h1>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button onClick={testButton}>
            Botão Primário
          </Button>
          
          <Button type="outline" onClick={testButton}>
            Botão Outline
          </Button>
          
          <Button size="large" onClick={testButton}>
            Botão Grande
          </Button>
        </div>
        
        <p style={{ marginTop: '20px' }}>
          Se você vê o cabeçalho e os botões funcionando, está tudo certo!
        </p>
        
        <p><strong>Teste:</strong> Diminua a tela para ver o menu responsivo!</p>
      </div>
    </div>
  );
}

export default App;