import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import en from '@/lang/en.json';
import ru from '@/lang/ru.json';
import uz from '@/lang/uz.json';

type TranslationData = typeof en;
type NestedKeyOf<T, Prefix extends string = ''> = T extends object
    ? {
          [K in keyof T & string]: T[K] extends object
              ? NestedKeyOf<T[K], `${Prefix}${K}.`>
              : `${Prefix}${K}`;
      }[keyof T & string]
    : never;

export type TranslationKey = NestedKeyOf<TranslationData>;

const translations: Record<string, TranslationData> = { en, ru, uz };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const keys = path.split('.');
    let current: unknown = obj;
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return path;
        }
    }
    return typeof current === 'string' ? current : path;
}

export function useTranslations() {
    const { locale } = usePage<PageProps>().props;
    const lang = translations[locale] || translations.en;

    function t(key: string, params?: Record<string, string | number>): string {
        let value = getNestedValue(lang as unknown as Record<string, unknown>, key);
        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                value = value.replace(`{${paramKey}}`, String(paramValue));
            });
        }
        return value;
    }

    return { t, locale };
}
