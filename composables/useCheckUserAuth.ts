/**
 * Special check for user status
 * @returns User status - authorized or not
 */
export default function useCheckUserAuth() {
    return localStorage.getItem("user_credentials") ? true : false;
}