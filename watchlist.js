var watchlistStocks = [];
//GET Watchlist

fetch('https://api.tdameritrade.com/v1/accounts/498181853/watchlists/1397828776', {
    headers: {
        authorization: 'Bearer HIYLUxmiWuTPAdLg4AyhV6PRQcRF6MNehXFYOQQ0BuRII3OAqTbPO6kRVnflIkGgYshcKU+wqt5CQ6I7/PM/4i28oKyaN5KZldU+T8LbDn4r9RC5820sav/4a1Ykvjmhw7LCe7TXY08a9/1CUpBW68bs//k0lw5LCVeLVzljCS+EHdcFzZCEAm1Qlsdqwcz+vD1tcrqoZMzkA+Fnoly9VttK9ojDkid+YTlDqMJD+Dw6kB+uG98YvKr7HW1ZQLuvwivwn80a9BUNkMyazGFrr6wIs7Dcgdl+KWDYWhiAo1XSGNLsg8inLIvGV2y6yrR+mNXaYz2qb68IpbFD/4wixXvQ6FJFgY6pmL98oVE0lyputWNJFG8asVBTl5GrgmvCWK0XaPHZGJwyeYjfXp3C2XPIDiGP2TS6C+reg5JWVeBa/kJljSpx6jOapHpSDzwVwBBaQ5jzYgm+ldZqEnFXtknjr34hzXv3aWNWHypHg+n2wyGMr82bFmO9Ks1hm6DFfpPYlAQRlPmDoxp6pOfwbgyy4S+mpWZS89BohdLkLcRfEUBedaqDnWQG1fY100MQuG4LYrgoVi/JHHvl5/J+AhXIzQoIDQmwocYprhgb8+L0nHtOKI5FYGB1d4UEBIEZDN3nefok1zfGJQdBLHZSoEbTBZN5uoJbH89Bhf/G458XI+wwHzNZMR3iTkWpu735rTaWaYlhWm3VYd2E6Gn1Vxv+UvcnPE3vZctFcvNK/bjHVVJF4SKqXVl0rBpeaPYhRHvOkdAvVG+dPOPq4x2hS5pXAlKgr/3DqIlgIZ6q+QrPNb0FZx0hF0Dd/gX9wYS/KjQy9sOpgyrdnRXHr6muwtE0H6e/B8Dy7stZJzDSzdUSONXoNSElmUkMsyjhgRwq+xkYv/XRCxkFuyWHIy7jfvHfsD/ZvnmLtWUpp2CoR/INvXzZrlt3LdJbFMWBGiJMqgrQ9/YfkXmUJdI2Ub5n2NsEDryIHpnPTH/h4yi+NVVHBAhcYReN3I9Z7+JJ+o607zYCbr4bEU3IysaubSrxT6KztVhfgFi8wRPLYrMDBAZ5p3A7RP4FMCuNkJaRVx/A15p1U9U9Db+vLq7f/aKQK6f5C4EPw6zqyQDGON9+wqeQdBbex+47mmkl82CsUhNtCbWjxQckMso=212FD3x19z9sWBHDJACbC00B75E'
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
// "accountId": "498181853",
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

