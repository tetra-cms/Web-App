export function formatPhoneNumber(rawNum: string): string {
    const formattedValue = `${rawNum.slice(0, 2)} (${rawNum.slice(2, 5)}) ${rawNum.slice(5, 8)}-${rawNum.slice(8, 10)}-${rawNum.slice(10, 12)}`;
    return formattedValue;
}