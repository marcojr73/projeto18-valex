
# Valex API

<p align="center">
   <img width=350 src="https://cdn.pixabay.com/photo/2016/09/16/09/21/card-1673581_960_720.png"/>
</p>

- Cartões de benefícios são utilizados em muitas empresas, trazem vantagens tanto para os funcionários como para as empresas
- Esta API é responsável pela criação, recarga, ativação, assim como o processamento das compras de forma simples e segura

- [Veja meu deploy na heroku aqui](https://api-valex-typescript.herokuapp.com/)

***

## Como usar

Instale meu projeto, crie um banco de dados com os comandos SQL na pasta database e configure o .env como no exemplo

```bash
  git clone git@github.com:marcojr73/projeto18-valex.git
```

```bash
  npm i
  
  npm run dev
```

***

##	 Tecnologias e Conceitos

- Node.js
- Express
- Typescript
- Criptografia de senhas
- Validação por token
- Joi
- layered architecture
- Postgres
- SQL

***
    
## API Reference

#### Register a card

```
  POST /card/create
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `headers` |`apiKey` | `string` |
| `body` |`employeeId` | `string` |
| `body` |`type` | `string` |
type must be 'groceries', 'restaurant', 'transport', 'education', 'health' 

#### Avtivate a card

```
  POST /card/create
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`id` | `number` |
| `body` |`cvc` | `string` |
| `body` |`password` | `string` |

#### View a card

```
  GET /card/:cardId
```

#### View balance card

```
  GET /card/balance/:id
```

#### Block card

```
  PUT /card/block
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`id` | `string` |
| `body` |`password` | `string` |

#### Unlock card

```
  PUT /card/unlock
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`id` | `string` |
| `body` |`password` | `string` |

#### Reload card

```
  POST /reload
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `headers` |`apiKey` | `string` |
| `body` |`id` | `number` |
| `body` |`value` | `number` |

#### Purchases online

```
  POST /purchase
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`number` | `string` |
| `body` |`cardholder` | `string` |
| `body` |`expirationDate` | `number` |
| `body` |`cvc` | `number` |
| `body` |`businessId` | `number` |
| `body` |`amount` | `number` |

#### Purchases

```
  POST /purchase
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`cardId` | `string` |
| `body` |`password` | `string` |
| `body` |`businessId` | `number` |
| `body` |`amount` | `number` |
