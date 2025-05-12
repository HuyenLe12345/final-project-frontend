import "./card.css";
const Card = ({ children, formName, formTitle, errorMessage }) => {
  return (
    <div className={`container-md  card ${formName}`}>
      <h5>{formTitle}</h5>
      {errorMessage && (
        <p style={{ color: "red", fontSize: "12px" }}>*{errorMessage}</p>
      )}
      {children}
    </div>
  );
};
export default Card;
