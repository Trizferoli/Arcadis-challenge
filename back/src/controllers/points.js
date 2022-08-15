const schemaAddPoints = require('../validation/addPoint');
const knex = require('../connection')
// const pointExists = require('./functions/pointExists');



const addPoint = async (req, res) => {
    const { x, y } = req.body

    try {
        await schemaAddPoints.validate(req.body);
        const point = await knex('pontos').where({ 'ponto_x': x, "ponto_y": y }).first();

        if (point) {
            return res.status(409).json({ message: "Este ponto já está cadastrado." })
        }


        const logPoint = await knex('pontos').insert({
            "ponto_x": x,
            "ponto_y": y
        });

        return res.status(201).json();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const getPoint = async (req, res) => {
    const { id } = req.params
    try {
        const point = await knex('pontos')
            .fullOuterJoin('parametros_registro', 'pontos.id', '=', 'parametros_registro.id_ponto')
            .leftJoin('parametros_limite', 'parametros_registro.id_parametros_limite', '=', 'parametros_limite.id')
            .select('pontos.id', 'parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').where('pontos.id', id).groupBy('parametros_registro.data_coleta').groupBy('parametros_registro.valor_parametro').groupBy('parametros_limite.nome').groupBy('parametros_limite.unidade_de_medida').groupBy('pontos.id').orderBy('pontos.id')

        if (point.length === 0) {
            return res.status(404).json({ "message": "Este ponto não está cadastrado." })
        }
        return res.status(200).json(point)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



const getAllPoints = async (req, res) => {
    try {
        // const points = await knex.raw('SELECT id_ponto, data_coleta, valor_parametro, pontos.ponto_x, pontos.ponto_y, parametros_limite.nome, parametros_limite.unidade_de_medida FROM parametros_registro JOIN parametros_limite ON id_parametros_limite = parametros_limite.id  FULL JOIN pontos ON id_ponto = pontos.id GROUP BY parametros_registro.id_ponto');

        // const points = await knex.raw('SELECT pontos.id, parametros_registro.data_coleta, parametros_registro.valor_parametro, pontos.ponto_x, pontos.ponto_y, parametros_limite.nome, parametros_limite.unidade_de_medida FROM parametros_registro JOIN parametros_limite ON id_parametros_limite = parametros_limite.id  FULL JOIN pontos ON id_ponto = pontos.id GROUP BY pontos.id');

        // const points = await knex('parametros_registro')
        //     .fullOuterJoin('pontos', 'id_ponto', '=', 'pontos.id')
        //     .join('parametros_limite', 'id_parametros_limite', '=', 'parametros_limite.id')
        //     .select('id_ponto', 'data_coleta', 'valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').groupBy('id_ponto')


        //FIX GROUP BY
        // const points = await knex('pontos')
        //     .join('parametros_limite', function () {
        //         this
        //             .on('parametros_registro.id_parametros_limite', '=', 'parametros_limite.id')
        //     }).join('parametros_regisstro', function () {
        //         this
        //             .on('pontos.id', '=', 'parametros_registro.id_ponto')
        //     })
        //     .select('pontos.id', 'parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').groupBy('pontos.id').orderBy('pontos.id')

        const points = await knex('pontos')
            .fullOuterJoin('parametros_registro', 'pontos.id', '=', 'parametros_registro.id_ponto')
            .leftJoin('parametros_limite', 'parametros_registro.id_parametros_limite', '=', 'parametros_limite.id').as('t1')
            .select('pontos.id', 'parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').groupBy('parametros_registro.data_coleta').groupBy('parametros_registro.valor_parametro').groupBy('parametros_limite.nome').groupBy('parametros_limite.unidade_de_medida').groupBy('pontos.id').orderBy('pontos.id')

        // const points = await knex('parametros_registro')
        //     .fullOuterJoin('pontos', 'id_ponto', '=', 'pontos.id')
        //     .join('parametros_limite', 'id_parametros_limite', '=', 'parametros_limite.id').as('parametros_limite_id')
        //     .select('pontos.id', 'parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').groupBy('parametros_registro.data_coleta').groupBy('parametros_registro.valor_parametro').groupBy('parametros_limite.nome').groupBy('parametros_limite.unidade_de_medida').groupBy('pontos.id').orderBy('pontos.id')


        return res.status(200).json(points)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = { addPoint, getAllPoints, getPoint }