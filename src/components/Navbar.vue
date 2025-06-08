<script>
import { listaCategorias, categoriaSelecionada } from '../assets/api.js';

export default {
  data() {
    return {
      categorias: [],
      menuAberto: false,
      mostrarDropdown: false,
      termoBusca: ''
    };
  },
  async created() {
    const categorias = await listaCategorias();
    this.categorias = categorias;
  },
  methods: {
    selecionarCategoria(categoria) {
      categoriaSelecionada.value = categoria;
      console.log('Categoria selecionada:', categoriaSelecionada.value);
      this.menuAberto = false; // fecha menu ao selecionar
      this.mostrarDropdown = false;
    },
    toggleMenu() {
      this.menuAberto = !this.menuAberto;
    },
    toggleDropdown() {
      this.mostrarDropdown = !this.mostrarDropdown;
    },
    fecharDropdown() {
      this.mostrarDropdown = false;
    },
    buscar() {
      this.$emit('buscar-produto', this.searchQuery);
    }
  }
};
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- Menu hamburguer (mobile) -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-700 hover:text-black focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Logo -->
        <div class="flex-shrink-0">
          <h1 class="text-l md:text-2xl mx-3 font-bold text-gray-900">ShopCommerce</h1>
        </div>

        <!-- Categorias (desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Botão Todos -->
          <button @click="selecionarCategoria(null)"
            class="px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white">
            Todos
          </button>

          <!-- Dropdown -->
          <div class="group relative items-center">
            <button @click="toggleDropdown"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Categorias
            </button>
            <div v-if="mostrarDropdown" @mouseleave="fecharDropdown"
              class="absolute left-0 mt-2 bg-white border rounded shadow-lg p-2 w-50 max-h-80 z-50 overflow-y-auto z-50">
              <button v-for="cat in categorias" :key="cat.slug" @click="selecionarCategoria(cat.slug)"
                class="block text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 capitalize whitespace-nowrap">
                {{ cat.slug.replace('-', ' ') }} <!-- Para deixar como "Beauty Product" na visualização-->
              </button>
            </div>
          </div>
        </div>

        <!-- Barra de busca -->
        <div class="flex-1 max-w-lg mx-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input v-model="termoBusca" @keyup.enter="buscar" type="text" placeholder="Buscar produtos..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900" />
          </div>
        </div>

        <!-- Carrinho -->
        <div class="flex items-center">
          <button class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Menu lateral (mobile) -->
    <div v-if="menuAberto" class="md:hidden bg-white border-t shadow px-4 py-3 max-h-96 overflow-y-auto">
      <button @click="selecionarCategoria(null)"
        class="block w-full text-left px-3 py-2 text-sm font-medium bg-gray-900 text-white rounded mb-2">
        Todos
      </button>
      <button v-for="cat in categorias" :key="cat.slug" @click="selecionarCategoria(cat.slug)"
        class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize">
        {{ cat.slug.replace('-', ' ') }}
      </button>
    </div>
  </nav>
</template>
