
# Prometheus Dashboard with Laravel, Vue.js, and Docker

This project demonstrates how to create a unified service using **Laravel** as the backend and **Vue.js** for the frontend, with Prometheus monitoring. The project uses **Docker Compose** to orchestrate multiple services, including the **Server**, **Load Generator Bot**, **Prometheus**, and **Dashboard**.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/davidKirshbom/prometheus-laravel-vue-dashboard.git
cd prometheus-dashboard
```

### 2. Project Structure

```plaintext
prometheus-dashboard/
├── server/               # Source code for the Node.js Server
├── load-generator-bot/   # Source code for the Load Generator Bot
├── dashboard/            # Source code for the Laravel & Vue.js project
│   ├── app/              # Laravel backend logic
│   ├── resources/
│   │   ├── js/           # Vue.js components and logic
│   │   ├── views/        # Blade templates
│   └── routes/
│       ├── api.php       # API routes for Prometheus metrics and additional data
│       └── web.php       # Web routes for serving the frontend
├── prometheus/           # Prometheus configuration
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # Project documentation
```

### 3. Install Dependencies

#### Backend (Laravel)

1. Navigate to the `dashboard` folder:
   ```bash
   cd dashboard
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Set up your `.env` file:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Run the Laravel migrations (if applicable):
   ```bash
   php artisan migrate
   ```

#### Frontend (Vue.js)

1. Install Node.js dependencies in the `dashboard` directory:
   ```bash
   npm install
   ```

2. Build the Vue.js assets:
   ```bash
   npm run dev
   ```

### 4. Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- **Server**: Exposes metrics at `/metrics` for Prometheus.
- **Prometheus**: Scrapes metrics from the Server.
- **Dashboard (Laravel)**: Serves the API and Vue.js frontend.
- **Load Generator**: Simulates traffic to the server for testing purposes.

To build and start all services, run:

```bash
docker-compose up --build
```

### 5. Access the Services

- **Laravel API**: [http://localhost:8000](http://localhost:8000) - Provides endpoints like `/api/qps` for QPS data.
- **Frontend Dashboard**: [http://localhost:8080](http://localhost:8080) - Displays the QPS metrics in real-time with a chart.
- **Prometheus UI**: [http://localhost:9090](http://localhost:9090) - For monitoring and querying Prometheus metrics.
- **Server**: [http://localhost:3000](http://localhost:3000) - Node.js service exposing metrics.

### 6. Stop the Services

To stop all services, press `Ctrl + C` or run:

```bash
docker-compose down
```

### 7. Accessing the Dashboard

After running the services, navigate to [http://localhost:8080](http://localhost:8080) to access the live dashboard.

### 9. Troubleshooting

- **Load Generator Bot Cannot Reach Server**: Ensure DNS resolution in Docker. Check `docker-compose.yml` service names.
- **Metrics Not Visible in Prometheus**: Verify that Prometheus is scraping metrics from the Server.
- **Frontend Not Loading QPS Data**: Ensure the backend API endpoint (`/qps`) is reachable.
- **Laravel API Not Responding**: Verify that the Laravel container is running and the endpoint is accessible.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
