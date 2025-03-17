/**
 * Composable for redirecting unauthorized users from pages to the authorization
 */
export default function useRedirectUnauthorized() {
    const accessToken = useCookie("access_token");
    if (accessToken && accessToken.value?.length)
    {
        navigateTo("/auth")
    }
}