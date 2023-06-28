export const formatMobileNumber = (mobile) => {
  var cleaned = ("" + mobile).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};

export const showCustomName = (value) => {
  const firstNameCharacter = String(value?.firstName).charAt(0) || "A";
  const lastNameCharacter = String(value?.lastName).charAt(0) || "A";
  return `${firstNameCharacter}${lastNameCharacter}`;
};
