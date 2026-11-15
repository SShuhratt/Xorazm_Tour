/**
 * Lightweight client-side automatic translation helper
 * Supports free instant translation with graceful fallback to source text.
 */
export async function autoTranslateText(
    text: string,
    targetLang: 'en' | 'ru' | 'uz',
    sourceLang: string = 'auto'
): Promise<string> {
    if (!text || !text.trim()) return '';

    try {
        const tl = targetLang === 'uz' ? 'uz' : targetLang === 'ru' ? 'ru' : 'en';
        const sl = sourceLang === 'auto' ? 'auto' : sourceLang === 'uz' ? 'uz' : sourceLang === 'ru' ? 'ru' : 'en';
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            return text;
        }
        const data = await response.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
            return (data[0] as Array<[string?]>).map((item) => item[0] || '').join('');
        }
        return text;
    } catch (error) {
        console.warn('Auto-translate failed, falling back to original string:', error);
        return text;
    }
}

/**
 * Automatically translates all string properties of an object into target language
 */
export async function autoTranslateObject<T extends Record<string, unknown>>(
    sourceObj: T,
    targetLang: 'en' | 'ru' | 'uz',
    sourceLang: string = 'auto'
): Promise<T> {
    const result: Record<string, unknown> = { ...sourceObj };

    for (const key of Object.keys(sourceObj)) {
        const val = sourceObj[key];
        if (typeof val === 'string' && val.trim() !== '') {
            result[key] = await autoTranslateText(val, targetLang, sourceLang);
        } else if (Array.isArray(val)) {
            // Translate arrays of strings (e.g. includes, not_included)
            result[key] = await Promise.all(
                val.map(async (item) => {
                    if (typeof item === 'string' && item.trim() !== '') {
                        return await autoTranslateText(item, targetLang, sourceLang);
                    }
                    return item;
                })
            );
        }
    }

    return result as T;
}
