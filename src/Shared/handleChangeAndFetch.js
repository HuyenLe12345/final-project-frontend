export const fetchProvinces = async (
  fetchFunction,
  defaultLabel,
  updateFunction
) => {
  console.log("this is fetchProvinces");

  const response = await fetchFunction();
  if (response.success === true) {
    // Xử lý dữ liệu trả về

    response.data.unshift({
      id: String(Math.random()),
      value: "",
      label: defaultLabel,
    });
    updateFunction(response.data);
  }
};
export const fetchDistrictWard = async (
  fetchFunction,
  dataToSend,
  defaultLabel,
  updateFunction
) => {
  const response = await fetchFunction(dataToSend);
  if (response.success === true) {
    // Xử lý dữ liệu trả về
    response.data.unshift({
      id: String(Math.random()),
      value: "",
      label: defaultLabel,
    });
    updateFunction(response.data);
  }
};
export const handleChangeAndFetch = async (
  e,
  defaultLabel,
  currentOption,
  setCurrentOption,
  fetchFunction,
  dataToSend,
  updateFunction
) => {
  const selectedValue = e.target.value;
  if (selectedValue !== currentOption) {
    setCurrentOption(selectedValue);
    try {
      fetchDistrictWard(
        fetchFunction,
        dataToSend,
        defaultLabel,
        updateFunction
      );
    } catch (error) {
      console.error(error);
    }
  }
};
