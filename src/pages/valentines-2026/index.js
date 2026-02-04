import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { meta } from "../../content_option";

export const Valentines2026 = () => {
  const [step, setStep] = useState(1); // 1: initial, 2: confirmation, 3: payment, 4: congratulations
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 200, y: 100 });
  const [kissEmojis, setKissEmojis] = useState([]);
  const [kissCount, setKissCount] = useState(0);
  const [showKissToast, setShowKissToast] = useState(false);
  const [showInKindToast, setShowInKindToast] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showKidsInput, setShowKidsInput] = useState(false);
  const [kidsInput, setKidsInput] = useState("");
  const [kidsInputError, setKidsInputError] = useState("");
  const [kidsInputValid, setKidsInputValid] = useState(false);
  const [kidsInputSubmitted, setKidsInputSubmitted] = useState(false);
  const [correctNamesFound, setCorrectNamesFound] = useState([]);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    // Initialize no button position relative to container
    if (buttonContainerRef.current && step === 1) {
      const container = buttonContainerRef.current;
      const rect = container.getBoundingClientRect();
      setNoButtonPosition({
        x: rect.width / 2 + 150,
        y: 0
      });
    }
  }, [step]);

  const handleNoHover = (e) => {
    if (buttonContainerRef.current) {
      const container = buttonContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Get mouse position relative to container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      // Get current button position
      const buttonWidth = 120;
      const buttonHeight = 50;
      const buttonCenterX = noButtonPosition.x + buttonWidth / 2;
      const buttonCenterY = noButtonPosition.y + buttonHeight / 2;
      
      // Calculate distance from mouse to button center
      const dx = buttonCenterX - mouseX;
      const dy = buttonCenterY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If mouse is too close, move button away
      if (distance < 100) {
        // Calculate direction away from mouse
        const angle = Math.atan2(dy, dx);
        const moveDistance = 150;
        let newX = buttonCenterX + Math.cos(angle) * moveDistance - buttonWidth / 2;
        let newY = buttonCenterY + Math.sin(angle) * moveDistance - buttonHeight / 2;
        
        // Keep within bounds
        const maxX = containerRect.width - buttonWidth;
        const maxY = containerRect.height - buttonHeight;
        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));
        
        setNoButtonPosition({ x: newX, y: newY });
      }
    }
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Move the button away when clicked - make it unclickable
    if (buttonContainerRef.current) {
      const container = buttonContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonWidth = 120;
      const buttonHeight = 50;
      const maxX = containerRect.width - buttonWidth;
      const maxY = containerRect.height - buttonHeight;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      setNoButtonPosition({ x, y });
    }
    return false;
  };

  const handleYesClick = () => {
    setStep(2);
  };

  const handleOfCourseClick = () => {
    setStep(3);
  };

  const handleProceedPayment = () => {
    setShowPaymentOptions(true);
  };

  const handleKissClick = () => {
    const newCount = kissCount + 1;
    setKissCount(newCount);
    
    // Create a new kiss emoji at random position
    const newKiss = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100
    };
    setKissEmojis([...kissEmojis, newKiss]);
    
    // Remove the kiss emoji after animation
    setTimeout(() => {
      setKissEmojis(prev => prev.filter(kiss => kiss.id !== newKiss.id));
    }, 1000);
    
    if (newCount >= 10) {
      setShowKissToast(true);
      setTimeout(() => setShowKissToast(false), 5000);
    }
  };

  const handleInKindClick = () => {
    setShowInKindToast(true);
    setTimeout(() => setShowInKindToast(false), 5000);
  };

  const handleKidsEmojiClick = () => {
    setShowKidsInput(true);
  };

  const handleKidsInputChange = (e) => {
    const value = e.target.value;
    setKidsInput(value);
    // Reset error state when user types, but keep correct names found
    if (kidsInputSubmitted) {
      setKidsInputSubmitted(false);
      setKidsInputError("");
      setKidsInputValid(false);
    }
  };

  const handleKidsInputSubmit = () => {
    if (!kidsInput.trim()) {
      return;
    }
    
    setKidsInputSubmitted(true);
    
    const validNames = ["crabby", "chompy", "bumpy"];
    // Split by comma, space, or both, and trim each name
    const enteredNames = kidsInput.split(/[,\s]+/).map(name => name.trim()).filter(name => name.length > 0);
    
    // Check which valid names are present (case-insensitive)
    const enteredLower = enteredNames.map(n => n.toLowerCase());
    const validLower = validNames.map(n => n.toLowerCase());
    
    // Find which correct names have been entered in this submission
    const newlyFound = [];
    validNames.forEach((validName, index) => {
      if (enteredLower.includes(validLower[index])) {
        newlyFound.push(validName);
      }
    });
    
    // Merge with previously found names (persist correct names)
    const updatedFound = [...new Set([...correctNamesFound, ...newlyFound])];
    setCorrectNamesFound(updatedFound);
    
    // Check if all 3 valid names are present in current input
    const allPresent = validLower.every(valid => enteredLower.includes(valid));
    const allCorrect = enteredNames.length >= 3 && allPresent;
    
    // Check if there are any invalid names (names that aren't in the valid list)
    const hasInvalidNames = enteredNames.some(name => 
      !validLower.includes(name.toLowerCase())
    );
    
    // Check if all 3 names have been found across all submissions
    const allThreeFound = updatedFound.length === 3;
    
    // Only show error if there are invalid names, not if some correct names are found
    if (hasInvalidNames) {
      setKidsInputError("did you seriously get our kid's name wrong?");
      setKidsInputValid(false);
    } else if (allThreeFound) {
      // All 3 names have been found (across all submissions)
      setKidsInputError("");
      setKidsInputValid(true);
      // Navigate to congratulations page after a short delay
      setTimeout(() => {
        setStep(4);
      }, 1000);
    } else {
      // Some correct names found, no error
      setKidsInputError("");
      setKidsInputValid(false);
    }
    
    // Clear input after submission
    setKidsInput("");
  };

  const handleKidsInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleKidsInputSubmit();
    }
  };

  const renderStep1 = () => (
    <>
      <h1 className="valentines-title mb-5">Will you be my valentine? 💕</h1>
      <div className="button-container" ref={buttonContainerRef}>
        <button 
          className="yes-button"
          onClick={handleYesClick}
        >
          Yes! 💖
        </button>
        <button
          className="no-button"
          onMouseMove={handleNoHover}
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          onMouseDown={(e) => {
            e.preventDefault();
            handleNoClick(e);
          }}
          style={{
            position: "absolute",
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transition: "all 0.2s ease",
            cursor: "not-allowed"
          }}
        >
          No 😢
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h1 className="valentines-title mb-5">
        Ok I get that you are excited to have this opportunity but Are you really sure you want to be my valentine?
      </h1>
      <button 
        className="ofcourse-button"
        onClick={handleOfCourseClick}
      >
        OFCOURSE
      </button>
    </>
  );

  const renderStep3 = () => (
    <>
      <h1 className="valentines-title mb-3">
        seems like I gave you enough chances to back out...
      </h1>
      <h2 className="valentines-subtitle mb-5">
        So to seal the deal, I need you to pay up to confirm your slot with me for this year
      </h2>
      
      {!showPaymentOptions ? (
        <button 
          className="proceed-button"
          onClick={handleProceedPayment}
        >
          proceed with payment
        </button>
      ) : (
        <div className="payment-options">
          <button 
            className="payment-button"
            onClick={handleKissClick}
          >
            with kisses
          </button>
          <button 
            className="payment-button"
            onClick={handleInKindClick}
          >
            in kind
          </button>
          <button 
            className="payment-button"
            onClick={handleKidsEmojiClick}
          >
            🧑‍🧑‍🧒
          </button>
          
          {showKidsInput && (
            <div className="kids-input-container">
              <div className="kids-input-wrapper">
                <input
                  type="text"
                  className={`kids-input ${kidsInputSubmitted && kidsInputValid ? 'valid' : ''} ${correctNamesFound.length > 0 ? 'has-correct' : ''} ${kidsInputSubmitted && kidsInputError ? 'error' : ''}`}
                  value={kidsInput}
                  onChange={handleKidsInputChange}
                  onKeyPress={handleKidsInputKeyPress}
                  placeholder="Enter names..."
                />
                <button 
                  className="kids-submit-button"
                  onClick={handleKidsInputSubmit}
                >
                  Enter
                </button>
              </div>
              <p className="kids-subtitle">Aniket and Ino have 3 kids , please name them</p>
              {correctNamesFound.length > 0 && (
                <div className="correct-names-list">
                  {correctNamesFound.map((name, index) => (
                    <p key={index} className="correct-name-item">
                      ✓ {name}
                    </p>
                  ))}
                </div>
              )}
              {kidsInputSubmitted && kidsInputError && (
                <p className="helper-text error-text">{kidsInputError}</p>
              )}
              {kidsInputSubmitted && kidsInputValid && (
                <p className="helper-text valid-text">good mom</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );

  const renderStep4 = () => (
    <div className="congratulations-message">
      <h1 className="valentines-title mb-4">
        congratulationss and thankyou for choosing me as your valentine shona
      </h1>
      <Link to="/">
        <button className="home-button">
          Back to Home
        </button>
      </Link>
    </div>
  );

  return (
    <HelmetProvider>
      <Container className="valentines-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Valentine's 2026 | {meta.title}</title>
          <meta name="description" content="Will you be my valentine?" />
        </Helmet>
        
        <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <Col lg="8" className="text-center">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            
            {kissEmojis.map((kiss) => (
              <div
                key={kiss.id}
                className="confetti"
                style={{
                  left: `${kiss.x}%`,
                  top: `${kiss.y}%`,
                }}
              >
                😘
              </div>
            ))}
            
            {showKissToast && (
              <div className="toast-message">
                Your kissies have been recieved and are deeply appreciated but seems like payment is still incomplete. Kindly try another form of payment
              </div>
            )}
            
            {showInKindToast && (
              <div className="toast-message">
                sorry this payment method is only possible when you are in the same room as Aniket
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
