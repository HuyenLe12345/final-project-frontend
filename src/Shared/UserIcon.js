const UserIcon = ({ username, avatar, href }) => {
  const firstLetter = username ? username.split("")[0].toUpperCase() : null;

  return (
    <div className={`avatar-nav ${!avatar ? "user-icon" : ""}`}>
      {avatar ? (
        <img src={`http://localhost:8080/${avatar}`} />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>
  );
};
export default UserIcon;
