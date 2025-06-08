# Projeto Vue - Catálogo de Produtos com API Externa

Este projeto consiste em uma aplicação frontend desenvolvida com **Vue.js**, que consome dados de uma API externa para exibir um catálogo de produtos. O objetivo é permitir aos usuários navegar, pesquisar, filtrar e visualizar detalhes de produtos de maneira intuitiva e dinâmica.

## Funcionalidades

- Listagem de produtos com:
  - Nome
  - Imagem
  - Preço
  - Categoria

- Filtros e busca:
  - Filtro por categoria
  - Filtro por faixa de preço
  - Filtro por nome do produto

- Ordenações:
  - Por nome (A-Z e Z-A)
  - Por preço (menor-maior e maior-menor)
  - Por estoque (menor-maior e maior-menor)

- Paginação:
  - Navegação entre páginas com quantidade limitada de produtos por página
  - Exibição de número total de páginas

- Menu de Categorias:
  - Mostra as categorias disponíveis
  - Botão "Mais categorias" para quando houver muitas

## Tecnologias Utilizadas

- [Vue.js](https://vuejs.org/)
- [Axios](https://axios-http.com/) para requisições HTTP
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- API pública de produtos: [DummyJSON](https://dummyjson.com/products)

## Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/viniGualt/projetoEcommerceVue.git
cd vitrine-ecommerce
```

Instale as dependências:
```
npm install
npm install axios
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
o
```


### API Utilizada

- Endpoint principal: https://dummyjson.com/products

- Exemplo de requisição: GET https://dummyjson.com/products?limit=10&skip=0

Link do youtube: 

Participantes:<br>
Vinicius Gualtieri Moraes <br>>
Kauã Henrique Zefferino Santana