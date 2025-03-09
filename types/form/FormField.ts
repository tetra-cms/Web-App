export enum FieldType {
    Input,
    InputPassword,
    InputEmail,
    Link, 
    Button
}

export default interface IFormElement {
    name: string,
    placeholder: string,
    type: FieldType,
    route?: string
}