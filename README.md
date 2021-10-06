# Portfolio Tracking API

## Tech Stack

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Deployment
* [AWS EC2](https://aws.amazon.com/)

## Server and Database Details
Server:`http://13.59.242.186`   
Mongo Connection String: `mongodb://13.59.242.186:27017
/portfolio-tracker`

###To start server on local
NOTE: `Docker` is required     
```bash    
npm run install
```
###To stop server
```bash    
npm run stop
```
###To view logs
```bash    
npm run logs
```

### API Routes
```bash
API: Add Trade
POST http://13.59.242.186:8080/trade
Sample Request:
BODY: {
    "ticker":"TCS",
    "type" :"SELL",
    "quantity" :5,
    "price" :100
}

Sample Response: {
    "tradeID": "615c2128d3649dd00888ba25"
}
```

```bash
API: Update Trade
PATCH http://13.59.242.186:8080/trade
Sample Request:
Body: {
    "tradeID": "615c2128d3649dd00888ba25",
    "ticker":"TCS",
    "type" :"SELL",
    "quantity" :5,
    "price" :100
}

Sample Response: {
    "tradeID": "615c2128d3649dd00888ba25"
}
```

```bash
API: Delete Trade
DELETE http://13.59.242.186:8080/trade
Sample Request:
Body: {
    "tradeID": "615c2128d3649dd00888ba25",
}

Sample Response: {
    "tradeID": "615c2128d3649dd00888ba25",
    "noOfShares":0
}
```

```bash
API: Get Trade
GET http://13.59.242.186:8080/trade

Sample Response: {
    "TCS": {
        "trades": [
            {
                "_id": "615c22829f2775707647b5ed",
                "type": "BUY",
                "quantity": 5,
                "price": 100,
                "createdAt": "2021-10-05T10:01:38.644Z",
                "updatedAt": "2021-10-05T10:01:38.644Z"
            },
        ],
        "noOfShares": 10
    },
    "WIPRO": {
        "trades": [
            {
                "_id": "615c228d9f2775707647b5f3",
                "type": "BUY",
                "quantity": 5,
                "price": 100,
                "createdAt": "2021-10-05T10:01:49.436Z",
                "updatedAt": "2021-10-05T10:01:49.436Z"
            },
        ],
        "noOfShares": 20
    },
}
```

```bash
API: Get Portfolio
GET http://13.59.242.186:8080/portfolio/

Sample Response: {
    "TCS": {
        "shares": 10,
        "averageBuyPrice": 100
    },
    "WIPRO": {
        "shares": 20,
        "averageBuyPrice": 100
    },
    "GOOGLE": {
        "shares": 5,
        "averageBuyPrice": 100
    }
}
```

```bash
API: Get Portfolio
GET http://13.59.242.186:8080/portfolio/returns

Sample Response:{
    "totalReturns": 100
}
```


##Validations
###`Request Body Validations`
   ### `type` can only be `BUY` or `SELL`
   ### `quantity` and `price` should be `> 0`.


## Postman Collection
`https://www.getpostman.com/collections/b2005c9412e6b72a6438`