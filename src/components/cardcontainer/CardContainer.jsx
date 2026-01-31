import React from 'react'
import './cardcontainer.css'
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
  return (
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
  )
}

export default CardContainer