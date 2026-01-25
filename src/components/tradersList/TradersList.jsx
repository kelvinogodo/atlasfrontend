import { useNavigate } from 'react-router-dom'
import './traderslist.css'
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs'
import { AiOutlineLineChart } from 'react-icons/ai'

const TradersList = () => {
  const navigate = useNavigate()

  const traders = [
    {
      id: 1,
      name: "Maximuz Cole",
      image: "/jurica-koletic-7YVZYZeITc8-unsplash.jpg",
      roi: "+223%",
      winRate: "78%",
      followers: "56",
      copiers: "12",
      risk: "Low",
      verified: true
    },
    {
      id: 2,
      name: "Pete Duplexi",
      image: "/fortune-vieyra-QIMjYJSFoXM-unsplash.jpg",
      roi: "+356%",
      winRate: "82%",
      followers: "105",
      copiers: "45",
      risk: "Medium",
      verified: true
    },
    {
      id: 3,
      name: "EA Trader Paul",
      image: "/gregory-gill-4Bf5LNEPqZ0-unsplash.jpg",
      roi: "+421%",
      winRate: "65%",
      followers: "2k+",
      copiers: "847",
      risk: "High",
      verified: true
    }
  ]

  return (
    <section className='TraderListSection'>
      <div className="traderListSectionWrapper">
        <div className="section-header" data-aos="fade-up">
          <h2>Real Traders. <span className="highlight-text">Real Results.</span></h2>
          <p>Browse verified master traders and start copying their strategies automatically.</p>
        </div>

        <div className="traderListCardContainer" data-aos="fade-up">
          {traders.map((trader) => (
            <div className="master-trader-card" key={trader.id}>
              <div className="card-header">
                <img src={trader.image} alt={trader.name} className="trader-avatar" />
                <div className="trader-info">
                  <div className="name-row">
                    <h3>{trader.name}</h3>
                    {trader.verified && <BsCheckCircleFill className="verified-badge" />}
                  </div>
                  <span className="trader-label">Professional Trader</span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">12M ROI</span>
                  <span className="stat-value positive">{trader.roi}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Win Rate</span>
                  <span className="stat-value">{trader.winRate}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Followers</span>
                  <span className="stat-value">{trader.followers}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Copiers</span>
                  <span className="stat-value">{trader.copiers}</span>
                </div>
              </div>

              <div className="chart-preview">
                {/* Placeholder for chart visual */}
                <div className="dummy-chart-line"></div>
              </div>

              <div className="card-actions">
                <button className="copy-action-btn" onClick={() => navigate('/signup')}>
                  Start Copying
                </button>
                <button className="profile-link-btn" onClick={() => navigate('/signup')}>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="browse-all-btn" onClick={() => navigate('/signup')}>
            See All Traders <BsArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TradersList