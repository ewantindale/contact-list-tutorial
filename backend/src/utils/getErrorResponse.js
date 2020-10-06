const getErrorResponse = (error) => {
  if (error.code === "23505") {
    if (error.detail.includes("name")) {
      return { field: "name", error: "This name is already in use" };
    } else if (error.detail.includes("email")) {
      return { field: "email", error: "This email address is already in use" };
    } else if (error.detail.includes("phone")) {
      return { field: "phone", error: "This phone number is already in use" };
    }
  }
};

module.exports = getErrorResponse;
