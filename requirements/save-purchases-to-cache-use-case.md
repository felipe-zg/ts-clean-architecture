# Gravar compras no cache

> ## Caso de sucesso

1. ✔️Sistema executa o comando salvar compras
2. Sistema cria uma data para ser gravada no cache
3. ✔️Sistema apaga os dados do cache atual
4. ✔️Sistema grava os novos dados no cache
5. Sistema não retorna nenhum erro

> ## Exceção - Erro ao apagar dados do cache

1. ✔️Sistema não grava os novos dados no cache
2. ✔️Sistema retorna erro

> ## Exceção - Erro ao gravar dados do cache

1. ✔️Sistema retorna erro
