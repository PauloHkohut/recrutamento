# Recrutamento - Paulo Henrique Kohut

A seguir é descrito os requisitos para executar este projeto em modo de desenvolvimento.

### Dependências

O projeto é implementado utilizando NextJs, logo é necessário o ambiente Node para executa-lo.

```bash
$ node --version
v21.7.1

$ npm --version
10.7.0
```

Após clonar o projeto, para instalar as dependências do projeto utilizando o npm, deve-se executar o seguinte comando:

```bash
$ git clone https://github.com/paulohkohut/recrutamento.git

$ cd recrutamento

$ npm i
```

### Configurar Firebase

Para armazenamento de dados e autenticação, é preciso a criação de um projeto no Firebase e habilitar os seguintes recursos: `Firestore Database`, `Authentication` e `Storage`.

Em seguida, deve copiar o arquivo `env.local.example` para `.env.local` e edita-lo inserindo os dados obtidos do Firebase.

### Execução do Projeto

Para iniciar o projeto em modo desenvolvimento, executar o NextJs com o npm:

```bash
$ npm run dev
```

O cron job para exclusão de dados, pode ser executado também com npm:

```bash
$ npm run retencao
```
