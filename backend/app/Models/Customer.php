<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Customer model for customer management.
 * 
 * Represents end customers who pledge gold items. Customers are registered at a branch but
 * visible across all branches for pledging purposes. Contains demographic information, identity
 * details, and contact information used throughout pledge lifecycle.
 * 
 * @property string $id UUID primary key
 * @property string $customer_no Auto-generated unique customer number (e.g., "CST-001")
 * @property string $branch_id Branch UUID where customer was registered
 * @property string|null $title_id Customer title (Mr., Mrs., Dr., etc.)
 * @property string $full_name Customer full name
 * @property string $id_type Identity document type ("IC", "Passport", "Military")
 * @property string $id_number Identity document number (unique)
 * @property string|null $date_of_birth Customer birth date
 * @property string $gender Gender ("M", "F")
 * @property string|null $race_id Race/ethnicity
 * @property string|null $religion_id Religion
 * @property string|null $nationality_id Nationality
 * @property string|null $phone Primary phone number
 * @property string|null $email Email address
 * @property string|null $address1 Street address
 * @property string|null $address2 Additional address
 * @property string|null $city City
 * @property string|null $postcode Postal code
 * @property string|null $state State/province
 * @property bool $is_blacklisted Whether customer is blacklisted
 * @property string|null $blacklist_reason Reason for blacklist if applicable
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship branch() BelongsTo Branch
 * @relationship pledges() HasMany Pledge
 * @relationship title() BelongsTo CustomerTitle
 * @relationship race() BelongsTo Race
 * @relationship religion() BelongsTo Religion
 * @relationship nationality() BelongsTo Nationality
 */

class Customer extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'customer_no',
        'branch_id',
        'title_id',
        'full_name',
        'id_type',
        'id_number',
        'date_of_birth',
        'gender',
        'race_id',
        'religion_id',
        'nationality_id',
        'phone',
        'email',
        'address',
        'occupation_type',
        'occupation_field',
        'purpose_of_transaction',
        'source_of_gold_id',
        'authorized_loan_limit',
        'loan_limit',
        'is_blacklisted',
        'blacklisted_reason',
        'blacklisted_at',
    ];

    protected $casts = [
        'date_of_birth'         => 'date',
        'authorized_loan_limit' => 'decimal:2',
        'loan_limit'            => 'decimal:2',
        'is_blacklisted'        => 'boolean',
        'blacklisted_at'        => 'datetime',
    ];

    public function title(): BelongsTo
    {
        return $this->belongsTo(CustomerTitle::class, 'title_id');
    }

    public function race(): BelongsTo
    {
        return $this->belongsTo(Race::class);
    }

    public function religion(): BelongsTo
    {
        return $this->belongsTo(Religion::class);
    }

    public function nationality(): BelongsTo
    {
        return $this->belongsTo(Nationality::class);
    }

    public function sourceOfGoldType(): BelongsTo
    {
        return $this->belongsTo(SourceOfGoldType::class, 'source_of_gold_id');
    }

    public function pledges(): HasMany
    {
        return $this->hasMany(Pledge::class);
    }

    public function activePledges(): HasMany
    {
        return $this->hasMany(Pledge::class)->where('status', 'active');
    }
}
