/**
 * Special check for user status
 * @returns User status - authorized or not
 */
export default function useCheckUserAuth() {
    return useCookie("access_token").value ? true : false;
}