var currentStocks = [];

//Getting all positions and info in account, need Bearer token.  Accts 498181853 & 232010200
//To get both accounts data, remove /acctnumber
fetch('https://api.tdameritrade.com/v1/accounts/498181853?fields=positions', {
    headers: {
        authorization: 'Bearer 1cmRec3WhicSJWufy1mV2sXmra2H0M+x9/joC1KuDkLIlGUgGFbAFRUZO7m1uYGn72GucDlGGXvS/B0U9i33NdOyhfINE1CjQ0cJ8QEmFpDw5Zi5SKFDKRDrlj7m8zBUBxB8jCYHOWYB/7tcjTBWEU6fVu9lnNMVr+Ib441zljGl25o6HZPUzTjYiR67tqCK7l4+uljCzW5TGiDMqSHKAWETY4Js5r4E4vzn2iJFGy3CAOYZ+VAAUT0Sa2xgwuKPKlKtTKS05Bty0qFMgpN3q2jCqfsfDPBc9V2XA8kQJHOmUBJ5xMbrqoun3dckstTwmcbmS3JONNJjXttuaesTL0sQ4hojn8xIKpgPPpb5cIjHO6t3AbA29SZ7EgRbmls5SeGpyNeScKJW90INX1UZwubnp+8AWiNQoLn/h9kyz/pK38OgpHOFPrcNT4XVlKH86A4s7PhwWnviFDlHWTgRC2rpCu7WFX1AJiWaWZeW7NeLiKlJUXq2V/ssRb42EG8322fEXnBTc5cRKt2oC4H1U7Wx/PI5cNlNvIBDVntdUchCYad3Fx99t6AFkRl100MQuG4LYrgoVi/JHHvlIK8zLXQ6mEsWjolfgdAzbCKffonREPnMPu2E1jeIy0rQwkwyRXqByT5omy0Wm2CEbuleQKTO9t4T9V9PoL2qIk+ZRmAm8dl2O9hOHJoN/78JvdNDJwqEZBTe8kSluGQVjidS38CRqh1G5G1iiQTgQM0FjWBqS3StPQcSaYxKLKg/pLrTVkzz7jspSbTQ1ogCJj8Vc7yyYLQC5rdt8KFmALTZFuvWzTk9ZavWJ1HRQe/dGac5lLL9Ge+xymDweHxn9vzIig6xO0rwTOpeDNEbKlmCFS9RehT1ABVGJNQ0M/Qk2EBqi1M1lRlRW3I/sxKUhA0B8jz0CWc/fhpitpRyvi7FJnnzEst72ORBJhGGY2Z4LHXyEutVE6twCWyIcMsFsvmD+9AzN7JX/h/QValavguUFT2Dx/0cpR5DnIWph8r0x6WiVN70UfY1GWDcDokf1CkFHSN06+eW39DB2qq0jtxHh1sqGGsm3WvEQHziu+NEGU9pd17blscS40FXtTj9ax8KTh9xIhcf4ziZtqYo7+ag8l88rXEXfk5SMyYnEnxj4RDoTZBAy7qCWKQ=212FD3x19z9sWBHDJACbC00B75E'
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
