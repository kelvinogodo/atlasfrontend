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

  // KYC State
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  // Financial Info
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [investmentExperience, setInvestmentExperience] = useState('');

  // Identity Verification
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idExpiry, setIdExpiry] = useState('');
  const [idDocumentFront, setIdDocumentFront] = useState('');
  const [idDocumentBack, setIdDocumentBack] = useState('');
  const [proofOfAddress, setProofOfAddress] = useState('');
  const [selfiePhoto, setSelfiePhoto] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Account Type State
  const [accountCategory, setAccountCategory] = useState('LIVE'); // LIVE or DEMO
  const [selectedAccountType, setSelectedAccountType] = useState('MT4.ECN.'); // Default selection
  const [currency, setCurrency] = useState('USD');
  const [selectedServer, setSelectedServer] = useState('Server 1');

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

  const uploadDocument = async (file, setter) => {
    setUploadingDoc(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.json();

      if (data.secure_url) {
        setter(data.secure_url);
        Swal.fire('Success', 'Document uploaded successfully', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to upload document', 'error');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(file, setter);
    }
  };

  const validateStep = (step) => {
    if (accountCategory === 'DEMO') return true;
    switch (step) {
      case 1:
        if (!email || !password || !confirmPassword || !firstName || !lastName || !phonenumber || !dateOfBirth || !country || !city || !address) {
          Toast.fire({ icon: 'warning', title: 'Please fill all required fields in Personal Information.' });
          return false;
        }
        if (password !== confirmPassword) {
          Toast.fire({ icon: 'warning', title: 'Passwords do not match.' });
          return false;
        }
        return true;
      case 2:
        if (!employmentStatus || !occupation || !annualIncome || !sourceOfFunds || !investmentExperience) {
          Toast.fire({ icon: 'warning', title: 'Please fill all required fields in Financial Information.' });
          return false;
        }
        return true;
      case 3:
        if (!idType || !idNumber || !idExpiry || !idDocumentFront || !idDocumentBack || !proofOfAddress || !selfiePhoto) {
          Toast.fire({ icon: 'warning', title: 'Please upload all required identity documents.' });
          return false;
        }
        if (!termsAccepted) {
          Toast.fire({ icon: 'warning', title: 'Please accept the Customer Agreement.' });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return; // Toast message already shown by validateStep
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (accountCategory === 'LIVE' && !validateStep(3)) {
      return; // Toast message already shown by validateStep
    }

    if (accountCategory === 'DEMO' && !termsAccepted) {
      Toast.fire({
        icon: 'warning',
        title: 'Please accept the Customer Agreement.',
      });
      return;
    }

    if (accountCategory === 'DEMO' && password !== confirmPassword) {
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
          firstName: firstName || 'Trader',
          lastName: lastName,
          middleName: middleName,
          phonenumber: phonenumber,
          dateOfBirth,
          nationality: country,
          city,
          address,
          zipcode,

          employmentStatus,
          occupation,
          annualIncome,
          sourceOfFunds,
          investmentExperience,

          idType,
          idNumber,
          idExpiry,
          idDocumentFront,
          idDocumentBack,
          proofOfAddress,
          selfiePhoto,

          userName: null, // Let backend generate it

          password: password,
          email: email,
          referralLink: referringUser,
          server: accountCategory === 'LIVE' ? selectedServer : selectedAccountType,
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

      // Check for OTP requirement (Live Account Flow)
      if (result.requireOtp) {
        Toast.fire({
          icon: 'info',
          title: 'Verification code sent to your email.'
        });
        navigate('/verify-otp', { state: { email: email } });
        return;
      }

      // Save token and navigate to dashboard (Demo Account Flow)
      localStorage.setItem('token', result.token);

      // Email Logic (Keep for non-OTP flow if any)
      // Note: Backend handles OTP emails now. 
      // If we are here, it's a DEMO account or legacy flow which might still need email triggers?
      // The backend returns a token immediately for DEMO, so we might want to send the welcome email here 
      // OR move that to backend too. For now, preserving existing Frontend Email logic for Demo/Legacy 
      // as per plan ("Demo accounts remain unchanged" effectively).

      const userData = {
        service_id: 'service_7ww480m',
        template_id: 'template_gjk3r7i',
        user_id: 'xPN9E_hADOXl3h5RZ',
        template_params: {
          'name': `${result.name}`,
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

          {/* Account Type Toggle */}
          <div className="form-section">
            <h2 className="form-section-title">Choose an Account Type:</h2>
            <div className="account-type-controls">
              <div className="account-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${accountCategory === 'LIVE' ? 'active' : ''}`}
                  onClick={() => { setAccountCategory('LIVE'); setCurrentStep(1); }}
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
              {/* Account Details Panel - Keep it visible for both? Or simplify? Keeping existing style */}
              <div className="account-list">
                {/* ... (Existing Account List selection logic if needed, hiding for brevity if redundant, but user might want to choose MT4/MT5) ... */}
                {/* Re-using existing layout mostly for account type selection */}
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
                    <label className="radio-label"><input type="radio" name="currency" value="USD" checked={currency === 'USD'} onChange={() => setCurrency('USD')} /> $ USD</label>
                    <label className="radio-label"><input type="radio" name="currency" value="EUR" checked={currency === 'EUR'} onChange={() => setCurrency('EUR')} /> € EUR</label>
                    <label className="radio-label"><input type="radio" name="currency" value="GBP" checked={currency === 'GBP'} onChange={() => setCurrency('GBP')} /> £ GBP</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            {accountCategory === 'DEMO' ? (
              // Simple Demo Form
              <div className="form-grid">
                <h2 className="form-section-title">Personal Information</h2>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="signup-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Password</label>
                  <div className="password-wrapper">
                    <input type={showPassword ? "text" : "password"} className="signup-input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <div className="password-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"} className="signup-input" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                  <label htmlFor="terms">I confirm that I understand, agree and accept <Link to="/policy" className="terms-link">Customer Agreement</Link></label>
                </div>
                <button type="submit" className="submit-btn" disabled={loader}>{loader ? 'Processing...' : 'OPEN DEMO ACCOUNT'}</button>
              </div>
            ) : (
              // Live Account Multi-Step Form
              <div className="form-container">
                {/* Visual Stepper */}
                <div className="stepper-container">
                  <div className="stepper-line">
                    <div className="stepper-line-progress" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>
                  </div>
                  <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                    <div className="step-circle">{currentStep > 1 ? '✓' : '1'}</div>
                    <div className="step-label">Personal</div>
                  </div>
                  <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                    <div className="step-circle">{currentStep > 2 ? '✓' : '2'}</div>
                    <div className="step-label">Financial</div>
                  </div>
                  <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <div className="step-label">Identity</div>
                  </div>
                </div>

                {/* Step 1: Personal + Account Credentials (Password) */}
                {currentStep === 1 && (
                  <div className="form-grid kyc-grid">
                    <div className="input-group full-width">
                      <label className="input-label">Country</label>
                      <select className="signup-input" value={country} onChange={(e) => setCountry(e.target.value)} required>
                        <option value="">Select Country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Greece">Greece</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">Micronesia</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="North Korea">North Korea</option>
                        <option value="North Macedonia">North Macedonia</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Korea">South Korea</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-Leste">Timor-Leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City">Vatican City</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>

                    <div className="input-group full-width">
                      <label className="input-label">Preferred Server</label>
                      <select className="signup-input" value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)} required>
                        <option value="Server 1">Server 1</option>
                        <option value="Server 2">Server 2</option>
                        <option value="Server 3">Server 3</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label">First Name</label>
                      <input type="text" className="signup-input" placeholder="e.g. John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Middle Name</label>
                      <input type="text" className="signup-input" placeholder="e.g. A." value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Last Name</label>
                      <input type="text" className="signup-input" placeholder="e.g. Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Date of Birth</label>
                      <input type="date" className="signup-input" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Email</label>
                      <input type="email" className="signup-input" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Phone</label>
                      <input type="tel" className="signup-input" placeholder="+1 234 567 8900" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
                    </div>

                    <div className="input-group">
                      <label className="input-label">City</label>
                      <input type="text" className="signup-input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Zip Code</label>
                      <input type="text" className="signup-input" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                    </div>
                    <div className="input-group full-width">
                      <label className="input-label">Address</label>
                      <input type="text" className="signup-input" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>


                    <div className="input-group full-width" style={{ marginTop: '10px' }}>
                      <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1rem' }}>Security Credentials</h4>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Password</label>
                      <div className="password-wrapper">
                        <input type={showPassword ? "text" : "password"} className="signup-input" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </span>
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Confirm Password</label>
                      <div className="password-wrapper">
                        <input type={showConfirmPassword ? "text" : "password"} className="signup-input" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                        </span>
                      </div>
                    </div>

                    <div className="form-navigation full-width">
                      <button type="button" className="btn-primary" onClick={nextStep}>Next: Financial Info</button>
                    </div>
                  </div>
                )}

                {/* Step 2: Financial Info */}
                {currentStep === 2 && (
                  <div className="form-grid kyc-grid">
                    <div className="input-group full-width">
                      <label className="input-label">Employment Status</label>
                      <select className="signup-input" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} required>
                        <option value="">Select Status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                    </div>
                    <div className="input-group full-width">
                      <label className="input-label">Occupation</label>
                      <input type="text" className="signup-input" placeholder="What do you do?" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                    </div>
                    <div className="input-group full-width">
                      <label className="input-label">Annual Income</label>
                      <select className="signup-input" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} required>
                        <option value="">Select Range</option>
                        <option value="1500-25000">$1,500 - $25,000</option>
                        <option value="25000-50000">$25,000 - $50,000</option>
                        <option value="50000-100000">$50,000 - $100,000</option>
                        <option value="100000+">$100,000+</option>
                      </select>
                    </div>
                    <div className="input-group full-width">
                      <label className="input-label">Source of Funds</label>
                      <select className="signup-input" value={sourceOfFunds} onChange={(e) => setSourceOfFunds(e.target.value)} required>
                        <option value="">Select Source</option>
                        <option value="salary">Salary</option>
                        <option value="savings">Savings</option>
                        <option value="investment">Investment</option>
                        <option value="business">Business</option>
                        <option value="inheritance">Inheritance</option>
                      </select>
                    </div>
                    <div className="input-group full-width">
                      <label className="input-label">Investment Experience</label>
                      <select className="signup-input" value={investmentExperience} onChange={(e) => setInvestmentExperience(e.target.value)} required>
                        <option value="">Select Experience</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="form-navigation full-width">
                      <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                      <button type="button" className="btn-primary" onClick={nextStep}>Next: Verification</button>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents and Submit */}
                {currentStep === 3 && (
                  <div className="form-grid kyc-grid">
                    <div className="input-group full-width">
                      <label className="input-label">ID Type</label>
                      <select className="signup-input" value={idType} onChange={(e) => setIdType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="passport">Passport</option>
                        <option value="drivers_license">Driver's License</option>
                      </select>
                    </div>
                    <div className="input-group"><label className="input-label">ID Number</label><input type="text" className="signup-input" placeholder="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required /></div>
                    <div className="input-group"><label className="input-label">Expiry Date</label><input type="date" className="signup-input" placeholder="Expiry Date" value={idExpiry} onChange={(e) => setIdExpiry(e.target.value)} required /></div>

                    <div className="upload-section full-width">
                      <div className="upload-item">
                        <label className="upload-label">ID Front</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setIdDocumentFront)} required />
                        {idDocumentFront && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                      <div className="upload-item">
                        <label className="upload-label">ID Back</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setIdDocumentBack)} required />
                        {idDocumentBack && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                      <div className="upload-item">
                        <label className="upload-label">Proof of Address</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setProofOfAddress)} required />
                        {proofOfAddress && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                      <div className="upload-item">
                        <label className="upload-label">Selfie</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setSelfiePhoto)} required />
                        {selfiePhoto && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                    </div>

                    <div className="terms-checkbox full-width">
                      <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                      <label htmlFor="terms">I confirm that I understand, agree and accept <Link to="/policy" className="terms-link">Customer Agreement</Link></label>
                    </div>

                    <div className="form-navigation full-width">
                      <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                      <button type="submit" className="submit-btn" disabled={loader || uploadingDoc}>{loader ? 'Processing...' : 'Submit & Verify'}</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
