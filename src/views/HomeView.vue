<script>
import { listaProdutos, categoriaSelecionada } from '../assets/api.js';
import { watch } from 'vue';

export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      itemsPerPage: 12,
      sortBy: 'id',
      order: 'asc',
      loading: true, // Inicia mensagem de carregamento
      totalProducts: 0,
      totalPages: 0,
      categoriaSelecionada,
      searchQuery: ''
    };
  },
  async created() {
    await this.fetchProdutos();

    watch(
      categoriaSelecionada,
      () => {
        this.currentPage = 1;
        this.fetchProdutos();
      },
      { immediate: true }
    );

    watch(() => this.searchQuery, () => {
      this.currentPage = 1;
      this.fetchProdutos();
    });
  },
  methods: {
    async fetchProdutos() {
      this.loading = true;
      try {
        const skip = (this.currentPage - 1) * this.itemsPerPage;

        const data = await listaProdutos({
          q: this.searchQuery,
          categoria: categoriaSelecionada.value,
          limit: this.itemsPerPage,
          skip,
          sortBy: this.sortBy,
          order: this.order
        });

        this.products = data.products; // Lista de produtos
        this.totalProducts = data.total; // Total dos produtos 
        this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage) // Paginas = totalProdutos / 12

      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    currentPage() {
      this.fetchProdutos();
    },
    'categoriaSelecionada.value': {
      handler() {
        this.currentPage = 1;
        this.fetchProdutos();
      },
      immediate: true
    },
  },
};
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Resultado da busca -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">
        Confira os nossos produtos!
      </h3>
      <p class="text-gray-600">
        Total de produtos: {{ totalProducts }}
      </p>
      <p class="text-gray-600" v-if="products.length === 0">
        Nenhum produto encontrado
      </p>
    </div>

    <div class="mb-4">
      <label for="sort" class="mr-2 font-semibold">Ordenar por:</label>
      <select id="sort" v-model="sortBy" @change="fetchProdutos" class="border rounded p-2">
        <option value="id">Id</option>
        <option value="title">Nome</option>
        <option value="price">Preço</option>
      </select>

      <select v-model="order" @change="fetchProdutos" class="border rounded p-2 ml-2">
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
    </div>

    <!-- Listagem -->
    <div class="block grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Card de Produtos -->
      <div v-for="product in products" :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="relative">
          <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
          <div v-if="product.discountPercentage"
            class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
            -{{ product.discountPercentage }}%
          </div>
        </div>

        <div class="p-4">
          <div class="mb-2">
            <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ product.category }}
            </span>
          </div>

          <h4 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {{ product.title }}
          </h4>

          <!-- Validações se possui preço promocional -->
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span v-if="product.discountPercentage" class="text-sm text-gray-500 line-through">
                R$ {{ product.price }}
              </span>
              <span v-if="product.discountPercentage" class="text-xl font-bold text-gray-900">
                R$ {{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
              <span v-else="product.discountPercentage" class="text-xl font-bold text-gray-900">
                R$ {{ product.price }}
              </span>
            </div>

            <!-- Desabilita botão caso sem estoque -->
            <button :disabled="product.stock === 0" :class="[
              'px-4 py-2 rounded-md font-medium transition-colors',
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            ]">
              {{ product.stock === 0 ? 'Indisponível' : 'Comprar' }}
            </button>

          </div>
        </div>
      </div>
    </div>

    <!-- Botões de navegação e paginação -->
    <div class="flex justify-center mt-8 items-center space-x-4">
      <button @click="currentPage--" :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Anterior
      </button>

      <span class="text-gray-700 font-semibold">
        Página {{ currentPage }} de {{ totalPages }}
      </span>

      <button @click="currentPage++" :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Próxima
      </button>
    </div>

    <!-- Carregando -->
    <div v-if="loading" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Carregando produtos...
      </h3>
    </div>
  </main>
</template>