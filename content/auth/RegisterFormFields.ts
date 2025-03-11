import type IFormElement from "~/types/form/FormField";
import { FieldType } from "../../types/form/FormField";

import { i18n } from "~/plugins/i18n";
const { t } = i18n.global;

export const RegisterFormFields : Array<IFormElement> = [
    {
        name: "username",
        placeholder: t("auth.fields.login"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "email",
        placeholder: t("auth.fields.email"),
        type: FieldType.InputEmail
    } as IFormElement,
    {
        name: "password",
        placeholder: t("auth.fields.password"),
        type: FieldType.InputPassword
    } as IFormElement,
    {
        placeholder: t("auth.buttons.register"),
        type: FieldType.Button
    } as IFormElement,
    {
        placeholder: t("auth.message.login"),
        type: FieldType.Link,
        route: "/auth"
    } as IFormElement
];

export interface RegisterSubmitData {
    username: string,
    email: string,
    password: string
}

export interface RegisterResponse {
    createdAt?: string
}