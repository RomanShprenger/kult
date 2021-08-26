const ArtworkNewTitle = ({ step, title, subtitle }) => (
  <div className="artwork-new__title">
    <div className="artwork-new__title-subtitle">{subtitle}</div>
    <span className="artwork-new__title-step">{step}.</span>{title}
  </div>
)

export default ArtworkNewTitle;
