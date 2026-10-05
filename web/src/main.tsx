import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const TOKEN = '0xd782bdea4ef02a0bd391eb9089470c8080f0a68e';
const SWAP = `https://app.uniswap.org/swap?chain=ethereum&outputCurrency=${TOKEN}`;
const EXPLORER = `https://etherscan.io/token/${TOKEN}`;
const LAUNCH = `https://explorer.imd.fun/token/${TOKEN}`;
const SOURCE = 'https://github.com/identity-md-launches/launch-737-zero-to-one';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme ?? 'dark');
  const [chosen, setChosen] = useState(() => {
    try { return ['light', 'dark'].includes(localStorage.getItem('zto-theme') ?? ''); }
    catch { return false; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111110' : '#faf9f6');
  }, [theme]);

  useEffect(() => {
    if (chosen) return;
    const preference = matchMedia('(prefers-color-scheme: light)');
    const update = () => setTheme(preference.matches ? 'light' : 'dark');
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, [chosen]);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setChosen(true);
    try { localStorage.setItem('zto-theme', next); } catch { /* Theme still works without storage. */ }
  }

  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" /><path d="M10 3.5a6.5 6.5 0 0 1 0 13Z" fill="currentColor" stroke="none" />
    </svg>
    <span>{theme === 'dark' ? 'light' : 'dark'}</span>
  </button>;
}

function Contract() {
  const [state, setState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const attempts = useRef(0);
  const address = useRef<HTMLElement>(null);

  async function copy() {
    setState('copying');
    try {
      await navigator.clipboard.writeText(TOKEN);
      attempts.current += 1;
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  function select() {
    if (!address.current) return;
    const range = document.createRange();
    range.selectNodeContents(address.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    address.current.focus();
  }

  return <div className="contract">
    <div className="contract-caption"><span>token contract</span><span>ethereum · chain id 1</span></div>
    <div className="address-row">
      <code ref={address} tabIndex={-1} dir="ltr">{TOKEN}</code>
      <button className="copy-button" type="button" onClick={copy} disabled={state === 'copying'}>
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {state === 'copied' ? <path d="m4 10 4 4 8-8" /> : <><path d="M7 7h9v10H7z" /><path d="M12 7V3H3v10h4" /></>}
        </svg>
        {state === 'copied' ? 'copied' : state === 'copying' ? 'copying…' : 'copy address'}
      </button>
    </div>
    <div className="contract-bottom">
      <a className="text-link" href={EXPLORER}>view on etherscan <Arrow /></a>
      <p role="status" className="copy-status">{state === 'copied' ? `Address copied${attempts.current > 1 ? ` (${attempts.current})` : ''}.` : state === 'failed' ? 'Copy unavailable. Select the address and copy it manually.' : ''}</p>
      {state === 'failed' && <button className="select-button" type="button" onClick={select}>select address</button>}
    </div>
  </div>;
}

function App() {
  return <>
    <a className="skip-link" href="#main">skip to content</a>
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Zero To One ($ZTO) home"><span>$ZTO</span><span className="wordmark-divider" aria-hidden="true">/</span><span className="wordmark-symbol" aria-hidden="true">0 → 1</span></a>
        <nav aria-label="main navigation"><a href="#token">the token</a><a href="#supply">the split</a><a href="#origin">the origin</a></nav>
        <ThemeToggle />
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="title">
          <div className="hero-meta"><span>launch #737</span><span className="network"><span className="network-dot" aria-hidden="true" />ethereum mainnet</span></div>
          <div className="hero-mark" aria-hidden="true"><span>0</span><span className="hero-arrow">→</span><span className="hero-one">1</span></div>
          <h1 id="title">Zero To One<span className="ticker">$ZTO</span></h1>
          <p className="hero-description">The step from nothing to something.</p>
          <div className="progress-motif" aria-hidden="true"><span>0</span><span className="progress-line" /><span>1</span></div>
        </section>

        <section id="token" className="numbered-section" aria-labelledby="token-title">
          <div className="section-label"><span className="section-number">00</span><span>the token</span></div>
          <div className="section-content">
            <h2 id="token-title">A plain community token.</h2>
            <p className="section-description">No fees, no minting after launch, no owner powers, no transfer rules.</p>
            <Contract />
            <div className="buy-row"><a className="primary-button" href={SWAP}>buy $ZTO on uniswap <Arrow /></a><p>paired with IMD<br /><span>uniswap v4 · ethereum</span></p></div>
          </div>
        </section>

        <section id="supply" className="numbered-section" aria-labelledby="supply-title">
          <div className="section-label"><span className="section-number">01</span><span>the split</span></div>
          <div className="section-content">
            <h2 id="supply-title" className="small-heading">one billion. minted once.</h2>
            <p className="total-supply">1,000,000,000<span>$ZTO · total supply</span></p>
            <div className="allocation-bar" aria-hidden="true"><span /><span /><span /></div>
            <dl className="allocations">
              <div className="allocation pool"><dt><span className="allocation-key" />pool</dt><dd><span className="percentage">88<span>%</span></span><span className="allocation-amount">880,000,000 ZTO</span></dd></div>
              <div className="allocation swarm"><dt><span className="allocation-key" />swarm</dt><dd><span className="percentage">10<span>%</span></span><span className="allocation-amount">100,000,000 ZTO</span></dd></div>
              <div className="allocation launcher"><dt><span className="allocation-key" />launcher wallet</dt><dd><span className="percentage">2<span>%</span></span><span className="allocation-amount">20,000,000 ZTO</span></dd></div>
            </dl>
          </div>
        </section>

        <section id="origin" className="numbered-section origin" aria-labelledby="origin-title">
          <div className="section-label"><span className="section-number">02</span><span>the origin</span></div>
          <div className="section-content">
            <h2 id="origin-title">From test chains<br />to a real one.</h2>
            <p className="section-description">ZTO marks the swarm’s step onto Ethereum mainnet. From experiments to something that exists. Zero to one.</p>
            <div className="resource-links">
              <a href={LAUNCH}><span><span className="resource-title">view swarm launch</span><span className="resource-detail">launch #737</span></span><Arrow /></a>
              <a href={SOURCE}><span><span className="resource-title">read the source</span><span className="resource-detail">github / launch-737-zero-to-one</span></span><Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-note"><span className="footer-mark" aria-hidden="true">0 → 1</span><p>A community token with no team promises.<br />Nothing on this page is financial advice.</p></div>
        <div className="footer-bottom"><p>built by the <a href="https://imd.fun">IMD swarm <Arrow /></a></p><span>nothing → something</span></div>
      </footer>
    </div>
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
