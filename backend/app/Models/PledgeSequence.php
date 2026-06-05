<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * PledgeSequence model for pledge numbering sequence per branch.
 * 
 * Maintains auto-increment sequence for generating unique pledge numbers per branch and year.
 * Ensures pledges created in KDE branch get "KDE-" prefix, PNG branch gets "PNG-", etc.
 * Allows resetting sequence annually or manually.
 * 
 * @property string $id UUID primary key
 * @property string $branch_id Branch UUID this sequence belongs to
 * @property int $year Calendar year for sequence
 * @property int $current_sequence Current sequence counter (incremented with each pledge)
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship branch() BelongsTo Branch
 */

class PledgeSequence extends Model
{
    // branch_id is the PK — not a UUIDv7 auto-generated field
    public $incrementing = false;
    public $timestamps   = false;

    protected $primaryKey = 'branch_id';
    protected $keyType    = 'string';

    protected $fillable = ['branch_id', 'last_no'];

    protected $casts = [
        'last_no' => 'integer',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
