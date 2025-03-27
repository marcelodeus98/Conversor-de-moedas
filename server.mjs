import express from "express";
import bodyParser from 'body-parser';
import { fetchData } from "./fecthData.mjs";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
      res.locals.currentYear = new Date().getFullYear();
      next();
  } catch (error) {
      next(error);
  }
});

app.get('/', async (req, res) => {
  try {
      let data = await fetchData();
      let arrData = Object.entries(data);
      res.render('index', { 
          arrData,
          pageTitle: 'Conversor de Moedas | Azul Solutions',
          pageDescription: 'Conversor de moedas online com taxas atualizadas. Converta entre mais de 160 moedas globais.'
      });
  } catch (error) {
      console.error('Erro ao buscar dados:', error);
      res.status(500).render('error', { 
          message: 'Erro ao carregar dados de moedas',
          error
      });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});