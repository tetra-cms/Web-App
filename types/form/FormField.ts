export enum FieldType {
    Input,
    InputPassword,
    InputEmail,
    Link, 
    Button
}

export default interface IFormElement {
    placeholder: string,
    type: FieldType,
    route?: string
}