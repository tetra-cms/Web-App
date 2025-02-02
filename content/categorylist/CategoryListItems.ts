import type { IItemListItem } from "~/types/ItemListItem";

import PaperrollIcon from '~/assets/svg/categories/paperroll.svg';
import NapkinsIcon from '~/assets/svg/categories/napkins.svg';
import PaperTowelsIcon from '~/assets/svg/categories/papertowels.svg'

export const CategoryListItems : Array<IItemListItem> = [
    {
        icon: PaperrollIcon,
        label: "Туалетная бумага"
    } as IItemListItem,
    {
        icon: NapkinsIcon,
        label: "Салфетки"
    } as IItemListItem,
    {
        icon: PaperTowelsIcon,
        label: "Бумажные полотенца"
    } as IItemListItem,
    {
        icon: PaperrollIcon,
        label: "Туалетная бумага"
    } as IItemListItem,
    {
        icon: PaperrollIcon,
        label: "Туалетная бумага"
    } as IItemListItem,
    {
        icon: PaperrollIcon,
        label: "Туалетная бумага"
    } as IItemListItem,
];