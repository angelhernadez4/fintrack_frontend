import { spanishArticles } from './plural.function';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

const femaleExceptions: string[] = [
    'mano',
    'foto',
    'moto',
    'radio',
    'flor',
    'cruz',
    'luz',
    'paz',
    'razón',
];

const maleExceptions: string[] = ['día', 'mapa', 'planeta', 'lápiz', 'pez'];

export const getGender = (text: string): Gender | undefined => {
    const words: string[] = text.toLowerCase().split(' ');

    const filteredWords = words.filter((word) => !spanishArticles.includes(word));

    if (filteredWords.length === 0) {
        return undefined;
    }

    const mainWord = filteredWords[0];

    if (femaleExceptions.includes(mainWord)) return Gender.FEMALE;

    if (maleExceptions.includes(mainWord)) return Gender.MALE;

    if (mainWord.endsWith('a')) return Gender.FEMALE;

    if (mainWord.endsWith('o')) return Gender.MALE;

    if (mainWord.endsWith('ión')) return Gender.FEMALE;

    if (mainWord.endsWith('or')) return Gender.MALE;

    if (mainWord.endsWith('dad') || mainWord.endsWith('tad')) return Gender.FEMALE;

    if (mainWord.endsWith('e')) return Gender.MALE;

    if (mainWord.endsWith('ma')) return Gender.MALE;

    return Gender.MALE;
};
