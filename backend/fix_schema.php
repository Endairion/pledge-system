<?php
require_once 'vendor/autoload.php';
require_once 'bootstrap/app.php';

use Illuminate\Support\Facades\DB;

try {
    // Drop problematic constraints
    DB::statement("ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_gender_check");
    DB::statement("ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_id_type_check");
    echo "Constraints dropped successfully\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
