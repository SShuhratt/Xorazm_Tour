import { AlertCircle } from 'lucide-react';

interface FormErrorsBannerProps {
    errors: Record<string, string | undefined>;
    title?: string;
}

export function FormErrorsBanner({
    errors,
    title = 'Please fix the following errors before saving:',
}: FormErrorsBannerProps) {
    const entries = Object.entries(errors).filter(
        ([, message]) => Boolean(message),
    ) as [string, string][];

    if (entries.length === 0) {
        return null;
    }

    return (
        <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
        >
            <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <div className="space-y-1">
                    <p className="font-semibold text-red-300">{title}</p>
                    <ul className="list-inside list-disc space-y-0.5 text-red-200/90">
                        {entries.map(([field, message]) => (
                            <li key={field}>
                                <span className="font-mono text-xs text-red-300">
                                    {field}
                                </span>
                                : {message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

