import React from 'react'
import './traderslist.css'
import { motion } from 'framer-motion'

const TradersList = () => {
  return (
    <section className='feature-stats-section'>
      <div className="stats-container">

        {/* Left Column: Visual & Stats */}
        <div className="stats-visual-col">
          {/* Background Chart Effect */}
          <div className="chart-bg-overlay"></div>

          <div className="stat-group">
            <h3 className="stat-number">US$2.05 Trillion</h3>
            <span className="stat-label">TRADING VOLUME - OCTOBER 2025</span>
          </div>

          <div className="stat-group">
            <h3 className="stat-number">200,000+</h3>
            <span className="stat-label">ACTIVE CLIENTS WORLDWIDE</span>
          </div>

          <div className="stat-group">
            <h3 className="stat-number">Excellent 4.8/5</h3>
            <span className="stat-label">RATING ON TRUSTPILOT</span>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="feature-content-col">
          <h2 className="feature-headline">
            Give your automated trading system the edge
          </h2>
          <p className="feature-desc">
            AtlasMarkets Global is the one of the top choices for automated traders.
            Our order matching engine located in the New York Equinix NY4 data centre
            processes over 3,600,000 trades per day with over two thirds of all trades
            coming from automated trading systems.
          </p>
        </div>

      </div>
    </section>
  )
}

export default TradersList