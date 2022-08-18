# Arcadis-challenge

<p>MVP of an API for registering and consulting geographic points and its parameters. Made for a selection project.<p/>
Api can be accessed through: https://arcadis.herokuapp.com/

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
- Get irregular values that do surpass the limit established by 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2'

## Routes

### ```Post: /ponto```
Resister new points, sending x and y through JSON body:
- A point can only be registered once.
#### input:
```javascript
{
	"x":1,
	"y":1
}
```
#### output if invalid request:
```javscript
{
	"message": "error.message"
}
```
---

### ```Get: /ponto/:id```
Get an especific point:
Send id through url parameter.
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

#### output if invalid request example:
```javscript
{
	"message": "Este ponto não está cadastrado."
}
```
---

### ```Get: /pontos```
Get all points:
#### output:
```javascript
{
	"id": 2,
	"ponto_x": 2,
	"ponto_y": 7,
	"parametros": []
},
{
	"id": 3,
	"ponto_x": 1,
	"ponto_y": 2,
	"parametros": []
}
```

#### output if invalid request example:
```javscript
{
	"message": "error.message"
}
```
---
### ```POST: /parametro```
Resister new parameter, sending id limit parameter, point id, value and date JSON body:
#### input:
```javascript
{
	"id_parametros_limite":7,
	"id_ponto": 12,
	"valor": 0.01,
	"data": "2021-07-14T22:03:30.170Z"
}
```
#### output if invalid request:
```javscript
{
	"message": "error.message"
}
```
---
### ```Get: /parametro/:id```
Get specific parameter through its id:
Send id through url parameter.
#### output:
	
```javscript
[
	{
		"id": 1,
		"id_ponto": 5,
		"id_parametros_limite": 1,
		"data_coleta": "2022-08-27T00:00:00.000Z",
		"valor_parametro": "1",
		"ponto_x": -2,
		"ponto_y": -1,
		"nome": "Alumínio dissolvido",
		"unidade_de_medida": "mg/l",
		"valor_limite": "0.1"
	}
]
```
	
#### output if invalid request:
	
```javscript
{
	"message": "error.message"
}
```
---
### ```Get: /parametros```
Get all parameters registered:

#### output:
	
```javscript
[
	{
		"id": 1,
		"id_ponto": 5,
		"id_parametros_limite": 1,
		"data_coleta": "2022-08-27T00:00:00.000Z",
		"valor_parametro": "1",
		"ponto_x": -2,
		"ponto_y": -1,
		"nome": "Alumínio dissolvido",
		"unidade_de_medida": "mg/l",
		"valor_limite": "0.1"
	},
	{
		"id": 1,
		"id_ponto": 1,
		"id_parametros_limite": 1,
		"data_coleta": "2022-08-06T00:00:00.000Z",
		"valor_parametro": "0.09",
		"ponto_x": 1,
		"ponto_y": 7,
		"nome": "Alumínio dissolvido",
		"unidade_de_medida": "mg/l",
		"valor_limite": "0.1"
	}]
```
	
#### output if invalid request:
	
```javscript
{
	"message": "error.message"
}
```
---
### ```Get: /parametros-limite```
Get all parameters limit from 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2':

#### output:
	
```javscript
[
	{
		"id": 1,
		"nome": "Alumínio dissolvido",
		"unidade_de_medida": "mg/l",
		"valor_limite": "0.1"
	},
	{
		"id": 2,
		"nome": "Arsênio  total",
		"unidade_de_medida": "mg/l",
		"valor_limite": "0.01"
	}
]
```
	
#### output if invalid request:
	
```javscript
{
	"message": "error.message"
}
```
---
### ```Get: /irregulares```
Get all parameters that don't fit in the 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2' limit:

#### output:
	
```javscript
[
	{
		"id": 1,
		"data_coleta": "2022-08-02T00:00:00.000Z",
		"valor_parametro": "0.2",
		"ponto_x": 1,
		"ponto_y": 7,
		"nome": "Alumínio dissolvido",
		"unidade_de_medida": "mg/l"
	}
]
```
	
#### output if invalid request:
	
```javscript
{
	"message": "error.message"
}
```

---

## To run the project remotely:

1. Fork the projects repository

2. Clone the repository

ex. using SSH:
```sh
   git clone git@github.com:{yourUserName}/Arcadis-challenge-API.git
```

3. Alter .env configurations with your PG database info.

4. Install packages
using npm:
```sh
    npm install
```
5. Run the project
```sh
    npm start
```


