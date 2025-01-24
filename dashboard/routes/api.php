<?php

use App\Http\Controllers\PromthusController;
use Illuminate\Support\Facades\Route;

Route::prefix('metrics')->group(function () {
    Route::get('/qps', [PromthusController::class, 'getQps']);
});
