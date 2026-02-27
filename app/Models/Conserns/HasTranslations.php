<?php

namespace App\Models\Conserns;

trait HasTranslations
{
    public function translate(?string $locale = null)
    {
        $locale ??= app()->getLocale();

        return $this->translations
            ->where('locale', $locale)
            ->first();
    }

}
