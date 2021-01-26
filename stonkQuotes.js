
//This is how you get a current stock quote
fetch('https://api.tdameritrade.com/v1/marketdata/TSLA/quotes', {
    headers: {
        //Have to auth on TD site, then grab this token
        authorization: 'Bearer jJuguFZnSREuh9zE6WqAbp1XZiQpSdqoWBizhv7CPAHfzPOzsyGFg21LRGn5eKMZ1imkMSXP0uZQEFKi/ZQ5tum9r4VUhyyPFmERew41mR1puQgZ6yNMmvckuBiaZTCql9Sbe4fpVYv3o/s3conVL17thMSZMgtfvRNaqmsJsSojVrwG1Zxt0jeAM38kWbOhVjSgQFR7Fgfg7yAO8vLwwq0DRqyw5HG0Pt5g3XASobyziZFyTm84R51gs7JwSZ2rhD6cI+KqBRhVKbbr2f9VSrAFxti9CeTvk3ZZiq15r49tuXtiCBh7ITmWnL2A7F6GAsNPHgX9PbRnP+g9rkK08jZYkUq/pyFdmsuhMh+FZwokzKcvBuTCQXHaPabH/Qbrsx513SwpU3RpxghsxJ8qD9ENqqClLgQP/p1TyZFeX+GjJeYF1RLG74NLR3+IfYtlypfRdbUR6iyTXSy/SEj4mr8P9Hn83bbVnFfrrXOfwYWlTgPUJODzrhN6dq5jHE95zTqP8N9JfL9Om35sKxuhQPVbK5GLl2WW/FqB/100MQuG4LYrgoVi/JHHvlxAsrKBGaIaebJr53lmqtxDeeL558ifn5FQWLqLA1pSVi+2ha/uzAG/a0cOmSw48epTBZg9NFS5JFNVlXs8XzpYqv/YVn3rkIGvEOueD9g51pHTOxrGndR2XWw+rKYQtqzCP2Cvc5TKVecfnNe5ueApzMAAEMhD8Ld6ctKpFYlNQ/c2kCleoaTc7URRrADxQA+rQzOU3N8GBdxcdcXSPVtWGWQlMZkMIKLrW2cg05V0B445WBiILt+xThySuKPpW1rBGy8igou2cb2oKaG0tn2S9ttw5lLW+IRJ2iDL6vhPbrW11G3/1+SyrPoaHjrRkKgySek0nJJHQSgH65Bs4Xg56arQIO5TiyDlmKn41etY5gL1fAlvBs9BJ9Hrz3cqwgG1Inppd7qXXSry/Fg5QgwmwbdDf3T3CBZCFQquR38TTyC1fMG/AofWdVgubUQ+Ti/nBgX6hZ+9oTdhWxchcKgcX8K5MTgHTP+tzQgdVMQBstlPcv6Z80xPgDtAtr/BJFSxtsWsM+DOOOd2u1tDyZDsDr0mwC9Zai4nCa3q212FD3x19z9sWBHDJACbC00B75E'
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
