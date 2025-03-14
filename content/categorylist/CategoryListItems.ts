import type { IItemListItem } from "~/types/ItemListItem";


export const CategoryListItems : Array<IItemListItem> = [
    {
        icon: 'categories-squares',
        label: "Все товары",
        route: ""
    } as IItemListItem,
    {
        icon: 'categories-gloves',
        label: "Перчатки",
        route: "?category=1"
    } as IItemListItem
];