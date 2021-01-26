var watchlistStocks = [];
//GET Watchlist

fetch('https://api.tdameritrade.com/v1/accounts/##########/watchlists/1397828776', {
    headers: {
        authorization: 'Bearer '
    }
})
    .then(res => {
        console.log("SUCCESS", res)
        return res.json();
    })
    .then(data => {
        console.log("HEEEERE'S DATA", data)
        for(let i = 0; i < data.watchlistItems.length; i++){
            let childArray = data.watchlistItems[i].instrument.symbol;
            watchlistStocks.push(childArray)
            var newDiv = document.createElement("div");
            newDiv.className = "col-sm-6 col-md-4 col-lg-2"
            document.body.appendChild(newDiv);
            var symbol = document.createElement("h5");
            symbol.innerHTML = childArray
            newDiv.appendChild(symbol);
            //need to get the current price
            document.getElementById("watchlistContent").appendChild(newDiv);
            }
    })
    .catch(e => {
        console.log("YOU FUCK UP!", e)
    })



//Watchlist:
// {
// "name": "DEG Watchlist",
// "watchlistId": "1397828776",
// "accountId": "XXXXXXXXXX",
// "watchlistItems": [
//   {
//     "sequenceId": 1,
//     "quantity": 0,
//     "averagePrice": 0,
//     "commission": 0,
//     "instrument": {
//       "symbol": "AAL",
//       "assetType": "EQUITY"
//     }
//   },
//   {
//     "sequenceId": 2,
//     "quantity": 0,
//     "averagePrice": 0,
//     "commission": 0,
//     "instrument": {
//       "symbol": "AMZN",
//       "assetType": "EQUITY"
//     }
//   },
//   {
//     "sequenceId": 3,
//     "quantity": 0,
//     "averagePrice": 0,
//     "commission": 0,
//     "instrument": {
//       "symbol": "BA",
//       "assetType": "EQUITY"
//     }
//   }
// }

