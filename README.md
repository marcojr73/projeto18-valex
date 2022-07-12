<p align="center">
  <a href="https://github.com/marcojr73-github/projeto18-valex">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    projeto18-valex 
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/marcojr73-github/projeto18-valex

$ cd projeto18-valex 

$ npm install

$ npm run dev
```

API: https://api-valex-typescript.herokuapp.com

types of cards valids: 'groceries', 'restaurant', 'transport', 'education', 'health'

```
- POST /card/create
    - Rota para se cadastrar um cartão
    - headers: {
        apiKey
    }
    - body: {
    "employeeId": number,
    "type": "STRING VALID"
    }

- POST /card/activate
    - Rota para ativar o cartão
    - body: {
        "id": "number",
        "cvc": "string",
        "password": "string"
    }

- GET /card
    - Rota para visualizar informações do cartão
    - body: {
        "cardId": "number",
        "employeeId": "number"
    }

- GET /card/balance/:id
    - Rota para visualizar saldo, compras e recargas do cartão

- PUT /card/block
    - Rota para bloqueio de cartão
    - body: {
        "id": number,
        "password": string
    }

- PUT /card/unlock
    - Rota para desbloqueio de cartão
    - body: {
        "id": number,
        "password": string
    }

- POST /reload (autenticada)
    - Rota para a empresa recarregar o cartão de seu funcionário
    - headers: { 
        apiKey
    }
    - body: {
        "id": number,
        "value": number
    }

- POST /purchase
    - Rota para o uso do cartão em lojas cadastradas, seu uso pode ser atráves de compras online ou no POS
    - Para compras online use
        body: {
            "number": number,
            "cardholder": string, 
            "expirationDate": string, 
            "cvc": string,
            "businessId": number,
            "amount": number
        }
    - Para compras em um POS use
        body{
            "cardId": number,
            "password": string, 
            "businessId": number, 
            "amount": number
        }


```
