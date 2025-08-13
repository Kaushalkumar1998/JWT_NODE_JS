const ValidateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        req.body = value
        next();
    };
}

export default ValidateBody;