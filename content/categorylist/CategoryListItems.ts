import type { IItemListItem } from "~/types/ItemListItem";

import PaperrollIcon from '~/assets/svg/categories/paperroll.svg';
import NapkinsIcon from '~/assets/svg/categories/napkins.svg';
import PaperTowelsIcon from '~/assets/svg/categories/papertowels.svg';
import ChemistryIcon from '~/assets/svg/categories/chemistry.svg';
import SpongesIcon from '~/assets/svg/categories/sponge.svg';
import PacketIcon from '~/assets/svg/categories/packets.svg';
import GlovesIcon from '~/assets/svg/categories/gloves.svg';
import PlasticIcon from '~/assets/svg/categories/plastic.svg';
import DishesIcon from '~/assets/svg/categories/dishes.svg';

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
        icon: ChemistryIcon,
        label: "Бытовая химия"
    } as IItemListItem,
    {
        icon: SpongesIcon,
        label: "Губки"
    } as IItemListItem,
    {
        icon: PacketIcon,
        label: "Пакеты"
    } as IItemListItem,
    {
        icon: GlovesIcon,
        label: "Перчатки"
    } as IItemListItem,
    {
        icon: PlasticIcon,
        label: "Пластик"
    } as IItemListItem,
    {
        icon: DishesIcon,
        label: "Одноразовая посуда"
    } as IItemListItem
];