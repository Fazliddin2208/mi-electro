export const addLocation = (city) => ({
    type: 'ADD_LOCATION',
    city,
});

export const removeLocation = (city) => ({
    type: 'REMOVE_LOCATION',
    city,
});