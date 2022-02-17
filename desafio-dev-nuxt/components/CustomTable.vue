<template>
  <div class="container">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>CPF</th>
          <th>Cartão</th>
          <th>Dono da Loja</th>
          <th>Nome do Dono</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!data.length">
          <td colspan="10">Sem transações carregadas...</td>
        </tr>

        <tr v-for="(item, idx) in data" :key="idx">
          <td>{{ item.id }}</td>
          <td>{{ formatDate(item.processed_at) }}</td>
          <td>{{ formatHour(item.processed_at) }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.amount }} R$</td>
          <td>{{ item.recipient.cpf }}</td>
          <td>{{ item.recipient.card }}</td>
          <td>{{ item.store.owner_name }}</td>
          <td>{{ item.store.name }}</td>
          <td>{{ item.store.amount }} R$</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <Paginate
        v-show="
          pagination.total > pagination.current_page * pagination.per_page ||
          pagination.current_page != 1
        "
        v-model="pagination.current_page"
        :page-count="Math.ceil(pagination.total / pagination.per_page)"
        :page-range="pagination.per_page"
        :click-handler="getData"
        prev-text="Anterior"
        next-text="Próximo"
        container-class="pagination justify-content-end mt-3"
        page-class="page-item"
        page-link-class="page-link"
        prev-class="page-item"
        prev-link-class="page-link"
        next-class="page-item"
        next-link-class="page-link"
      >
      </Paginate>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      pagination: {
        per_page: 10,
        current_page: 1,
        total: 0,
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      await this.$axios
        .$get('/transactions', {
          params: { page: this.pagination.current_page },
        })
        .then((resp) => {
          this.data = resp.data
          this.pagination = resp.meta
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {})
    },
    formatDate(input) {
      if (input) {
        let datePart = input.match(/\d+/g),
          year = datePart[0].substring(0),
          month = datePart[1],
          day = datePart[2]

        return `${day}/${month}/${year}`
      }
    },
    formatHour(input) {
      if (input) {
        let datePart = input.match(/\d+/g),
          hour = datePart[3],
          min = datePart[4],
          s = datePart[5]

        return `${hour}:${min}:${s}`
      }
    },
  },
}
</script>
