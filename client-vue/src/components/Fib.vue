<template>
  <div class="fib">
    <form @submit.prevent="submitForm">
      <input
        type="text"
        v-model="index"
      />
      <button type="submit">Submit</button>
    </form>
    <button @click="updateValues">Refresh Values</button>
    <h3>Indexes I have seen:</h3> {{ renderedSeenIndexes }}
    <h3>Calculated Values:</h3>
    <div v-for="(value, key) in values" :key="key">
      For index {{ key }} I calculated {{ value }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return { 
      index: '',
      values: {},
      seenIndexes: []
    }
  },
  computed: {
    renderedSeenIndexes () {
      return this.seenIndexes.map(({ number }) => number).join(', ')
    }
  },
  methods: {
    async submitForm () {
      await axios.post('/api/values', {
        index: parseInt(this.index)
      })
      this.index = ''
    },
    updateValues () {
      this.fetchValues()
      this.fetchIndexes()
    },
    async fetchValues () {
      const values = await axios.get('/api/values/current')
      this.values = values.data
    },
    async fetchIndexes () {
      const seenIndexes = await axios.get('/api/values/all')
      this.seenIndexes = seenIndexes.data
    }
  },
  mounted () {
    this.updateValues()
  }
}
</script>
