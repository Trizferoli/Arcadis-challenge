# Arcadis-challenge

<p>MVP of an API for registering and consulting geographic points and its parameters. Made for a selection project.<p/>

## Technologies

- Node.js:
  - Express.js
  - Nodemon
  - Dotenv
  - Yup
  - Yup Locales
  -Knex
- PostgreSQL

## Features

_**Points**_

- Add point
- Get specific point
- Get all points

_**Parameters**_

- Add parameter
- Get specific parameter
- Get all parameters
- Get parameters 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2' legislation limit value
- <li>Get irregular values that do surpass the limit established by 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2'

## Routes

### ```/ponto```
#### input:
Resister new points, sending x and y through JSON body:
- A point can only be registered once.

```javascript
{
	"x":1,
	"y":1
}
```
#### output if invalid request:
```javscript
error.message
```
---

### ```/ponto/:id```
Get an especific point:
- Send id through url parameter.
#### output:
```javascript
{
	"id": 1,
	"ponto_x": 1,
	"ponto_y": 7,
	"parametros": [
		{
			"data_coleta": "2022-08-02T00:00:00.000Z",
			"valor_parametro": "0.2",
			"nome": "Alumínio dissolvido",
			"unidade_de_medida": "mg/l"
		}]
}
```

#### output if invalid request:
```javscript
error.message
```


