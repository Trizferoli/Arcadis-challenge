const schemaAddPoints = require('../validation/addPoint');
const knex = require('../connection')

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
        const point = await knex('pontos').select('*').first();

        if (!point) {
            return res.status(404).json({ "message": "Este ponto não está cadastrado." })
        }

        const parameters = await knex('parametros_registro')
            .leftJoin('parametros_limite', 'parametros_registro.id_parametros_limite', '=', 'parametros_limite.id')
            .select('parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').where('parametros_registro.id_ponto', id).groupBy('parametros_registro.data_coleta').groupBy('parametros_registro.valor_parametro').groupBy('parametros_limite.nome').groupBy('parametros_limite.unidade_de_medida').groupBy('parametros_registro.id_ponto').orderBy('parametros_registro.id_ponto');

        point.parameters = [...parameters];
        return res.status(200).json(point)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



const getAllPoints = async (req, res) => {
    try {

        const points = await knex('pontos')
            .fullOuterJoin('parametros_registro', 'pontos.id', '=', 'parametros_registro.id_ponto')
            .leftJoin('parametros_limite', 'parametros_registro.id_parametros_limite', '=', 'parametros_limite.id').as('t1')
            .select('pontos.id', 'parametros_registro.data_coleta', 'parametros_registro.valor_parametro', 'pontos.ponto_x', 'pontos.ponto_y', 'parametros_limite.nome', 'parametros_limite.unidade_de_medida').groupBy('parametros_registro.data_coleta').groupBy('parametros_registro.valor_parametro').groupBy('parametros_limite.nome').groupBy('parametros_limite.unidade_de_medida').groupBy('pontos.id').orderBy('pontos.id')

        return res.status(200).json(points)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = { addPoint, getAllPoints, getPoint }
