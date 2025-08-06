function successResponse(info, data = null) {
    return {
        info,
        status: "success",
        data
    };
}

function errorResponse(info, error = null) {
    return {
        info,
        status: "error",
        error
    };
}

module.exports = {
    successResponse,
    errorResponse
};
