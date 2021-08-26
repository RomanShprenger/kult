import { useState, useEffect, useRef } from "react";

const ArtworkNewTitle = ({ step, title, subtitle }) => {
  const [bordered, setBordered] = useState(false);
  const titleRef = useRef();

  const listener = () => {
    if (titleRef.current.getBoundingClientRect().top === 0) {
      setBordered(true);
    } else {
      setBordered(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return (
    <div className={`artwork-new__title ${bordered ? 'artwork-new__title--bordered' : ''}`} ref={titleRef}>
      <div className="artwork-new__step-container">
        <div className="artwork-new__title-subtitle">{subtitle}</div>
        <span className="artwork-new__title-step">{step}.</span>{title}
      </div>
    </div>
  )
}

export default ArtworkNewTitle;
