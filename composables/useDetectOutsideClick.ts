import {onBeforeUnmount, onMounted} from 'vue'

/**
 * Function which detect click outside the component
 * @param {Component} component - Reference on component
 * @param {void} callback - Callback function
 */
export default function useDetectOutsideClick(component: any, callback: any) {
    if (!component) return
    const listener = (event: MouseEvent) => {
        if (event.target !== component.value && event.composedPath().includes(component.value)) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeUnmount(() => {window.removeEventListener('click', listener)})

    return {listener}
}