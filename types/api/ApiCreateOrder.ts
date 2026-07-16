import type ApiOrderPosition from "./ApiOrderPosition";

export interface ApiCreateOrder {
    client_id: number;
    payment_type: string;
    delivery_type: string;
    comment?: string;
    positions: ApiOrderPosition[];
}