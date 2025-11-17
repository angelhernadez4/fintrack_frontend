export const spanishArticles: string[] = [
    'de',
    'el',
    'la',
    'los',
    'las',
    'un',
    'una',
    'unos',
    'unas',
];

export const pluralize = (text: string): string => {
    const lowerWord: string = text.toLowerCase();
    const words: string[] = lowerWord.split(' ');

    if (words.length > 1) {
        const hasArticle = spanishArticles.find((art) => words.includes(art));

        if (!hasArticle) {
            return pluralizePhrase(lowerWord);
        }

        words[0] = pluralizeWord(words[0]);
    }

    return words.join(' ');
};

const pluralizeWord = (rawWord: string): string => {
    const word: string = rawWord.toLowerCase();

    if (word === 'régimen') return `regímenes`;

    if (word.endsWith('ón')) return `${word.slice(0, -2)}ones`;

    if (word.endsWith('ción')) return `${word.slice(0, -3)}iones`;

    if (word.endsWith('z')) return `${word.slice(0, -1)}ces`;

    if (word.endsWith('s') || word.endsWith('x')) return word;

    if (word.endsWith('í') || word.endsWith('ú')) return `${word}es`;

    if (word.endsWith('a') || word.endsWith('e') || word.endsWith('o')) return `${word}s`;

    if (word.endsWith('y')) return `${word.slice(0, -1)}yes`;

    return `${word}es`;
};

const pluralizePhrase = (phrase: string): string => {
    const words: string[] = phrase.split(' ');

    const pluralizedWords = words.map((word) =>
        spanishArticles.includes(word) ? word : pluralizeWord(word)
    );

    return pluralizedWords.join(' ');
};
