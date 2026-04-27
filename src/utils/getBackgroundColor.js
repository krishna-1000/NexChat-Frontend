const getBackgroundColor = (username) => {
    const colors = [
        '#FF5733', // Coral
        '#33FF57', // Grass Green
        '#3357FF', // Royal Blue
        '#F333FF', // Fuchsia
        '#FF33A1', // Hot Pink
        '#33FFF3'  // Aqua
    ];

    if (!username) return '#cccccc'; 
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash += username.charCodeAt(i);
    }
    const index = hash % colors.length;

    return colors[index];
};

export default getBackgroundColor;