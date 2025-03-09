export default function useCheckUserAuth() {
    return useCookie("access_token").value ? true : false;
}