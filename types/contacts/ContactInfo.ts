export interface ContactInfo {
    phone?: string,
    email?: string,

    companyName?: string,
    companyAddress?: string,
    itn?: number,
    psnsp?: number,

    coords?: {
        lat?: number,
        lon?: number
    }
};