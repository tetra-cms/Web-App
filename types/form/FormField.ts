import type IFormElementListItem from "./IFormElementListItem"

export enum FieldType {
    Hidden,
    Input,
    TextArea,
    InputPassword,
    InputEmail,
    Link, 
    CustomComponent,
    Button,
    List,
    Checkbox
}

export default interface IFormElement {
    name: string;
    placeholder?: string;
    type: FieldType;
    default?: string;
    listItems?: Array<IFormElementListItem>;
    route?: string;
    required?: boolean;

    class?: string

    component?: Component
    
    checked?: boolean;
}