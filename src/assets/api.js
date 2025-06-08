import axios from 'axios';
import { ref } from 'vue';

export const api = axios.create({
    baseURL: 'https://dummyjson.com',
});

export const listaProdutos = async ({ q = null, categoria = null, limit = 12, skip = 0, sortBy = 'id', order = 'asc' } = {}) => {
    try {
        let url;

        if (q) {
            url = '/products/search';
        } else if (categoria) {
            url = `/products/category/${categoria}`;
        } else {
            url = '/products';
        }

        const response = await api.get(url, {
            params: {
                q: q,
                limit,
                skip,
                sortBy,
                order
            }
        });

        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
};

export const categoriaSelecionada = ref(null)

export const listaCategorias = async () => {
    try {
        const response = await api.get('/products/categories');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
};

export const detalhesProduto = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        throw error;
    }
};