import { createStore } from 'vuex'

export default createStore({
  state: {
    stock_list: [
      { ticker: 'AAPL', name: 'アップル' },
      { ticker: 'ADBE', name: 'アドビ' },
      { ticker: 'AMZN', name: 'アマゾン' },
      // { ticker: 'BTI', name: 'ブリティッシュ・アメリカン・タバコ' },
      { ticker: 'GOOG', name: 'グーグル' },
      { ticker: 'MSFT', name: 'マイクロソフト' },
      { ticker: 'PG', name: 'プロクター・アンド・ギャンブル' },
      // { ticker: 'T',  name: 'AT&T' }
    ],
    term_list: [
      { value: 'dailyPrices', name: '日足' },
      { value: 'weeklyPrices30MinIntervals', name: '週足' },
      { value: 'yearlyPrices', name: '1年' },
      { value: '5yearPrices', name: '5年' }
    ],
  },
  getters: {
    getStockByTicker: (state) => (ticker:string) => {
      return state.stock_list.find(stock => stock.ticker === ticker)
    },
    getTerm: (state) => (term:string) => {
      return state.term_list.find(t => t.value === term)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
