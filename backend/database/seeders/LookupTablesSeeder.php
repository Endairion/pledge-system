<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CustomerTitle;
use App\Models\FeeType;
use App\Models\GoldQuality;
use App\Models\Nationality;
use App\Models\Race;
use App\Models\Religion;
use App\Models\SourceOfGoldType;
use Illuminate\Database\Seeder;

class LookupTablesSeeder extends Seeder
{
    public function run(): void
    {
        // Customer Titles
        $titles = ['Encik', 'Cik', 'Puan', 'Tuan'];
        foreach ($titles as $name) {
            CustomerTitle::firstOrCreate(['name' => $name]);
        }

        // Races
        $races = ['Melayu', 'Cina', 'India', 'Others'];
        foreach ($races as $name) {
            Race::firstOrCreate(['name' => $name]);
        }

        // Religions
        $religions = ['Islam', 'Buddha', 'Kristian', 'Hindu', 'Others'];
        foreach ($religions as $name) {
            Religion::firstOrCreate(['name' => $name]);
        }

        // Nationalities
        $nationalities = ['Malaysia', 'Others'];
        foreach ($nationalities as $name) {
            Nationality::firstOrCreate(['name' => $name]);
        }

        // Source of Gold Types
        $sources = ['Buy', 'Gift', 'Inheritance', 'Others'];
        foreach ($sources as $name) {
            SourceOfGoldType::firstOrCreate(['name' => $name]);
        }

        // Categories
        $categories = [
            'Cincin',
            'Gelang Tangan',
            'Rantai Tangan',
            'Rantai Leher',
            'Jongkong Emas',
            'Syiling',
            'Subang',
            'Lain-lain',
            'Dinar',
            'Rantai Kaki',
            'Loket',
            'Silver Bar',
            'Gold Bar',
            'Dirham',
            'Jam Tangan',
        ];
        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }

        // Gold Qualities
        $qualities = [
            ['name' => '999',        'purity_percent' => 1.00],
            ['name' => '916',        'purity_percent' => 0.90],
            ['name' => '835',        'purity_percent' => 0.80],
            ['name' => '750',        'purity_percent' => 0.70],
            ['name' => '750 WG',     'purity_percent' => 0.75],
            ['name' => '999 Silver', 'purity_percent' => 1.00],
            ['name' => '585',        'purity_percent' => 0.50],
            ['name' => '375',        'purity_percent' => 0.30],
        ];
        foreach ($qualities as $q) {
            GoldQuality::firstOrCreate(
                ['name' => $q['name']],
                ['purity_percent' => $q['purity_percent']]
            );
        }

        // Fee Types
        $feeTypes = [
            ['code' => 'storage_fee',     'name' => 'Storage Fee',     'description' => 'Monthly storage / safekeeping fee (Ujrah)'],
            ['code' => 'renewal_fee',     'name' => 'Renewal Fee',     'description' => 'Fee charged on pledge renewal'],
            ['code' => 'redemption_fee',  'name' => 'Redemption Fee',  'description' => 'Fee charged on pledge redemption'],
            ['code' => 'auction_fee',     'name' => 'Auction Fee',     'description' => 'Fee charged when pledged item is auctioned'],
            ['code' => 'appraisal_fee',   'name' => 'Appraisal Fee',   'description' => 'Fee charged for item appraisal at pledging'],
            ['code' => 'processing_fee',  'name' => 'Processing Fee',  'description' => 'General transaction processing fee'],
        ];
        foreach ($feeTypes as $ft) {
            FeeType::firstOrCreate(['code' => $ft['code']], [
                'name'        => $ft['name'],
                'description' => $ft['description'],
            ]);
        }
    }
}
