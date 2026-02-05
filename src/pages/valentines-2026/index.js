import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { meta } from "../../content_option";

export const Valentines2026 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: initial, 2: confirmation, 3: payment intro, 4: congratulations
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 200, y: 100 });
  const [isLoading, setIsLoading] = useState(false);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    if (buttonContainerRef.current && step === 1) {
      const container = buttonContainerRef.current;
      const rect = container.getBoundingClientRect();
      setNoButtonPosition({
        x: rect.width / 2 + 150,
        y: 0,
      });
    }
  }, [step]);

  const handleNoHover = (e) => {
    if (buttonContainerRef.current) {
      const container = buttonContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      const buttonWidth = 120;
      const buttonHeight = 50;
      const buttonCenterX = noButtonPosition.x + buttonWidth / 2;
      const buttonCenterY = noButtonPosition.y + buttonHeight / 2;
      const dx = buttonCenterX - mouseX;
      const dy = buttonCenterY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = 150;
        let newX =
          buttonCenterX + Math.cos(angle) * moveDistance - buttonWidth / 2;
        let newY =
          buttonCenterY + Math.sin(angle) * moveDistance - buttonHeight / 2;
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
    setIsLoading(true);
    setTimeout(() => {
      navigate("/valentines-2026/payment");
    }, 2500);
  };

  const renderStep1 = () => (
    <>
      <h1 className="valentines-title mb-5">Will you be my valentine? 💕</h1>
      <div className="button-container" ref={buttonContainerRef}>
        <button className="yes-button" onClick={handleYesClick}>
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
            cursor: "not-allowed",
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
        Ok I get that you are excited to have this opportunity but Are you
        really sure you want to be my valentine?
      </h1>
      <button className="ofcourse-button" onClick={handleOfCourseClick}>
        OFCOURSE
      </button>
    </>
  );

  const renderLoading = () => (
    <div className="fullpage-loader">
      <div className="loader-content">
        <div className="loader-logo">💳</div>
        <h1 className="loader-title">Aniket Pay</h1>
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
        <p className="loader-subtitle">Processing your love...</p>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (isLoading) {
      return renderLoading();
    }

    return (
      <>
        <h1 className="valentines-title mb-3">
          seems like I gave you enough chances to back out...
        </h1>
        <h2 className="valentines-subtitle mb-5">
          So to seal the deal, I need you to pay up to confirm your slot with me
          for this year
        </h2>
        <button className="proceed-button" onClick={handleProceedPayment}>
          proceed with payment
        </button>
      </>
    );
  };

  const renderStep4 = () => (
    <div className="congratulations-message">
      <h1 className="valentines-title mb-4">
        Congratulations your payment has been processed. Thankyou for choosing
        me as your valentine shona, Looking forward to going on a E-date with
        you this valentine where we eat out on videocall - a food of your choice
        🥰
      </h1>
      <Link to="/">
        <button className="home-button">Back to Home</button>
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

        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Col lg="8" className="text-center">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
