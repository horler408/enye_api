const express = require('express');
const Axios = require('axios');
const app = express();
const port = process.env.PORT || 5000


app.get('/api/rates', (req, res) => {
    const base = req.query.base
    const currency = req.query.symbols

    const baseURI = 
    `https://api.exchangeratesapi.io/latest`;

    if(base && currency) {
        Axios.get(`${baseURI}?base=${base}&symbols=${currency}`)
        .then(response => {
            const data = response.data
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err.message
            })
        })
    }else {
        Axios.get(baseURI)
        .then(response => {
            const data = response.data
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
    }    
});

//Redirect Not Foundendpoints
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Route Not Found!'
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`))