export const ResponseServer = (code, message, response, data) => {
    return response.status(code).json({
        code: code,
        msg: message,
        data: data? data : null
    });
};