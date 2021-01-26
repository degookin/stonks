var currentStocks = [];

//Getting all positions and info in account, need Bearer token.
//To get both accounts data, remove /acctnumber
fetch('https://api.tdameritrade.com/v1/accounts/#####?fields=positions', {
    headers: {
        authorization: 'Bearer '
    }
})
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        let acctBalance = data.securitiesAccount.currentBalances.liquidationValue;
        var acctDisplay = document.createElement("div");
        acctDisplay.innerHTML = "Account Balance: $" + acctBalance.toLocaleString('en');
        let swingInvestment = 5000;
        //let longInvestment = 10000;
        let swingAcctPL = acctBalance - swingInvestment;
        //let longAcctPL = acctBalance - longInvestment;
        var swingAcctPLdisplay = document.createElement("p");
        //var longAcctPLdisplay = document.createElement("p");
        swingAcctPLdisplay.innerHTML = "Acct P/L: $" + swingAcctPL.toFixed(2);
        //longAcctPLdisplay.innertHTML = "Acct P/L: $" + longAcctPL.toFixed(2);
        document.getElementById("acctBal").appendChild(acctDisplay);
        document.getElementById("acctBal").appendChild(swingAcctPLdisplay);
        //document.getElementById("acctBal").appendChild(longAcctPLdisplay);
        for(let i = 0; i < data.securitiesAccount.positions.length; i++){            
            let sym = data.securitiesAccount.positions[i].instrument.symbol;
            let price = data.securitiesAccount.positions[i].averagePrice
            let dayPL = data.securitiesAccount.positions[i].currentDayProfitLoss
            let dayPLPerc = data.securitiesAccount.positions[i].currentDayProfitLossPercentage
            let quant = data.securitiesAccount.positions[i].longQuantity
            let value = data.securitiesAccount.positions[i].marketValue
            let currentPrice = (value/quant);
            let pLAmt = (value-(price*quant)).toFixed(2);
            let cost = (price*quant).toFixed(2);
            let pLPerc = (((value-cost)/cost)*100).toFixed(2);
            let asset = data.securitiesAccount.positions[i].instrument.assetType;
            currentStocks.push(sym, price, dayPL, dayPLPerc, quant, value, pLPerc, asset);

        if(sym !== "MMDA1"){    
            var newDiv = document.createElement("div");
            if(dayPLPerc >= 3.0){
                newDiv.className = "card text-white li-green mb-3 col-sm-6"
            }else if(dayPLPerc < 3.0 && dayPLPerc >= 1.0){
                newDiv.className = "card text-white med-green mb-3 col-sm-6"
            }else if(dayPLPerc < 1.0 && dayPLPerc > 0.0){
                newDiv.className = "card text-white dark-green mb-3 col-sm-6"
            }else if(dayPLPerc === 0.0){
                newDiv.className = "card text-white bg-secondary mb-3 col-sm-6"
            }else if(dayPLPerc <= -3.0){
                newDiv.className = "card text-white li-red mb-3 col-sm-6"
            }else if(dayPLPerc > -3.0 && dayPLPerc <= -1.0){
                newDiv.className = "card text-white med-red mb-3 col-sm-6"
            }else if(dayPLPerc > -1.0 && dayPLPerc < 0.0){
                newDiv.className = "card text-white dark-red mb-3 col-sm-6"
            };
            //TEMPORARY SOLUTION TO SEE OVERALL P/L
            // if(pLPerc >= 3.0){
            //     newDiv.className = "card text-white li-green mb-3 col-sm-6"
            // }else if(pLPerc < 3.0 && dayPLPerc >= 1.0){
            //     newDiv.className = "card text-white med-green mb-3 col-sm-6"
            // }else if(pLPerc < 1.0 && dayPLPerc > 0.0){
            //     newDiv.className = "card text-white dark-green mb-3 col-sm-6"
            // }else if(pLPerc === 0.0){
            //     newDiv.className = "card text-white bg-secondary mb-3 col-sm-6"
            // }else if(pLPerc <= -3.0){
            //     newDiv.className = "card text-white li-red mb-3 col-sm-6"
            // }else if(pLPerc > -3.0 && dayPLPerc <= -1.0){
            //     newDiv.className = "card text-white med-red mb-3 col-sm-6"
            // }else if(pLPerc > -1.0 && dayPLPerc < 0.0){
            //     newDiv.className = "card text-white dark-red mb-3 col-sm-6"
            // };

            document.body.appendChild(newDiv);
            var symbol = document.createElement("div");
            symbol.className = "card-header"
            symbol.innerHTML = sym
            newDiv.appendChild(symbol);
            var newestDiv = document.createElement("div");
            newestDiv.className = "card-body"
            newDiv.appendChild(newestDiv);
            if(asset === "EQUITY"){
                var shares = document.createElement("p");
                shares.className = "card-text"
                shares.innerHTML = "Shares: " + quant
                newDiv.appendChild(shares);
            }else if(asset === "OPTION"){
                var contracts = document.createElement("p");
                contracts.className = "card-text"
                contracts.innerHTML = "Contracts: " + quant
                newDiv.appendChild(contracts);
            }
            var avgPrice = document.createElement("p");
            avgPrice.className = "card-text"
            avgPrice.innerHTML = "Purchase Price: $" + price.toFixed(2)
            newDiv.appendChild(avgPrice);
            var curPrc = document.createElement("p");
            curPrc.className = "card-text"
            if(asset === "EQUITY"){
                curPrc.innerHTML = "Current Price: $" + currentPrice.toFixed(2)
            }else if(asset === "OPTION"){
                curPrc.innerHTML = "Current Price: $" + (currentPrice/100).toFixed(2)
            }
            newDiv.appendChild(curPrc);
            var dayProfLoss = document.createElement("p");
            dayProfLoss.className = "card-text"
            dayProfLoss.innerHTML = "Day P/L: $" + dayPL.toFixed(2)
            newDiv.appendChild(dayProfLoss);
            var dayProfLossPct = document.createElement("p");
            dayProfLossPct.className = "card-text"
            dayProfLossPct.innerHTML = "Day P/L: " + dayPLPerc + "%"
            newDiv.appendChild(dayProfLossPct);
            var totalPandL = document.createElement("p");
            totalPandL.className = "card-text"
            totalPandL.innerHTML = "Overall P/L: $" + pLAmt
            newDiv.appendChild(totalPandL);
            var totalPandLPerc = document.createElement("p");
            totalPandLPerc.className = "card-text"
            totalPandLPerc.innerHTML = "Overall P/L: " + pLPerc + "%"
            newDiv.appendChild(totalPandLPerc);
            var totalCost = document.createElement("p");
            totalCost.className = "card-text"
            if(asset === "EQUITY"){
                totalCost.innerHTML = "Total Cost: $" + cost.toLocaleString('en');
            }else if(asset === "OPTION"){
                totalCost.innerHTML = "Total Cost: $" + (cost*100).toFixed(2).toLocaleString('en');
            }
            newDiv.appendChild(totalCost);
            var val = document.createElement("p");
            val.className = "card-text"
            val.innerHTML = "Mkt Value: $" + value.toLocaleString('en');
            newDiv.appendChild(val);
            document.getElementById("stockContent").appendChild(newDiv);
            }
        }
    })
    .catch(e => {
        console.log("ERROR", e)
    });
