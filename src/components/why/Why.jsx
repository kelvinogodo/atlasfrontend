import React from 'react'
import './why.css'
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const Why = () => {
    return (
        <section className='comparison-section'>
            <div className="comparison-container">
                <div className="comparison-header" data-aos="fade-up">
                    <h2>How We <span className="highlight-text">Compare</span></h2>
                    <p>See why thousands of traders are switching to AtlasMarkets every week.</p>
                </div>

                <div className="comparison-table-wrapper" data-aos="fade-up">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Traditional Brokers</th>
                                <th className="brand-header">
                                    AtlasMarkets
                                    <span className="brand-badge">Recommended</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="feature-cell">Mirror Trading</td>
                                <td className="negative-cell"><BsXCircleFill /></td>
                                <td className="positive-cell"><BsCheckCircleFill /></td>
                            </tr>
                            <tr>
                                <td className="feature-cell">Verified Master Traders</td>
                                <td className="negative-cell"><BsXCircleFill /></td>
                                <td className="positive-cell"><BsCheckCircleFill /></td>
                            </tr>
                            <tr>
                                <td className="feature-cell">Minimum Deposit</td>
                                <td className="neutral-cell">$500+</td>
                                <td className="positive-cell highlight-cell">$50</td>
                            </tr>
                            <tr>
                                <td className="feature-cell">Performance Fees</td>
                                <td className="neutral-cell">Hidden</td>
                                <td className="positive-cell">Transparent (Profit Only)</td>
                            </tr>
                            <tr>
                                <td className="feature-cell">24/7 Support</td>
                                <td className="negative-cell"><BsXCircleFill /></td>
                                <td className="positive-cell"><BsCheckCircleFill /></td>
                            </tr>
                            <tr>
                                <td className="feature-cell">Withdrawal Speed</td>
                                <td className="neutral-cell">3-5 Business Days</td>
                                <td className="positive-cell highlight-cell">Instant</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Why