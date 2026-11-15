<?php

namespace App\Models\Concerns;

trait HasTranslations
{
    public function translate(?string $locale = null)
    {
        $locale ??= app()->getLocale();

        return $this->translations->where('locale', $locale)->first()
            ?? $this->translations->where('locale', 'en')->first()
            ?? $this->translations->first();
    }

}
