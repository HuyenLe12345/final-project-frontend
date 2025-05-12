const UserIcon = ({ username, avatar, href }) => {
  const firstLetter = username ? username.split("")[0].toUpperCase() : null;

  return (
    <div className={`avatar-nav ${!avatar ? "user-icon" : ""}`}>
      {avatar ? (
        <img src={`https://final-project-backend-production-c0dc.up.railway.app/${avatar}`} />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>
  );
};
export default UserIcon;
