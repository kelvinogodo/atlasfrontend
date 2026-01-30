import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import Header from '../components/Header/Header'; // Import logic
import './Signup.css';

const Signup = ({ route }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Account Type State
  const [accountCategory, setAccountCategory] = useState('LIVE'); // LIVE or DEMO
  const [selectedAccountType, setSelectedAccountType] = useState('MT4.ECN.'); // Default selection
  const [currency, setCurrency] = useState('USD');

  const [loader, setLoader] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Geo Location State
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [country, setCountry] = useState('');
  const [deviceName, setDeviceName] = useState('');

  // Account Details Data
  const accountDetails = {
    'MT4.ECN.': {
      description: 'The MT4.ECN account provides you with direct access to the interbank market through the MetaTrader 4 trading platform.',
      spread: 'Tight spreads, from 0 pips',
      deposit: 'Minimum initial deposit - 1 USD',
      order: 'Minimum order size - 0.01 standard lot (1000 units)',
      leverage: 'Maximum leverage - 1:1000'
    },
    'MT4.STD.': {
      description: 'The MT4.STD account offers a standard trading experience with stable spreads on the MetaTrader 4 platform.',
      spread: 'Floating spreads, from 1.0 pips',
      deposit: 'Minimum initial deposit - 10 USD',
      order: 'Minimum order size - 0.01 standard lot',
      leverage: 'Maximum leverage - 1:500'
    },
    'MT5.ECN.': {
      description: 'The MT5.ECN account brings ECN execution to the advanced MetaTrader 5 platform.',
      spread: 'Raw spreads, from 0 pips',
      deposit: 'Minimum initial deposit - 1 USD',
      order: 'Minimum order size - 0.01 lot',
      leverage: 'Maximum leverage - 1:1000'
    },
    'MT5.STD.': {
      description: 'The MT5.STD account provides standard execution on the powerful MetaTrader 5 platform.',
      spread: 'Spreads from 1.2 pips',
      deposit: 'Minimum initial deposit - 10 USD',
      order: 'Minimum order size - 0.01 lot',
      leverage: 'Maximum leverage - 1:500'
    }
  };

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            // Fetch country name using reverse geocoding from Nominatim
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            if (data?.address?.country) {
              setCountry(data.address.country);
            }
          } catch (err) {
            console.warn('Could not fetch country from coordinates:', err);
          }
        },
        (error) => {
          console.warn('Geolocation not available or denied:', error);
        }
      );
    }

    // Detect OS and browser from userAgent
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';

    if (/windows/i.test(ua)) os = 'Windows';
    else if (/mac/i.test(ua)) os = 'MacOS';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/iphone|ipad/i.test(ua)) os = 'iOS';

    if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) browser = 'Chrome';
    else if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
    else if (/edge/i.test(ua)) browser = 'Edge';
    else if (/opr|opera/i.test(ua)) browser = 'Opera';

    setDeviceName(`${os} – ${browser}`);
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      Toast.fire({
        icon: 'warning',
        title: 'Please accept the Customer Agreement.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'Passwords do not match.',
      });
      return;
    }

    setLoader(true);

    try {
      const referringUser = localStorage.getItem('referedUser') || '';
      const response = await fetch(`${route}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Simplified fields: Send defaults/empty for fields removed from UI
          firstName: 'Trader',
          lastName: '',
          userName: null, // Let backend generate it
          phonenumber: '',

          password: password,
          email: email,
          referralLink: referringUser,
          server: selectedAccountType || null,
          accountCategory: accountCategory,
          currency: currency,
          location,
          deviceName,
          country
        }),
      });

      const result = await response.json();
      setLoader(false);

      if (result.status === 'error') {
        Toast.fire({
          icon: 'warning',
          title: `${result.message}`,
        });
        return;
      }

      // Save token and navigate to dashboard
      localStorage.setItem('token', result.token);

      // Email Logic
      const userData = {
        service_id: 'service_7ww480m',
        template_id: 'template_gjk3r7i',
        user_id: 'xPN9E_hADOXl3h5RZ',
        template_params: {
          'name': `${result.name}`, // Backend will return the generated name or 'Trader'
          'email': `${result.email}`,
          'verificationLink': `${result.verificationLink}`
        }
      };

      const adminData = {
        service_id: 'service_7ww480m',
        template_id: 'template_bwdvkix',
        user_id: 'xPN9E_hADOXl3h5RZ',
        template_params: {
          'name': `Bro`,
          'email': `support@atlasprimemarket.com`,
          'message': `${result.message}`,
          'reply_to': `support@atlasprimemarket.com`,
          'subject': `${result.adminSubject}`
        }
      };

      const sendMail = async (dataList) => {
        await Promise.all(dataList.map(data =>
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        ));
      };

      if (result.referringUser === null) {
        sendMail([userData, adminData]);
      } else {
        const referringUserData = {
          service_id: 'service_7ww480m',
          template_id: 'template_bwdvkix',
          user_id: 'xPN9E_hADOXl3h5RZ',
          template_params: {
            'name': `${result.referringUserName}`,
            'email': `${result.referringUserEmail}`,
            'message': `${result.referringUserMessage}`,
            'reply_to': `support@atlasprimemarket.com`,
            'subject': `${result.subject}`
          }
        };
        sendMail([userData, referringUserData, adminData]);
      }

      Toast.fire({
        icon: 'success',
        title: 'Account successfully created!'
      });

      // Clear form and localStorage
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      localStorage.removeItem('referedUser');

      navigate('/dashboard');
    } catch (error) {
      setLoader(false);
      console.error("Error during signup:", error);
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="signup-page-container">
      {loader && <Loader />}

      <Header />

      <div className="signup-content">
        <h1 className="page-title">Registration</h1>

        <form className="signup-form" onSubmit={handleSignup}>

          {/* Personal Information Section */}
          <div className="form-section">
            <h2 className="form-section-title">Personal Information</h2>
            <div className="form-grid">
              <div className="input-group">
                <input
                  type="email"
                  className="signup-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="signup-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>
              </div>

              <div className="input-group">
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="signup-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Choose Account Type Section */}
          <div className="form-section">
            <h2 className="form-section-title">Choose an Account Type:</h2>

            <div className="account-type-controls">
              <div className="account-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${accountCategory === 'LIVE' ? 'active' : ''}`}
                  onClick={() => setAccountCategory('LIVE')}
                >
                  LIVE ACCOUNT
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${accountCategory === 'DEMO' ? 'active' : ''}`}
                  onClick={() => setAccountCategory('DEMO')}
                >
                  DEMO ACCOUNT
                </button>
              </div>

              <div className="account-list">
                <div className="account-list-sidebar">
                  {Object.keys(accountDetails).map((type) => (
                    <div
                      key={type}
                      className={`account-list-item ${selectedAccountType === type ? 'selected' : ''}`}
                      onClick={() => setSelectedAccountType(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>

                <div className="account-details-panel">
                  <div className="account-details-description">
                    {accountDetails[selectedAccountType]?.description}
                  </div>
                  <ul className="account-details-specs">
                    <li>{accountDetails[selectedAccountType]?.spread}</li>
                    <li>{accountDetails[selectedAccountType]?.deposit}</li>
                    <li>{accountDetails[selectedAccountType]?.order}</li>
                    <li>{accountDetails[selectedAccountType]?.leverage}</li>
                  </ul>

                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="currency"
                        value="USD"
                        checked={currency === 'USD'}
                        onChange={() => setCurrency('USD')}
                      /> $ USD
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="currency"
                        value="EUR"
                        checked={currency === 'EUR'}
                        onChange={() => setCurrency('EUR')}
                      /> € EUR
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="currency"
                        value="GBP"
                        checked={currency === 'GBP'}
                        onChange={() => setCurrency('GBP')}
                      /> £ GBP
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              I confirm that I understand, agree and accept <Link to="/policy" className="terms-link">Customer Agreement</Link>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loader}>
            {loader ? 'Processing...' : 'OPEN ACCOUNT NOW'}
          </button>

          <div className="login-link-container">
            Already have an account? <Link to="/login" className="login-link">Log in here</Link>
          </div>

        </form>
      </div>

      {loader && <div className="loader-overlay"><Loader /></div>}
    </div>
  );
};

export default Signup;
