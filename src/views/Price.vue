<template>
<!--
  <h1>{{ store.getters.getStockByTicker(ticker).name }}</h1>
-->
  <h1>{{ ticker }}</h1>
  <div>
    <select v-model="ticker" @change="update">
      <option v-for="(stock, index) in store.state.stock_list"
              :key="index"
              :value="stock.ticker">
        {{ stock.name }}
      </option>
    </select>
    <select v-model="term">
      <option v-for="(t, index) in store.state.term_list"
              :key="index"
              :value="t.value">
        {{ t.name }}
      </option>
    </select>
  </div>
  <div v-if="!loaded" style="color: orange; margin-top: 10rem;">
    <vue-loaders-ball-beat color="currentColor" scale="1" />
  </div>

  <canvas id="canvas"></canvas>

</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router';
import { Chart, ChartOptions, registerables } from "chart.js";
import ApiService from "@/service/api";
import Stock from '@/types/stock'

Chart.register(...registerables);

export default defineComponent({
  name: 'Price',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const ticker = ref<string>(route.params.ticker as string)
    const term = ref<string>('dailyPrices')
    const info = ref<Stock>({
      ticker: '',
      name: '',
      labels: [],
      data: [],
    })
    const loaded = ref<boolean>(false)
    const chart = ref<Chart>()  // Chartインスタンス

    const drawChart = (info: Stock, element_id: string, label:string) => {
      const options: ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          //tooltip: {
          //  enabled: false
          //},
          title: {
            display: true,
            text: info.name
          }
        }
      };

      //if (chart.value) {chart.value.destroy()}
      let ctx = document.getElementById(element_id) as HTMLCanvasElement;
      chart.value = new Chart(ctx, {
        type: 'line',
        data: { // ラベルとデータセット
          labels: info.labels,
          datasets: [{
            label: label,
            data: info.data,
            backgroundColor: 'rgba(0, 134, 197, 0.7)', // 棒の塗りつぶし色
            borderColor: 'rgba(0, 134, 197, 1)', // 棒の枠線の色
            borderWidth: 1, // 枠線の太さ
          }],
        },
        options: options
      });
    }

    const update = (e: Event) => {
      const target = e.target as HTMLSelectElement
      router.push({name: 'Price', params: {ticker: target.value}})
    }

    onMounted(() => {
      //console.log('mounted')
      redrawChart()
    })

    watch(ticker,
      () => {
        //console.log('watch ' + ticker.value)
        redrawChart()
      }
    )

    const redrawChart = () => {
      if (chart.value) {chart.value.destroy()}
      loaded.value = false
      getPrice()
    }

    const getPrice = async () => {
      await ApiService.getStock(ticker.value)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          let data = response.data
          let _labels = [] as string[]
          let _data = [] as number[]
          let prices = data[term.value]
          //console.log(prices)
          for (var i=0; i<prices.length; i++) {
            _labels.push(i+1+'')
            _data.push(prices[i])
          }
          info.value.name = data.shortName
          info.value.labels = _labels
          info.value.data = _data
          info.value.ticker = data.ticker + ' ' + term.value
          loaded.value = true

          drawChart(info.value, "canvas", "株価 "+store.getters.getTerm(term.value).name)
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    return { store, ticker, term, update, loaded}

  }
})
</script>
