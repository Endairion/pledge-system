<?php
require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

echo "\n" . str_repeat("=", 80) . "\n";
echo "PLEDGE RULES STORED IN DATABASE\n";
echo str_repeat("=", 80) . "\n\n";

$ruleSets = DB::table('pledge_rule_sets')
    ->join('branches', 'pledge_rule_sets.branch_id', '=', 'branches.id')
    ->select('pledge_rule_sets.id', 'branches.name', 'branches.compliance_type')
    ->orderBy('branches.name')
    ->get();

foreach ($ruleSets as $ruleSet) {
    echo str_repeat("-", 80) . "\n";
    echo "BRANCH: " . strtoupper($ruleSet->name) . "\n";
    echo "Compliance Type: " . $ruleSet->compliance_type . "\n";
    echo str_repeat("-", 80) . "\n";
    
    $params = DB::table('pledge_rule_set_params')
        ->where('rule_set_id', $ruleSet->id)
        ->orderBy('param_key')
        ->get();
    
    if ($params->isEmpty()) {
        echo "  (No parameters configured)\n";
    } else {
        foreach ($params as $param) {
            echo "  " . $param->param_key . ": ";
            
            if ($param->param_key === 'monthly_interest_rates') {
                $rates = json_decode($param->param_value, true);
                if ($rates) {
                    echo "\n";
                    foreach ($rates as $month => $rate) {
                        echo "    Month $month: $rate%\n";
                    }
                } else {
                    echo $param->param_value . "\n";
                }
            } else {
                echo $param->param_value . "\n";
            }
        }
    }
    echo "\n";
}

echo str_repeat("=", 80) . "\n";
