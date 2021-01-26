
//This is how you get a current stock quote
fetch('https://api.tdameritrade.com/v1/marketdata/TSLA/quotes', {
    headers: {
        //Have to auth on TD site, then grab this token
        authorization: 'Bearer '
      }
     })
    .then(res => {
        console.log("SUCCESSFUL RESPONSE!!", res)
        return res.json()
    })
    .then(data => {
        console.log("WE GOTS DATA", data)
        console.log(data.TSLA.bidPrice)
        currentStocks.push(data.TSLA.bidPrice);
    })
    .catch(err => {
        console.log("ERROR :(", err)
    })
