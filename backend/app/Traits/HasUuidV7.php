<?php

declare(strict_types=1);

namespace App\Traits;

use Ramsey\Uuid\Uuid;

trait HasUuidV7
{
    public static function bootHasUuidV7(): void
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Uuid::uuid7();
            }
        });
    }

    public function initializeHasUuidV7(): void
    {
        $this->keyType = 'string';
        $this->incrementing = false;
    }
}
