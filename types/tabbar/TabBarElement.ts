import type { DefineComponent } from "vue";

export interface TabBarElement {
    icon: DefineComponent,
    label: string,
    route: string
}