import type ICompanyInfo from "~/types/CompanyInfo";
import type IMenuItem from "~/types/MenuItem";

export let CompanyData : ICompanyInfo = {
    title: "Феникс",
    subtitle: "Бумажная компания"
} as ICompanyInfo;

export let MenuItems : Array<IMenuItem> = [
    {
        label: "Наша продукция",
        route: "catalog"
    } as IMenuItem,
    {
        label: "Наша продукция",
        route: "catalog"
    } as IMenuItem,
    {
        label: "Наша продукция",
        route: "catalog"
    } as IMenuItem,
    {
        label: "Наша продукция",
        route: "catalog"
    } as IMenuItem,
    {
        label: "Наша продукция",
        route: "catalog"
    } as IMenuItem,
    
];