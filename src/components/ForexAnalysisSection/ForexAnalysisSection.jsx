import React from 'react'
import './forexanalysis.css'
import TradingViewFinancials from '../TradingViewFinancials'
import TradingViewTechnicalAnalysis from '../TradingViewTechnicalAnalysis'

const ForexAnalysisSection = () => {
  return (
    <section className='forex-analysis-section'>
      <div className="section-container">
        <div className="section-header center-header" data-aos="fade-up">
          <h2>Market <span className="highlight-text">Analysis</span></h2>
          <p>Advanced tools for technical and fundamental market research.</p>
        </div>

        <div className="analysis-grid">
          <div className="analysis-card glass-panel-vertical" data-aos="fade-up">
            <div className="analysis-card-header">
              <h3>Technical Research</h3>
              <p>Real-time rating gauges based on moving averages and oscillators.</p>
            </div>
            <div className="analysis-widget-wrapper">
              <TradingViewFinancials />
            </div>
          </div>

          <div className="analysis-card glass-panel-vertical" data-aos="fade-up" data-aos-delay="100">
            <div className="analysis-card-header">
              <h3>Fundamental Data</h3>
              <p>Deep dive into company performance, valuation metrics, and income statements.</p>
            </div>
            <div className="analysis-widget-wrapper">
              <TradingViewTechnicalAnalysis />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForexAnalysisSection