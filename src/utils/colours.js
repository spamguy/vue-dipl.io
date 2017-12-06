export default {
    getColourSetForVariant(variant) {
        switch (variant) {
        case 'Ancient Mediterranian': return {
            Rome: '#f00',
            Greece: '#00f',
            Egypt: '#bbb',
            Persia: '#f0f',
            Carthage: '#0f0'
        };
        default: return {
            Austria: '#f00',
            England: '#00f',
            Russia: '#bbb',
            France: '#f0f',
            Germany: '#000',
            Italy: '#0f0',
            Turkey: '#fff500'
        };
        }
    }
};
