<template>
  <div>
    <input
      v-model="searchQuery"
      placeholder="Search anything..."
      style="margin-bottom: 10px; padding: 5px; width: 100%;"
    />

    <table border="1" cellpadding="10" v-if="headers.length">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" @click="sortBy(header)">
            {{ header }}
            <span>
              <template v-if="sortColumn === header">
                {{ sortAsc ? '▲' : '▼' }}
              </template>
              <template v-else>
                ⇅
              </template>
            </span>
          </th>
          <th>✏️</th>
          <th>🗑️</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            {{ row[header] }}
          </td>
          <td>
            <!-- <button @click="$emit('edit', getOriginalIndex(row))">✏️</button> -->
             <button @click="$emit('edit', row.pId)">✏️</button>
          </td>
          <td>
            <!-- <button @click="$emit('delete', getOriginalIndex(row))">🗑️</button> -->
            <button @click="$emit('delete', row.pId)">🗑️</button>

          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="headers.length" style="margin-top: 10px;">
      <button @click="prevPage" :disabled="currentPage === 1">⬅️ Previous</button>
      <span> Page {{ currentPage }} </span>
      <button @click="nextPage" :disabled="currentPage >= maxPage">Next ➡️</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  data: Array,
})

defineEmits(['edit', 'delete'])

const searchQuery = ref('')
const sortColumn = ref('')
const sortAsc = ref(true)
const currentPage = ref(1)
const rowsPerPage = 2

// 1. Automatically extract headers from first object
const headers = computed(() => {
  return props.data.length > 0 ? Object.keys(props.data[0]) : []
})


// 2. Sorting
const sortBy = (header) => {
  if (sortColumn.value === header) {
    sortAsc.value = !sortAsc.value
  } else {
    sortColumn.value = header
    sortAsc.value = true
  }
}

const sortedData = computed(() => {
  if (!sortColumn.value) return props.data

  return [...props.data].sort((a, b) => {
    const valA = a[sortColumn.value]
    const valB = b[sortColumn.value]
    const isNumber = !isNaN(valA) && !isNaN(valB)

    if (isNumber) {
      return sortAsc.value ? valA - valB : valB - valA
    } else {
      return sortAsc.value
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    }
  })
})

// 3. Search logic
const finalData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return sortedData.value

  const startsWith = []
  const includes = []
  const rest = []

  for (const row of sortedData.value) {
    let matched = false
    for (const header of headers.value) {
      const cell = String(row[header]).toLowerCase()
      if (cell.startsWith(query)) {
        startsWith.push(row)
        matched = true
        break
      } else if (!matched && cell.includes(query)) {
        includes.push(row)
        matched = true
        break
      }
    }
    if (!matched) rest.push(row)
  }

  return [...startsWith, ...includes, ...rest]
})

// 4. Pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  return finalData.value.slice(start, start + rowsPerPage)
})

const maxPage = computed(() => {
  return Math.ceil(finalData.value.length / rowsPerPage)
})

const nextPage = () => {
  if (currentPage.value < maxPage.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// 5. Reset page on search or sort
watch([searchQuery, sortColumn, sortAsc], () => {
  currentPage.value = 1
})

// 6. Get index in original data
// const getOriginalIndex = (row) => {
//   return props.data.findIndex((item) =>
//     JSON.stringify(item) === JSON.stringify(row)
//   )
// }
</script>
