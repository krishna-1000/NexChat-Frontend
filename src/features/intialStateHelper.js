export const createInitialState = (extraFields = {})=> ({
    loading : false,
    error :null,
    ...extraFields
    
})