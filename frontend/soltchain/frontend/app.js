import React, { useState } from 'react';
import './Style.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Ye state decide karegi ki screen par kya dikhana hai
  const [activePage, setActivePage] = useState('dashboard'); 
  const [openMenus, setOpenMenus] = useState({ tokens: true });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) => setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));

  return (
    <div className="app-container">
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="pink-logo">💎 Soltchain</div>
          <button className="connect-mini">Connect</button>
        </div>

        <nav className="sidebar-menu">
          <div className={`menu-item ${activePage === 'dashboard' ? 'active' : ''}`} 
               onClick={() => { setActivePage('dashboard'); setSidebarOpen(false); }}>
            🏠 Dashboard
          </div>

          <div className="menu-group">
            <div className="menu-item" onClick={() => toggleSubMenu('tokens')}>
               🪙 Token <span className={`arrow ${openMenus.tokens ? 'up' : ''}`}>▼</span>
            </div>
            {openMenus.tokens && (
              <div className="sub-menu">
                <div className={`sub-item ${activePage === 'create-token' ? 'highlighted' : ''}`}
                     onClick={() => { setActivePage('create-token'); setSidebarOpen(false); }}>
                  Create Token
                </div>
                <div className="sub-item">Token List</div>
              </div>
            )}
          </div>

          <div className={`menu-item ${activePage === 'chart' ? 'active' : ''}`} 
               onClick={() => { setActivePage('chart'); setSidebarOpen(false); }}>
            📈 Live Chart <span className="badge-hot">HOT</span>
          </div>
          
          <div className="menu-item">🔒 SoltLock</div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="top-nav">
           <div className="page-title">{activePage.toUpperCase()}</div>
           <button className="connect-wallet">Connect Wallet</button>
        </header>

        <div className="content-area">
          {/* 1. DASHBOARD PAGE */}
          {activePage === 'dashboard' && (
            <div className="hero-section">
              <h1>Leading Decentralized Launchpad</h1>
              <p>The most trusted protocol for token services on BSC.</p>
              <button className="btn-main" onClick={() => setActivePage('create-token')}>Start Building</button>
            </div>
          )}

          {/* 2. TOKEN CREATOR PAGE */}
          {activePage === 'create-token' && (
            <div className="creation-card">
              <h2>Create Your Token</h2>
              <input type="text" placeholder="Token Name" />
              <input type="text" placeholder="Symbol" />
              <input type="number" placeholder="Total Supply" />
              <button className="submit-btn">Create Token</button>
            </div>
          )}

          {/* 3. LIVE CHART PAGE (DexScreener) */}
          {activePage === 'chart' && (
            <div className="dexscreener-chart">
               <iframe 
                src="https://dexscreener.com/bsc/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?embed=1&theme=dark&trades=0&info=0" 
                title="DexScreener Chart"
              ></iframe>
            </div>
          )}
        </div>
      </main>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}

export default App;