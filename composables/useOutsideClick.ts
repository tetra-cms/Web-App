import { onMounted, onUnmounted, type Ref } from 'vue'

export function useOutsideClick(
    elementRef: Ref<HTMLElement | null>,
    callback: (event: MouseEvent | TouchEvent) => void
) {
    const handleClick = (event: MouseEvent | TouchEvent) => {
        if (!elementRef.value) return;

        const target = event.target as Node;
        if (!elementRef.value.contains(target)) {
            callback(event);
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('touchstart', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('touchstart', handleClick);
    });
}