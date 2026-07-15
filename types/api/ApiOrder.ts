import type ApiClientInfo from "./ApiClientInfo";
import type ApiOrderPosition from "./ApiOrderPosition";
import type ApiUserInfo from "./ApiUserInfo";

export default interface ApiOrder {
    id?: number;
    user_id?: number;
    client_id: number;
    comment?: string;
    status?: string;
    total_quantity?: number;
    total_price?: number;
    created_at?: string;
    updated_at?: string;
    user?: ApiUserInfo;
    client?: ApiClientInfo;
    positions: ApiOrderPosition[];
}