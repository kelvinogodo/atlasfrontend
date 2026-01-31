import React from 'react'
import './traderslist.css'
import { motion } from 'framer-motion'

const TradersList = () => {
  return (
    <section className='feature-stats-section'>
      {/* Spreads Promo Section (White Card) */}
      <div className="spreads-promo-container">
        <div className="spreads-card">
          <div className="spreads-text-col">
            <h2 className="spreads-headline">Spreads from 0.0 pips</h2>
            <ul className="spreads-list">
              <li>
                <span className="check-icon">✓</span>
                Raw spreads means really from 0.0 pips*
              </li>
              <li>
                <span className="check-icon">✓</span>
                Our diverse and proprietary liquidity mix keeps spreads tight 24/5
              </li>
            </ul>
            <button className="btn-pricing">Pricing Overview</button>
          </div>

          <div className="spreads-visual-col">
            {/* CSS Phone Mockup */}
            <div className="phone-mockup">
              <div className="phone-screen">
                {/* Simplified Trading Header */}
                <div className="app-header">
                  <span className="menu-icon">☰</span>
                  <span>AtlasMarkets</span>
                  <div className="app-icons">
                    <span>⚡</span><span>🔔</span>
                  </div>
                </div>
                {/* Simplified Market List */}
                <div className="market-row">
                  <div className="m-symbol">EURUSD</div>
                  <div className="m-prices">
                    <span className="m-bid">1.12009</span>
                    <span className="m-ask">1.12009</span>
                  </div>
                </div>
                <div className="market-row">
                  <div className="m-symbol">GBPUSD</div>
                  <div className="m-prices">
                    <span className="m-bid">1.35002</span>
                    <span className="m-ask">1.35005</span>
                  </div>
                </div>
                <div className="market-row active-row">
                  <div className="m-symbol">XAUUSD</div>
                  <div className="m-prices">
                    <span className="m-bid">1729.78</span>
                    <span className="m-ask">1730.97</span>
                  </div>
                </div>
              </div>
              {/* Floating Widget Overlay */}
              <div className="floating-spread-widget">
                <div className="f-header">
                  <span className="f-symbol">EURUSD</span>
                  <span className="f-change">▲ +0.15%</span>
                </div>
                <div className="f-body">
                  <div className="f-col">
                    <span className="f-label">Bid</span>
                    <span className="f-val">1.12009</span>
                  </div>
                  <div className="f-col">
                    <span className="f-label">Ask</span>
                    <span className="f-val">1.12009</span>
                  </div>
                  <div className="f-col right">
                    <span className="f-label">Spread</span>
                    <span className="f-val bold">0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TradersList