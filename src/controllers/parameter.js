const knex = require('../connection');
const schemaAddParameter = require('../validation/addParameter')

const addParameter = async (req, res) => {
    const { id_ponto, id_parametros_limite, valor, data } = req.body;

    try {
        await schemaAddParameter.validate(req.body);

        const pointExists = await knex('pontos').where('id', id_ponto).first();

        if (!pointExists) {
            return res.status(404).json({ "message": "O ponto informado não foi encontrado." });
        }

        const parameter = await knex('parametros_registro').insert({
            id_ponto,
            id_parametros_limite,
            data_coleta: data,
            valor_parametro: valor
        }).returning('*');


        return res.status(201).json()

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}


const getParameter = async (req, res) => {
    const { id_parametro } = req.params;
    const { id_ponto } = req.query;

    try {

        if (id_ponto) {

            const point = await knex('pontos').where({ 'id': id_ponto }).first();
            if (!point) {
                return res.status(409).json({ message: "Este ponto não está cadastrado." })
            }

            const parametros = await knex('parametros_registro').join('pontos', 'id_ponto', 'pontos.id').join('parametros_limite', 'id_parametros_limite', 'parametros_limite.id').select('*').where('parametros_limite.id', id_parametro).andWhere('pontos.id', id_ponto);

            return res.status(200).json(parametros);
        }

        const parametros = await knex('parametros_registro').join('pontos', 'id_ponto', 'pontos.id').join('parametros_limite', 'id_parametros_limite', 'parametros_limite.id').select('*').where('parametros_limite.id', id_parametro);
        return res.status(200).json(parametros);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}



const getIrregularParameters = async (req, res) => {
    try {
        const point = await knex.raw('SELECT pontos.id, parametros_registro.data_coleta, parametros_registro.valor_parametro, pontos.ponto_x, pontos.ponto_y, parametros_limite.nome, parametros_limite.unidade_de_medida FROM parametros_registro JOIN parametros_limite ON id_parametros_limite = parametros_limite.id  FULL JOIN pontos ON id_ponto = pontos.id WHERE parametros_registro.valor_parametro >= parametros_limite.valor_limite GROUP BY pontos.id, parametros_registro.data_coleta, parametros_registro.data_coleta, parametros_registro.valor_parametro, parametros_limite.nome, parametros_limite.unidade_de_medida');

        return res.status(200).json(point.rows)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { addParameter, getIrregularParameters, getParameter }
