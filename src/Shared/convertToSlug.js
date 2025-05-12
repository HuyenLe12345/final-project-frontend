function convertToSlug(text) {
  if (text) {
    return text
      .toLowerCase()
      .replace("quỹ", "quy")
      .replace(/\s+/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  } else {
    return "";
  }
}
export default convertToSlug;
