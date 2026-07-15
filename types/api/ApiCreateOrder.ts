import type ApiOrderPosition from "./ApiOrderPosition";

export interface ApiCreateOrder {
    client_id: number;
    comment?: string;
    positions: ApiOrderPosition[];
}