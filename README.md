API OO Trix
Uma API orientada a objetos para gerenciamento de transferências bancárias.

Essa API é usada como exemplo didático para o bloco de Arquitetura de Software 

Rodando a aplicação inicial via Docker

Após clonar o repositório
Inicie os contêineres via Docker Compose:
  docker-compose up -d
eyes Observação: Dois contêineres irão subir! Um para a aplicação Node TypeScript, denominado trix e outro para o banco de dados MongoDB, denominado trix_db

Para acessar o contêiner do banco de dados, basta executar comando abaixo:

  docker exec -it trix_db mongo
eyes Observação: Aqui você pode executar comandos como: show dbs, use #COLLECTION_NAME, show collections e etc...

Para acessar o contêiner da aplicação, basta executar comando abaixo:

  docker exec -it trix bash
Lista de endpoints
warning Dica: Há uma coleção dos endpoints em formato JSON para importação na extensão Thunder Client do VS Code no arquivo thunder-trix.json

Como importar a coleção no Thunder Client

Abra a aba da extensão Thunder Client;
Clique na aba Collections;
Clique no menu de opções;
Clique em Import;
Escolha o arquivo thunder-trix.json;
Clique em OK.
