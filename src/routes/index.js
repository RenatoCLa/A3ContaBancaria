import express from 'express';
import Banco from './bancoRoutes.js';
import Conta from './contaRoutes.js';

const routes = (app) => {
    app.route('/').get((_, res) => {
      res.status(200).send({ titulo: 'Conta Bancária' });
    });

    app.use(
      express.json(),
      Banco,
      Conta,
    );
  };

export default routes;