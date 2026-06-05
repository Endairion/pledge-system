<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeRenew model for pledge renewal transactions.
 * 
 * Records renewal of expiring pledges. When a customer extends a pledge before expiration,
 * a new PledgeRenew record is created and the original pledge status is updated to "renewed".
 * Maintains history of all renewal activities for audit purposes.
 * 
 * @property string $id UUID primary key
 * @property string $pledge_id Original pledge UUID being renewed
 * @property string|null $new_pledge_id UUID of new pledge created from renewal
 * @property string|null $staff_id Staff member who processed renewal
 * @property decimal|null $additional_loan Additional loan amount in renewal
 * @property decimal|null $fees_paid Fees paid during renewal
 * @property int $renewal_duration_months Duration of renewed pledge in months
 * @property \Carbon\Carbon $renewed_at When renewal was processed
 * @property \Carbon\Carbon $new_expires_at New expiration date
 * @property string|null $notes Renewal notes or conditions
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship pledge() BelongsTo Pledge
 * @relationship newPledge() BelongsTo Pledge
 */

class PledgeRenew extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $table = 'pledge_renew';

    protected $fillable = [
        'pledge_id',
        'staff_id',
        'months_elapsed',
        'fee_per_month',
        'total_fee',
        'fee_paid_previously',
        'fee_outstanding_before',
        'amount_paid',
        'fee_outstanding_after',
        'cash_amount',
        'bank_amount',
        'bank_reference',
        'payment_slip_path',
        'status',
        'approved_by',
        'approved_at',
        'rejected_by',
        'rejected_at',
        'rejection_reason',
        'to_pay_amount',
        'received_amount',
        'changed_amount',
        'third_party_name',
        'third_party_ic',
        'third_party_address',
        'third_party_phone',
        'third_party_race_id',
        'expires_at',
        'transacted_at',
        'notes',
    ];

    protected $casts = [
        'fee_per_month'          => 'decimal:2',
        'total_fee'              => 'decimal:2',
        'fee_paid_previously'    => 'decimal:2',
        'fee_outstanding_before' => 'decimal:2',
        'amount_paid'            => 'decimal:2',
        'fee_outstanding_after'  => 'decimal:2',
        'cash_amount'            => 'decimal:2',
        'bank_amount'            => 'decimal:2',
        'to_pay_amount'          => 'decimal:2',
        'received_amount'        => 'decimal:2',
        'changed_amount'         => 'decimal:2',
        'expires_at'             => 'date',
        'transacted_at'          => 'datetime',
        'approved_at'            => 'datetime',
        'rejected_at'            => 'datetime',
    ];

    public function pledge(): BelongsTo
    {
        return $this->belongsTo(Pledge::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    public function thirdPartyRace(): BelongsTo
    {
        return $this->belongsTo(Race::class, 'third_party_race_id');
    }
}
