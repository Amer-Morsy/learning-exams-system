export const isValidUserNameAr = (text) => {
  const ARABIC_USERNAME_PATTERN = /^[\u0621-\u064A\s]{3,400}$/gi;
  return ARABIC_USERNAME_PATTERN.test(text.trim());
};
export const isValidUserNameEn = (text) => {
  const ENGLISH_USERNAME_PATTERN = /^[a-z\s]{3,400}$/gi;
  return ENGLISH_USERNAME_PATTERN.test(text.trim());
};

export const isValidNameAr = (text) => {
  const ARABIC_NAME_PATTERN = /^[\u0621-\u064A\u0660-\u0669\0-9\s-.،@&_/(){}'"\r\n]{1,1000000}$/gi;
  return ARABIC_NAME_PATTERN.test(text.trim());
};
export const isValidNameEn = (text) => {
  const ENGLISH_NAME_PATTERN = /^[a-z\d\s-.,@&_/(){}'"\r\n]{1,1000000}$/gi;
  return ENGLISH_NAME_PATTERN.test(text.trim());
};

export const isValidTextAr = (text) => {
  // const ARABIC_TEXT_PATTERN = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|\d|\s)*$/gi;
  const ARABIC_TEXT_PATTERN = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|\d|\s|[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])*$/gi;

  return ARABIC_TEXT_PATTERN.test(text.trim());
};
export const isValidTextEn = (text) => {
  const ENGLISH_TEXT_PATTERN = /^[a-z\d\s!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]*$/gi;

  return ENGLISH_TEXT_PATTERN.test(text.trim());
};

export const isValidEmail = (text) => {
  const EMAIL_PATTERN = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gi;
  return EMAIL_PATTERN.test(text.trim());
};
export const isValidPassword = (text) => {
  // Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
  const PASSWORD_PATTERN = /(?=(.*[0-9]))(?=.*[\\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

  return PASSWORD_PATTERN.test(text.trim());
};

export const isValidInteger = (text) => {
  const INTGER_PATTERN = /^\d+$/gi;
  return INTGER_PATTERN.test(text.trim());
};
export const isValidFloat = (text) => {
  const FLOAT_PATTERN = /^[+-]?\d+(\.\d+)?$/gi;
  return FLOAT_PATTERN.test(text.trim());
};

export const isValidEgyptianNationalID = (text) => {
  const EGYPT_ID_PATTERN = /(1|2|3)[0-9][0-9][0-1][0-9][0-3][0-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/;
  return EGYPT_ID_PATTERN.test(text.trim());
};

//#region Top 15 Commonly Used Regex
