import React from "react";
const ProjectContent = React.memo(({ title, content }) => {
  const contentArr = content.split("\n");
  console.log(contentArr);
  console.log(content);
  return (
    <>
      <h4
        style={{
          textAlign: "justify",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {title}
      </h4>
      <div
        style={{
          color: "gray",
          fontSize: "17px",
          textAlign: "justify",
          padding: "30px",
        }}
      >
        {contentArr &&
          contentArr.map((con, index) => <p key={index}> {con}</p>)}
      </div>
    </>
  );
});
export default ProjectContent;
