# ecommerce_teste_back
Desenvolvimento de simulação de página de e-commerce para teste.

## Instruções de instalação:
**Instalação de dependências:**
 ```
 npm install
 ```
 **Criação da base de dados:**
 
 Para levantar seu servidor com acesso às informações de uma base de dados (seed), será necessário, primeiro, criar uma base de dados no MongoDB Atlas. Nesta base de dados, você deverá criar uma collection com o nome de **products**.
 Esta collection será populada com as informações do arquivo products.json sempre que você rodar a aplicação com o conteúdo da collection vazio.
 
 Caso não queira criar a sua própria base de dados, use a seguinte URL de conexão com o MongoDB Atlas: "mongodb+srv://<user>:<password>@cluster0.dxo6t.mongodb.net/ecommerce?retryWrites=true&w=majority" (o <user> e a <password> serão enviados por e-mail).
 
**Variáveis de ambiente:**

 O programa utiliza duas variáveis de ambiente:
 
 - DATABASE_URL: representa a string de conexão com a sua base de dados no MongoDB Atlas
 - PORT: número da porta escutada pelo servidor
 
 As variáveis constam no arquivo sample-env. Crie um aquivo .env com essas variáveis OU execute com:
 ```
 export DATABASE_URL="xxxxxxxxx" 

 export PORT="xxxx" 
``` 
 **Rode com:**
 ```
 node index.js
 ```
 
