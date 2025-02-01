import type IUserMenuItem from "~/types/usermenu/UserMenuItem";

import PersonalIcon from '~/assets/svg/personal.svg';
import GearIcon from '~/assets/svg/gear.svg';
import CartIcon from '~/assets/svg/cart.svg';
import PackagingIcon from '~/assets/svg/packaging.svg';
import DoorIcon from '~/assets/svg/door.svg';

export let UserMenuItems : Array<IUserMenuItem> = [
    {
        icon: PersonalIcon,
        label: "Личный кабинет",
        route: "/cabinet"
    } as IUserMenuItem,
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
    } as IUserMenuItem,
    {
        icon: DoorIcon,
        label: "Выйти",
        route: "/logout",
        color: "tomato-primary",
        hoverColor: "tomato-secondary"
    } as IUserMenuItem,
]