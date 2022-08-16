const { request } = require('express');
const express = require('express');
const routes = express();
const { addPoint, getAllPoints, getPoint } = require('./controllers/points');
const { addParameter, getIrregularParameters, getParameter } = require('./controllers/parameter');

//PONTOS
routes.post('/ponto', addPoint);
routes.get('/ponto/:id', getPoint);
routes.get('/pontos', getAllPoints);

// //PARAMETROS
routes.post('/parametro', addParameter);
routes.get('/parametro/:id_parametro', getParameter);
routes.get('/irregulares', getIrregularParameters);


module.exports = routes