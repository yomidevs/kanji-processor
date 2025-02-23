import { KanjiMapping } from './types';
import mappingList from './full_list.json';
import itaijiList from './itaiji_list.json';

class KanjiProcessor {
    private mappings: KanjiMapping[];
    private regex: RegExp;
    private conversionMap: Record<string, string>;

    constructor() {
        this.mappings = mappingList as KanjiMapping[];

        const regexString = (itaijiList as string[]).join('');
        this.regex = new RegExp(`[${regexString}]`, 'g');

        this.conversionMap = {};
        for (const mapping of this.mappings) {
            for (const itaiji of mapping.itaiji) {
                this.conversionMap[itaiji] = mapping.oyaji;
            }
        }
    }

    public convertToParent(text: string): string {
        return text.replace(this.regex, match => this.conversionMap[match] || match);
    }
}

export const defaultProcessor = new KanjiProcessor();

export function convertVariants(text: string): string {
    return defaultProcessor.convertToParent(text);
}