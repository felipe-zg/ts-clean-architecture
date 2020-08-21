# Carregar compras do cache

> ## Caso de sucesso

1. Sistema executa o comando carregar compras
2. Sistema carrega os dados do cache
3. Sistema valida se o cache tem menos de 3 dias
4. Sistema cria uma lista de compras a partir dos dados do cache
5. Sistema retorna a lçista de compras

> ## Exceção - Erro ao carregar dados do cache

1. Sistema limpa o cache
2. Sistema retorna uma lista vazia

> ## Exceção - Cache expirado

1. Sistema limpa o cache
2. Sistema retorna uma lista vazia

> ## Exceção - Cache vazio

1. Sistema retorna uma lista vazia
