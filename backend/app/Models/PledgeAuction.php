<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeAuction model for forfeited pledge auction records.
 * 
 * Records auctioning of pledged items when customer fails to redeem or renew before expiration.
 * Tracks auction date, reserve price, sold amount, and proceeds.
 * 
 * @property string $id UUID primary key
 * @property string $pledge_id Pledge UUID being auctioned
 * @property \Carbon\Carbon $auction_date Scheduled or completed auction date
 * @property decimal $reserve_price Minimum acceptable bid amount
 * @property decimal|null $sold_amount Actual sale amount achieved
 * @property decimal|null $fees_recovered Fees recovered from auction proceeds
 * @property decimal|null $loan_recovered Loan principal recovered
 * @property decimal|null $balance_proceeds Remaining proceeds after fees/loan
 * @property string $status Auction status ("scheduled", "completed", "failed", "cancelled")
 * @property string|null $auction_notes Auction outcome notes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship pledge() BelongsTo Pledge
 */

class PledgeAuction extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $table = 'pledge_auction';

    protected $fillable = [
        'pledge_id',
        'staff_id',
        'months_elapsed',
        'total_fee',
        'fee_paid_previously',
        'fee_outstanding',
        'principal_amount',
        'outstanding_debt',
        'auction_proceeds',
        'surplus_amount',
        'surplus_returned_at',
        'transacted_at',
        'notes',
    ];

    protected $casts = [
        'total_fee'           => 'decimal:2',
        'fee_paid_previously' => 'decimal:2',
        'fee_outstanding'     => 'decimal:2',
        'principal_amount'    => 'decimal:2',
        'outstanding_debt'    => 'decimal:2',
        'auction_proceeds'    => 'decimal:2',
        'surplus_amount'      => 'decimal:2',
        'surplus_returned_at' => 'datetime',
        'transacted_at'       => 'datetime',
    ];

    public function pledge(): BelongsTo
    {
        return $this->belongsTo(Pledge::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'staff_id');
    }
}
