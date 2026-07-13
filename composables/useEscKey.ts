export function useEscKey(
    callback: () => void
) {
    const handeKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            callback();
        }
    }

    onMounted(() => {
        document.addEventListener("keydown", handeKeyDown);
    });

    onUnmounted(() => {
        document.removeEventListener("keydown", handeKeyDown);
    });
}