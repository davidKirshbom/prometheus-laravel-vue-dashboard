<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;
use App\Services\PrometheusService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(PrometheusService::class, function ($app) {
            return PrometheusService::getInstance();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('local', 'development')) {
            try {
                // Run migrations
                Artisan::call('migrate', ['--force' => true]);
            } catch (\Exception $e) {
                // Handle exceptions (e.g., log the error)
            }
        }
    }
}
