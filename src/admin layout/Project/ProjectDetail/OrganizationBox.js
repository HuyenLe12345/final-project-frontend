const OrganizationBox = ({ name, summary, address, email, phone, website }) => {
  return (
    <div className="bg-white border border-success rounded p-3">
      <h6 style={{ textAlign: "center" }}>{name}</h6>
      <p className="text-secondary">
        <q>{summary}</q>
      </p>
      <p className="text-secondary">
        Website:{" "}
        <a href={website} target="_blank">
          {website}
        </a>
      </p>
      <p className="text-secondary">
        Địa chỉ: <i>{address}</i>
      </p>
      <p className="text-secondary">
        Email: {""}
        <i>{email}</i>
      </p>
      <p className="text-secondary">
        Hotline: <i>{phone}</i>
      </p>
    </div>
  );
};
export default OrganizationBox;
