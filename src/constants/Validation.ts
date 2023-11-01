/* eslint-disable */
export const REGEX_CONSTANTS = {
    REGEX_PASSWORD: /^[a-zA-Z0-9!#$%&()*+,.:;=?@^_]+$/,
    REGEX_EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    REGEX_NUMBER: /^\d+$/,
    REGEX_NUMBER_AND_DECIMAL: /^[1-9]\d*(\.\d+)?$/,
    REGEX_PHONE_NUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    REGEX_SPECIAL_CHARACTERS: /^[_a-zA-Z0-9\s\d]*$/,
    REGEX_NO_NUMBER: /^[^\d]*$/,
    REGEX_NAME: /^[a-zA-Z0-9().,&:;@_ -]+$/,
    REGEX_NAME_FILE: /\.xlsx$/
};
