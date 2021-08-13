module.exports = {
    selectFWSTN: function (stringWeight){
        let range;
        switch (stringWeight) {
            case 'HW':
                range = [206.1, 266];
                break;
            case 'LHW':
                range = [186.1, 206];
                break;
            case 'MW':
                range = [170.1, 186];
                break;
            case 'WW':
                range = [155.1, 171];
                break;
            case 'LW':
                range = [146.1, 156];
                break;
            case 'FW':
                range = [136.1, 146];
                break;
            case 'WFW':
                range = [136.1, 146];
                break;
            case 'BW':
                range = [126.1, 136];
                break;
            case 'WBW':
                range = [126.1, 136];
                break;
            case 'FLW':
                range = [0, 126];
                break;
            case 'WFLW':
                range = [116.1, 126];
                break;
            case 'WFLW':
                range = [116.1, 126];
                break;
            case 'WSW':
                range = [0, 116];
                break;
        }
        return range;
    }
}


    