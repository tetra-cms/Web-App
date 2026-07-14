import type IFormElementListItem from "./IFormElementListItem"

export enum FieldType {
    Hidden,
    Input,
    TextArea,
    InputPassword,
    InputEmail,
    Link, 
    Button,
    List
}

export default interface IFormElement {
    name: string,
    placeholder: string,
    type: FieldType,
    default?: string,
    listItems?: Array<IFormElementListItem>
    route?: string
}