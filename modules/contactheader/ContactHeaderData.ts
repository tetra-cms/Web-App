import type ContactData from "./ContactData";

export let CurrentCity : String = "Тольятти";

export let ContactGeneral : String = "als-2008@mail.ru";
export let ContactsList : Array<ContactData> = [
    {
        contact: "+79272683737",
        type: "phone"
    } as ContactData,
    {
        contact: "+78482695616",
        type: "phone"
    } as ContactData,
];