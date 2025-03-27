export default function useClearSession()
{
    const accessToken = useCookie("access_token");
    accessToken.value = null;
    navigateTo("/");

    location.reload();
}