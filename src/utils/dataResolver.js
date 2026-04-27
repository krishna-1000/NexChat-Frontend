
export const asArray = (data) => {

    if(!Array.isArray(data)){
        console.warn("unexpected Array data formate ",data)
    }
  return  Array.isArray(data) ? data : []
};
export const asObject = (data) => (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};