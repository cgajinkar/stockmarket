
const OK = (data, responseCode = 200) => {
    return {
        data: data,
        code: responseCode,
        status: 'success'
    };
};

const ERROR = (error, responseCode = 500) => {
    if (error.name !== undefined && error.name === 'ValidationError') {
        responseCode = 422;
        return {
            code: responseCode,
            type: 'Validation Error',
            message: 'Validation Error',
            status: 'fail',
            error: error
        };
    } else {
        return {
            error: error,
            code: responseCode,
            status: 'error'
        };
    }
};

module.exports = { OK, ERROR }; 