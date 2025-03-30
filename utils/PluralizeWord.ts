export function pluralizeWord(singularWord: string, pluralWord : string, count: number) { 
    return count > 1 ? pluralWord : singularWord; 
} 