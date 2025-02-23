import type { TabBarElement } from "~/types/tabbar/TabBarElement";
import CartIcon from '~/assets/svg/cart.svg?skipsvgo';
import HouseIcon from '~/assets/svg/house.svg?skipsvgo';
import UserIcon from '~/assets/svg/person.svg?skipsvgo';

export const TabBarItems : Array<TabBarElement> = [
    {
        icon: HouseIcon,
        label: "Каталог",
        route: "/"
    },
    {
        icon: CartIcon,
        label: "Корзина",
        route: "/cart"
    },
    {
        icon: UserIcon,
        label: "Меню",
        route: "/menu"
    }
]