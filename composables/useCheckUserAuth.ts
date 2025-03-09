export default function useCheckUserAuth() {
    const accessToken = useCookie("access_token");
    if (accessToken.value)
    {
        navigateTo("/")
    }
}