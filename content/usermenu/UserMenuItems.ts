import type IUserMenuItem from "~/types/usermenu/UserMenuItem";

import PersonalIcon from '~/assets/svg/personal.svg';
import GearIcon from '~/assets/svg/gear.svg';
import CartIcon from '~/assets/svg/cart.svg';
import PackagingIcon from '~/assets/svg/packaging.svg';

export let UserMenuItems : Array<IUserMenuItem> = [
    {
        icon: PackagingIcon,
        label: "Мои заказы",
        route: "/orders"
    } as IUserMenuItem,
    {
        icon: CartIcon,
        label: "Корзина",
        route: "/cart"
    } as IUserMenuItem,
    {
        icon: GearIcon,
        label: "Настройки",
        route: "/settings"
    } as IUserMenuItem
]