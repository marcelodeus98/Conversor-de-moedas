import express, { response } from "express";
import bodyParser from 'body-parser';


import { fetchData } from "./fecthData.mjs";
import { convertCoin } from "./conveterData.mjs";

const app = express();


// Use engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));


// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes
app.get('/', async (req, res) => {
    try{
        let data = await fetchData();
        let arrData = Object.entries(data);
        console.log(arrData);
        res.render('index', {arrData});
    }
    catch(error){
        console.log('Erro ao buscar dados');
        res.status(500).send('Erro ao buscar dados');
    };
});

const port = 3030;

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
})