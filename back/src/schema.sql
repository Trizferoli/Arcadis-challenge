DROP DATABASE IF EXISTS arcadis;
CREATE DATABASE arcadis


DROP TABLE IF EXISTS pontos
CREATE TABLE pontos(
    id serial PRIMARY KEY,
    ponto_x integer NOT NULL,
    ponto_y integer NOT NULL
);

DROP TABLE IF EXISTS parametros_limite
CREATE TABLE parametros_limite(
    id serial PRIMARY KEY,
    nome varchar(40) NOT NULL,
    unidade_de_medida varchar(10) NOT NULL,
    valor_limite decimal NOT NULL
)

DROP TABLE IF EXISTS parametros_registro
CREATE TABLE parametros_registro(
    id serial PRIMARY KEY,
    id_ponto integer references pontos(id) NOT NULL,
    id_parametros_limite integer references parametros_limite(id) NOT NULL,
    data_coleta timestamp NOT NULL,
    valor_parametro decimal NOT NULL
);


INSERT INTO parametros_limite(nome, unidade_de_medida, valor_limite) VALUES
('Alumínio dissolvido', 'mg/l', 0.1),
('Arsênio  total', 'mg/l', 0.01),
('Chubo total', 'mg/l', 0.01),
('Cobre dissolvido', 'mg/l', 0.009),
('Escherichiaa coli', 'NMP/100ml', 1000),
('Cromo total', 'mg/l', 0.001),
('DBO', 'mg  O2/l', 5);