Feature: Cliente online

    Como um cliente online quero que o sistema me mostre compras para eu poder controlar minhas despesas

    Scenario: Obter dados da API

Dado que o cliente tem conexão com a internet
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir suas compras vindas de uma API
E substituir os dados do cache pelos dados mais atuais


Feature: Cliente offline

    Como um cliente offline quero que o sistema me mostre as últimas compras gravadas para eu poder ver minhas despesas mesmo sem ter acesso a internet

    Scenario: Obter dados do cache

Dado que o cliente não tem conexão com a internet
E exista algum addo gravado no cache
E os dados do cache forem mais novos do que 3 dias
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir suas compras vindas do cache

Dado que o cliente não tem conexão com a internet
E exista algum addo gravado no cache
E os dados do cache forem mais mais velhos ou iguais a 3 dias
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir uma mensagem de erro

Dado que o cliente não tem conexão com a internet
E o cache esteja vazio
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir uma mensagem de erro
