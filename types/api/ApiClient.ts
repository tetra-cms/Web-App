export default interface ApiClient {
    id: number;
    fcs: string;
    city: string;
    address: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}