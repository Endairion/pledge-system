<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeRedeem model for pledge redemption transactions.
 * 
 * Records redemption of pledged items. When a customer fully repays loan plus accumulated fees,
 * the pledge is redeemed and items returned. Records redemption date, method, and balance.
 * 
 * @property string $id UUID primary key
 * @property string $pledge_id Pledge UUID being redeemed
 * @property string|null $staff_id Staff member who processed redemption
 * @property decimal $total_paid Total amount paid by customer
 * @property decimal $loan_repayment Loan principal repaid
 * @property decimal $fees_paid Interest and storage fees paid
 * @property decimal|null $balance_amount Any balance remaining (overpayment or underpayment)
 * @property string $payment_method Redemption payment method ("cash", "bank", "check")
 * @property string|null $payment_reference Payment reference or check number
 * @property \Carbon\Carbon $redeemed_at When redemption was processed
 * @property string|null $notes Redemption notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship pledge() BelongsTo Pledge
 */

class PledgeRedeem extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $table = 'pledge_redeem';

    protected $fillable = [
        'pledge_id',
        'staff_id',
        'months_elapsed',
        'fee_per_month',
        'total_fee',
        'fee_paid_previously',
        'fee_outstanding',
        'principal_amount',
        'total_amount_paid',
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
        'transacted_at',
        'notes',
    ];

    protected $casts = [
        'fee_per_month'       => 'decimal:2',
        'total_fee'           => 'decimal:2',
        'fee_paid_previously' => 'decimal:2',
        'fee_outstanding'     => 'decimal:2',
        'principal_amount'    => 'decimal:2',
        'total_amount_paid'   => 'decimal:2',
        'cash_amount'         => 'decimal:2',
        'bank_amount'         => 'decimal:2',
        'to_pay_amount'       => 'decimal:2',
        'received_amount'     => 'decimal:2',
        'changed_amount'      => 'decimal:2',
        'transacted_at'       => 'datetime',
        'approved_at'         => 'datetime',
        'rejected_at'         => 'datetime',
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
