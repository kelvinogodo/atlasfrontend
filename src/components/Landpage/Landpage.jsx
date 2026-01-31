import React, { useState, useEffect } from 'react'
import './landpage.css'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tickertape from '../Tickertape'
import TrustBadge from '../TrustBadge'
import { BsArrowRight, BsPlayCircle, BsShieldCheck } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

const Landpage = () => {
  const navigate = useNavigate()
  // Simple fake live counter for "Active Copiers"
  const [copiers, setCopiers] = useState(12845);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopiers(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className='landpage'>
      <div className="background-effects">
        <div className="glow-orb top-left"></div>
        <div className="glow-orb bottom-right"></div>
        <div className="grid-overlay"></div>
      </div>

      <Header />

      <div className='landpage-hero-wrapper'>
        <motion.div
          className='hero-centered-content'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-pill-badge">
            <span className="live-dot"></span>
            {copiers.toLocaleString()} Active Copiers Online
          </div>

          <h1 className='hero-headline'>
            Trade Global Markets <br />
            <span className='hero-gradient-text'>Or Mirror The Best</span>
          </h1>

          <p className='hero-subheadline'>
            AtlasMarkets is your all-in-one trading powerhouse. Trade stocks, crypto, and forex with raw spreads,
            or automatically mirror the strategies of verified masters throughout the world.
          </p>

          <div className='hero-actions'>
            <button className='btn-primary-glow' onClick={() => navigate('/signup')}>
              Start Trading Now
              <div className="btn-glow-effect"></div>
            </button>
            <button className='btn-secondary-outline' onClick={() => navigate('/login')}>
              <BsPlayCircle className="icon-mr" /> Viewing Demo
            </button>
          </div>

          <div className='hero-trust-row'>
            <div className="trust-item">
              <AiFillStar className="star-gold" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="divider-dot"></div>
            <div className="trust-item">
              <BsShieldCheck className="shield-green" />
              <span>SEC Regulated</span>
            </div>
            <div className="divider-dot"></div>
            <div className="trust-item">
              <span>$150M+ Copied Volume</span>
            </div>
          </div>
        </motion.div>

        {/* Abstract Visual Elements (CSS Art instead of Image) */}
        <div className="hero-abstract-visuals">
          <motion.div
            className="floating-card-glass card-1"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-header-mini">
              <img src="/24.jpg" alt="Trader" className="mini-avatar" />
              <div>
                <span className="mini-name">Alex M.</span>
                <span className="mini-role">Forex Master</span>
              </div>
            </div>
            <div className="card-stat-positive">
              +124.5% <span>ROI</span>
            </div>
          </motion.div>

          <motion.div
            className="floating-card-glass card-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="card-header-mini">
              <img src="/67.jpg" alt="Trader" className="mini-avatar" />
              <div>
                <span className="mini-name">David K.</span>
                <span className="mini-role">Stock Pro</span>
              </div>
            </div>
            <div className="card-stat-positive">
              +89% <span>Win Rate</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Tickertape />
    </main>
  )
}

export default Landpage
