const yup = require('./yupConfig');

const schemaAddParameter = yup.object().shape({
    id_ponto: yup.number().strict().required(),
    id_parametros_limite: yup.number().strict().required(),
    valor: yup.number().required(),
    data: yup.date().required()
});

module.exports = schemaAddParameter;