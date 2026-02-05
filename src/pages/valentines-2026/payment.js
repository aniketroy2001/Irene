import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { meta } from "../../content_option";

export const ValentinesPayment = () => {
  const navigate = useNavigate();
  const [kissEmojis, setKissEmojis] = useState([]);
  const [kissCount, setKissCount] = useState(0);
  const [showKissToast, setShowKissToast] = useState(false);
  const [showInKindToast, setShowInKindToast] = useState(false);
  const [showKidsInput, setShowKidsInput] = useState(false);
  const [kidsInput, setKidsInput] = useState("");
  const [kidsInputError, setKidsInputError] = useState("");
  const [kidsInputValid, setKidsInputValid] = useState(false);
  const [kidsInputSubmitted, setKidsInputSubmitted] = useState(false);
  const [correctNamesFound, setCorrectNamesFound] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleKissClick = () => {
    const newCount = kissCount + 1;
    setKissCount(newCount);

    const newKiss = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setKissEmojis([...kissEmojis, newKiss]);

    setTimeout(() => {
      setKissEmojis((prev) => prev.filter((kiss) => kiss.id !== newKiss.id));
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
    const enteredNames = kidsInput
      .split(/[,\s]+/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const enteredLower = enteredNames.map((n) => n.toLowerCase());
    const validLower = validNames.map((n) => n.toLowerCase());

    const newlyFound = [];
    validNames.forEach((validName, index) => {
      if (enteredLower.includes(validLower[index])) {
        newlyFound.push(validName);
      }
    });

    const updatedFound = [...new Set([...correctNamesFound, ...newlyFound])];
    setCorrectNamesFound(updatedFound);

    const hasInvalidNames = enteredNames.some(
      (name) => !validLower.includes(name.toLowerCase()),
    );

    const allThreeFound = updatedFound.length === 3;

    if (hasInvalidNames) {
      setKidsInputError("did you seriously get our kid's name wrong?");
      setKidsInputValid(false);
    } else if (allThreeFound) {
      setKidsInputError("");
      setKidsInputValid(true);
      setTimeout(() => {
        setShowCongrats(true);
      }, 1000);
    } else {
      setKidsInputError("");
      setKidsInputValid(false);
    }

    setKidsInput("");
  };

  const handleKidsInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleKidsInputSubmit();
    }
  };

  if (showCongrats) {
    return (
      <HelmetProvider>
        <Container className="valentines-page">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Payment Complete | {meta.title}</title>
          </Helmet>
          <Row
            className="justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <Col lg="8" className="text-center">
              <div className="congratulations-message">
                <h1 className="valentines-title mb-4">
                  Congratulations your payment has been processed. Thankyou for
                  choosing me as your valentine shona, Looking forward to going
                  on a E-date with you this valentine where we eat out on
                  videocall - a food of your choice 🥰
                </h1>
                <button className="home-button" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Container className="valentines-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Aniket Pay | {meta.title}</title>
        </Helmet>

        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Col lg="8" className="text-center">
            <h1 className="valentines-title mb-3">💳 Aniket Pay</h1>
            <h2 className="valentines-subtitle mb-5">
              Choose your payment method
            </h2>

            <div className="payment-options">
              <button className="payment-button" onClick={handleKissClick}>
                with kisses 😘
              </button>
              <button className="payment-button" onClick={handleInKindClick}>
                in kind
              </button>
              <button className="payment-button" onClick={handleKidsEmojiClick}>
                🧑‍🧑‍🧒
              </button>

              {showKidsInput && (
                <div className="kids-input-container">
                  <p className="auth-required-text">
                    🔐 authentication is required for this payment mode
                  </p>
                  <div className="kids-input-wrapper">
                    <input
                      type="text"
                      className={`kids-input ${kidsInputSubmitted && kidsInputValid ? "valid" : ""} ${correctNamesFound.length > 0 ? "has-correct" : ""} ${kidsInputSubmitted && kidsInputError ? "error" : ""}`}
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
                  <p className="kids-subtitle">
                    Aniket and Ino have 3 kids, please name them
                  </p>
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
                Your kissies have been recieved and are deeply appreciated but
                seems like payment is still incomplete. Kindly try another form
                of payment
              </div>
            )}

            {showInKindToast && (
              <div className="toast-message">
                sorry this payment method is only possible when you are in the
                same room as Aniket
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
