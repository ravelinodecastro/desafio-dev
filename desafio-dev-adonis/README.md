# Breve considerações
Este projecto foi feito com o FrameWork AdonisJs na sua versão 5. A linguagem principal utilizada foi TypeScript e o padrão utilizado é MVC, ou seja o front-end e o back-end estão acoplados. A base de dados escolhida é MySql, Japa foi a ferramenta para testes unitários e docker e docker-compose para rodar aplicação dentro de um ambiente docker.

# Execução da Aplicação

1. Criar um base de dados
2. Criar um ficheiro .env e copiar os dados no .env.example
3. Definir os dados de conexão com a base de dados no .env
4. Executar script `npm install` para adicionar a pasta de modulos (dependências)
5. Executar script `node ace migration:run` para criar as tabelas na base de dados
6. Executar script `node ace serve --watch` para ter a aplicação rodando na maquina local.

# API

1. script `GET api/transactions` para obter as transações 
1. script `POST api/transaction/upload` para fazer upload do ficheiro TXT (enviar o ficheiro com parametro de nome script `file`) 

# Testes
1. Este projecto usa o JAPA para testes unitários, para executa-los basta rodar: script `node -r @adonisjs/assembler/build/register japaFile.ts`