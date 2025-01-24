<?php
namespace App\Http\Controllers;

use App\Services\PrometheusService;
use App\Http\Controllers\Controller;

class PromthusController extends Controller
{

    public function getQps(PrometheusService $prometheusService)
    {
        $metrics = $prometheusService->getQps();
        return response()->json($metrics);
    }
}
?>