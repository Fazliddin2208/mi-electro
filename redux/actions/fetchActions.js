export const execute = (value) => ({
    type: 'EXECUTE',
    value,
});

export const notExecute = (value) => ({
    type: 'NOT_EXECUTE',
    value,
});