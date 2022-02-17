
## Breves considerações

Aplicação Laravel, projecto feito sobre base no padrão MVC. Segue os passos para rodar:

- Executar o comando  script `composer install`
- Executar criar o arquivo .env e colar o conteúdo presente no .env.example
- Executar o comando  script `php artisan key:generate`
- Criar a base de dados e definir os valores no .env
- Executar o comando  script `php artisan migration:run`
- Executar o comando  script `php artisan serve

# API

1. script `GET api/transactions` para obter as transações 
1. script `POST api/transaction/upload` para fazer upload do ficheiro TXT (enviar o ficheiro com parametro de nome script `file`) `