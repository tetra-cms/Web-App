export default interface ApiOrderPosition {
    id?: number;
    order_id?: number;
    product_id: number;
    quantity: number;
    price?: number;
    total_price?: number;
}