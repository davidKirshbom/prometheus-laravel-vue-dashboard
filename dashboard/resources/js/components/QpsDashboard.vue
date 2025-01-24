<template>
  <div class="qps-dashboard bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Queries Per Second (QPS) Monitor
      </h1>
      <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-700">
                  Current QPS:
                  <span :class="qpsColorClass">{{ formattedQps }}</span>
              </h2>
              <div v-if="loading" class="">
                  <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
              </div>
          </div>

          <div class="chart-container h-64">
              <canvas ref="qpsChart"></canvas>
          </div>
      </div>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { ref, computed, onMounted, onUnmounted } from "vue";

Chart.register(...registerables);

const qps = ref(null);
const loading = ref(true);
const qpsChart = ref(null);
const chartData = ref([]);
const chartLabels = ref([]);
let intervalId = null;

const formattedQps = computed(() =>
  qps.value !== null ? qps.value.toFixed(2) : "N/A"
);

const qpsColorClass = computed(() => {
  if (qps.value === null) return "text-gray-500";
  if (qps.value < 10) return "text-green-600";
  if (qps.value < 50) return "text-yellow-600";
  return "text-red-600";
});

const fetchQps = async () => {
  loading.value = true;
  try {
      const response = await axios.get("/api/metrics/qps");
      if (response.data.data && response.data.data.result.length > 0) {
          const currentQps = parseFloat(
              response.data.data.result[0].value[1]
          );
          qps.value = currentQps;

          const now = new Date().toLocaleTimeString();
          if (
              chartLabels.value.length === 0 ||
              chartLabels.value[chartLabels.value.length - 1] !== now
          ) {
              chartData.value = [
                  ...chartData.value,
                  currentQps,
              ].slice(-10);
              chartLabels.value = [...chartLabels.value, now].slice(-10);

              if (qpsChart.value) {
                  updateChart();
              }
          }
      } else {
          qps.value = null;
      }
  } catch (error) {
      console.error("Failed to fetch QPS:", error);
      qps.value = null;
  } finally {
      loading.value = false;
  }
};

const createChart = () => {
  const ctx = qpsChart.value.getContext("2d");
  return new Chart(ctx, {
      type: "line",
      data: {
          labels: chartLabels.value,
          datasets: [
              {
                  label: "QPS",
                  data: chartData.value,
                  borderColor: "rgba(59, 130, 246, 1)",
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  borderWidth: 2,
                  tension: 0.4,
              },
          ],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  title: {
                      display: true,
                      text: "Time",
                      color: "#4a5568",
                  },
              },
              y: {
                  title: {
                      display: true,
                      text: "Queries Per Second",
                      color: "#4a5568",
                  },
                  beginAtZero: true,
              },
          },
      },
  });
};

const updateChart = () => {
  if (qpsChart.value && qpsChart.value.chart) {
      qpsChart.value.chart.data.labels = [...chartLabels.value];
      qpsChart.value.chart.data.datasets[0].data = [
          ...chartData.value,
      ];
      qpsChart.value.chart.update();
  }
};

onMounted(async () => {
  await fetchQps();
  qpsChart.value.chart = createChart();
  intervalId = setInterval(fetchQps, 15000);
});

onUnmounted(() => {
  if (intervalId) {
      clearInterval(intervalId);
  }
  if (qpsChart.value && qpsChart.value.chart) {
      qpsChart.value.chart.destroy();
  }
});
</script>