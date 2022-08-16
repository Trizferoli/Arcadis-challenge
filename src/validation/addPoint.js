const yup = require('./yupConfig');

const schemaAddPoint = yup.object().shape({
    x: yup.number().strict().required(),
    y: yup.number().strict().required()
})

module.exports = schemaAddPoint;