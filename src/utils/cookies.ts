// third party
import CryptoJS from 'crypto-js';

// PRIVATE KEY
export const privateKey = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_PRIVATE_KEY_HASH_LOGIN as string);
export const initializationVector = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_INITIALIZATION_VECTOR as string);

// Cookies
namespace COOKIES_KEY {
    export const USERNAME = 'username';
    export const PASSWORD = 'password';
    export const TOKEN = 'token';
    export const EXPIRES = 'expires';
    export const USERINFO = 'user_info';
    export const ROLES = 'roles';
}
export default COOKIES_KEY;

// EQUAL
const EQUAL = '=';

// Persistent cookies
const expirationDate = new Date();
expirationDate.setFullYear(expirationDate.getFullYear() + 1);
const expirationDateValue = '; path=/; expires=' + expirationDate.toUTCString();

// Config mode crypto-js
const configMode = {
    iv: initializationVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
};

/**
 * Encryption
 * @param {string} text The string to be encrypted
 * @return {string} encrypted string
 */
export function encryptByAES(text: string): string {
    let cipher = CryptoJS.AES.encrypt(text, privateKey, configMode);
    return cipher.toString();
}

/**
 * Decrypt
 * @param {string} cipherText ciphertext
 * @return {string} Decrypted string
 */
export function decryptByAES(cipherText: string): string {
    let cipher = CryptoJS.AES.decrypt(cipherText, privateKey, configMode);
    return cipher.toString(CryptoJS.enc.Utf8);
}

/**
 * Get cookie by key
 * @param name
 * @returns
 */
export function getCookieByKey(name: string): string {
    const cookie: any = {};
    document.cookie.split(';').forEach(function (el) {
        const [k, v] = el.split('=');
        cookie[k.trim()] = v;
    });
    return cookie[name];
}

/**
 * Delete cookie by key
 * @param name
 */
export function deleteCookieByKey(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
}

// Clear all cookies
export function clearAllCookies() {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf(EQUAL);
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
    }
}

/**
 * Set cookies when user login
 * @param value
 */
export function setLoginCookies(value: any) {
    const { userInfo } = value;
    // Encrypt username, password, expires when setCookies
    document.cookie = COOKIES_KEY.USERINFO + EQUAL + JSON.stringify(userInfo) + expirationDateValue;
}

/**
 * setCookieByKeyObject
 * @param obj
 */
export function setCookieByKeyObject(obj: any) {
    Object.keys(obj).forEach((key) => {
        document.cookie = key + EQUAL + obj[key] + expirationDateValue;
    });
}

// Get userInfo cookies
export function getUserInfoCookies(): any {
    const userInfoCookies = getCookieByKey(COOKIES_KEY.USERINFO);
    if (!userInfoCookies) return;
    const userInfo = JSON.parse(userInfoCookies);
    return userInfo;
}
