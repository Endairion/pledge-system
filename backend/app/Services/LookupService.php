<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Category;
use App\Models\CustomerTitle;
use App\Models\FeeType;
use App\Models\GoldQuality;
use App\Models\Nationality;
use App\Models\Race;
use App\Models\Religion;
use App\Models\SourceOfGoldType;
use App\Models\Branch;
use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Service class for managing lookup tables.
 * 
 * Handles resolution of lookup table models and common CRUD operations
 * across all lookup tables with a unified interface.
 */
class LookupService
{
    /**
     * Mapping of table names to their model classes.
     *
     * @var array<string, string>
     */
    private const MODEL_MAPPING = [
        'customer_titles' => CustomerTitle::class,
        'races' => Race::class,
        'religions' => Religion::class,
        'nationalities' => Nationality::class,
        'source_of_gold_types' => SourceOfGoldType::class,
        'categories' => Category::class,
        'gold_qualities' => GoldQuality::class,
        'fee_types' => FeeType::class,
        'branches' => Branch::class,
        'roles' => Role::class,
    ];

    /**
     * Mapping of table names to their database table names.
     *
     * @var array<string, string>
     */
    private const TABLE_NAME_MAPPING = [
        'customer_titles' => 'customer_titles',
        'races' => 'races',
        'religions' => 'religions',
        'nationalities' => 'nationalities',
        'source_of_gold_types' => 'source_of_gold_types',
        'categories' => 'categories',
        'gold_qualities' => 'gold_qualities',
        'fee_types' => 'fee_types',
        'branches' => 'branches',
        'roles' => 'roles',
    ];

    /**
     * Get all available lookup table metadata.
     *
     * @return array Metadata for all lookup tables
     */
    public function getMetadata(): array
    {
        return [
            'tables' => [
                'customer_titles' => ['model' => CustomerTitle::class, 'label' => 'Customer Titles'],
                'races' => ['model' => Race::class, 'label' => 'Races'],
                'religions' => ['model' => Religion::class, 'label' => 'Religions'],
                'nationalities' => ['model' => Nationality::class, 'label' => 'Nationalities'],
                'source_of_gold_types' => ['model' => SourceOfGoldType::class, 'label' => 'Source of Gold Types'],
                'categories' => ['model' => Category::class, 'label' => 'Categories'],
                'gold_qualities' => ['model' => GoldQuality::class, 'label' => 'Gold Qualities'],
                'fee_types' => ['model' => FeeType::class, 'label' => 'Fee Types'],
                'branches' => ['model' => Branch::class, 'label' => 'Branches'],
                'roles' => ['model' => Role::class, 'label' => 'Roles'],
            ],
        ];
    }

    /**
     * Resolve model class from table name.
     *
     * @param string $table The table name
     * @return class-string<Model>|null The model class or null if not found
     */
    public function resolveModel(string $table): ?string
    {
        return self::MODEL_MAPPING[$table] ?? null;
    }

    /**
     * Get database table name from lookup table identifier.
     *
     * @param string $table The lookup table identifier
     * @return string|null The database table name or null if not found
     */
    public function getTableName(string $table): ?string
    {
        return self::TABLE_NAME_MAPPING[$table] ?? null;
    }

    /**
     * Get all records for a lookup table.
     *
     * @param string $table The lookup table identifier
     * @return Collection All records from the lookup table
     * @throws \InvalidArgumentException If table is invalid
     */
    public function getAllRecords(string $table): Collection
    {
        $modelClass = $this->resolveModel($table);
        if (!$modelClass) {
            throw new \InvalidArgumentException("Invalid lookup table: {$table}");
        }

        return $modelClass::all();
    }

    /**
     * Get a single record from a lookup table.
     *
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @return Model|null The record or null if not found
     * @throws \InvalidArgumentException If table is invalid
     */
    public function getRecord(string $table, string $id): ?Model
    {
        $modelClass = $this->resolveModel($table);
        if (!$modelClass) {
            throw new \InvalidArgumentException("Invalid lookup table: {$table}");
        }

        return $modelClass::find($id);
    }

    /**
     * Create a new record in a lookup table.
     *
     * @param string $table The lookup table identifier
     * @param array $data The record data (name, is_active, etc.)
     * @return Model The created record
     * @throws \InvalidArgumentException If table is invalid
     */
    public function createRecord(string $table, array $data): Model
    {
        $modelClass = $this->resolveModel($table);
        if (!$modelClass) {
            throw new \InvalidArgumentException("Invalid lookup table: {$table}");
        }

        return $modelClass::create($data);
    }

    /**
     * Update a record in a lookup table.
     *
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @param array $data The data to update
     * @return Model|null The updated record or null if not found
     * @throws \InvalidArgumentException If table is invalid
     */
    public function updateRecord(string $table, string $id, array $data): ?Model
    {
        $record = $this->getRecord($table, $id);
        if (!$record) {
            return null;
        }

        $record->update($data);

        return $record;
    }

    /**
     * Delete a record from a lookup table (soft delete).
     *
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @return bool True if deleted successfully, false if not found
     * @throws \InvalidArgumentException If table is invalid
     */
    public function deleteRecord(string $table, string $id): bool
    {
        $record = $this->getRecord($table, $id);
        if (!$record) {
            return false;
        }

        $record->delete();

        return true;
    }
}
