<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;


class PrometheusService
{

    protected $prometheusQueryUrl; 
    private static $instance = null;
    function __construct(){
        $hostString= config('app.prometheus_port','');
        if(!empty($hostString))
            $hostString = ':'. $hostString;
        $this->prometheusQueryUrl = 'http://'.config('app.prometheus_host').$hostString.'/api/v1/query';
    }
    public static function getInstance(): PrometheusService
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }


    public function query($query)
    {
        $response = Http::get($this->prometheusQueryUrl, ['query' => $query]);
        if ($response->successful()) {
            return $response->json();
        }
  
        return ['error' => 'Failed to fetch metrics'];
    }

    public function getQPS()
    {
        $query = 'rate(http_requests_total[1m])';
        return $this->query($query);
    }

}