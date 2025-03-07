import type IFormElement from "~/types/form/FormField";
import { FieldType } from "../../types/form/FormField";

import { i18n } from "~/plugins/i18n";
const { t } = i18n.global;

export const AuthFormFields : Array<IFormElement> = [
    {
        placeholder: t("auth.fields.login"),
        type: FieldType.Input
    } as IFormElement,
    {
        placeholder: t("auth.fields.password"),
        type: FieldType.InputPassword
    } as IFormElement,
    {
        placeholder: t("auth.buttons.login"),
        type: FieldType.Button
    } as IFormElement,
    {
        placeholder: t("auth.message.register"),
        type: FieldType.Link,
        route: "/register"
    } as IFormElement
];