const yup = require('./yupConfig');

const schemaAddPoint = yup.object().shape({
    x: yup.number().required(),
    y: yup.number().required()
})

module.exports = schemaAddPoint;
