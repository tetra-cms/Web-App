export default function useRedirectUnauthorized() {
    const accessToken = useCookie("access_token");
    if (accessToken.value)
    {
        navigateTo("/")
    }
}