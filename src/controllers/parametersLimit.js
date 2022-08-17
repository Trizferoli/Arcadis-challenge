const knex = require('../connection');

const getAllParametersLimit = async (req, res) => {
    try {

        const parametersLimit = await knex('parametros_limite');
        console.log(parametersLimit)

        return res.status(200).json(parametersLimit);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllParametersLimit }