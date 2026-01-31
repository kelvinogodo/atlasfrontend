import React from 'react'
import './cardcontainer.css'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { TbChartDots2 } from 'react-icons/tb'
import { TfiPieChart } from 'react-icons/tfi'
import { BsBarChartLine } from 'react-icons/bs'
import { BiNetworkChart } from 'react-icons/bi'
import { GiChart } from 'react-icons/gi'
import { MdOutlineAddchart } from 'react-icons/md'

const cardsData = [
  {
    icon: <TbChartDots2 />,
    title: "Premium Economic Calendar",
    desc: "Start trading news like the pros with our pro economic calendar"
  },
  {
    icon: <TfiPieChart />,
    title: "Technical Views",
    desc: "Access live trading setups based on pattern recognition and expert analysis."
  },
  {
    icon: <BiNetworkChart />,
    title: "Alpha EA",
    desc: "Unlock live trading ideas with three EAs for your MT4 and MT5 platform."
  },
  {
    icon: <BsBarChartLine />,
    title: "AI Market Buzz",
    desc: "Gain live market-moving insights of over 35,000 tradable assets."
  },
  {
    icon: <MdOutlineAddchart />,
    title: "Trade Signals",
    desc: "Access daily trading ideas and technical setups in real-time."
  },
  {
    icon: <GiChart />,
    title: "Cashback Bonus",
    desc: "Get a 50% Cashback Bonus that converts to cash when you trade."
  }
];

const CardContainer = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* Strength in Numbers Section */}
      <section className="strength-section">
        <div className="strength-container">
          <div className="strength-content-col">
            <h2 className="strength-headline">Our strength is in the<br />numbers</h2>
            <p className="strength-desc">
              AtlasMarkets Global is one of the largest Forex CFD providers in the world by trading volume.
            </p>
            <div className="strength-actions">
              <button className="btn-primary-green" onClick={() => navigate('/signup')}>Start Trading</button>
              <button className="btn-secondary-outline" onClick={() => navigate('/signup')}>Try a Free Demo</button>
            </div>
          </div>
          <div className="strength-stats-col">
            <div className="strength-stat">
              <span className="s-val">3,600,000</span>
              <span className="s-sub">TRADES PER DAY</span>
            </div>
            <div className="strength-stat">
              <span className="s-val">Equinix NY4</span>
              <span className="s-sub">TRADING HUB AT NEW YORK</span>
            </div>
            <div className="strength-stat">
              <span className="s-val">60%</span>
              <span className="s-sub">ALGO TRADES (% OF ALL TRADES)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot Strip - Moved from Landpage */}
      <div className="trustpilot-strip">
        <div className="trustpilot-left">
          <span className="excellent-text">Excellent</span>
          <div className="trustpilot-stars">
            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
          </div>
          <span className="trustpilot-brand"><span className="tp-star">★</span> Trustpilot</span>
        </div>
        <div className="trustpilot-right">
          <button className="btn-strip-green" onClick={() => navigate('/signup')}>Open an Account</button>
          <button className="btn-strip-white" onClick={() => navigate('/contact')}>
            <span className="chat-icon">💬</span> 24/7 Support
          </button>
        </div>
      </div>

      <section className='cardSection'>
        <div className="cardSectionWrapper" data-aos="fade-up">
          {cardsData.map((card, index) => {
            return (
              <div className="cardSectionCard theme-dark" key={index} data-aos="fade-up">
                <span className="cardSectionCardSvg">
                  {card.icon}
                </span>
                <div className="cardSectionCardSvgText">
                  <h2>{card.title}</h2>
                  <span className="distorted-line"></span>
                  <p>{card.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default CardContainer