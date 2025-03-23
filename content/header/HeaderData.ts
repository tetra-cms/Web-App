import type ICompanyInfo from "~/types/CompanyInfo";
import type IMenuItem from "~/types/MenuItem";

export let CompanyData : ICompanyInfo = {
    title: "Феникс",
    subtitle: "Бумажная компания"
} as ICompanyInfo;

export let MenuItems : Array<IMenuItem> = [
    {
        label: "Наша продукция",
        route: "/"
    } as IMenuItem,
    {
        label: "Доставка и оплата",
        route: "/delivery"
    } as IMenuItem,
    {
        label: "О нас",
        route: "/aboutus"
    } as IMenuItem,
    {
        label: "Контакты",
        route: "/contacts"
    } as IMenuItem
];