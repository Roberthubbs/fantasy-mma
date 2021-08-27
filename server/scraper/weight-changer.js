export const weightChanger = (weight) => {
    if (weight.includes('HEAVYWEIGHT') && !weight.includes('LIGHT')){
        return 'HW'
    } else if (weight.includes('HEAVYWEIGHT') && weight.includes('LIGHT')){
        return 'LHW'
    } else if (weight.includes('MIDDLE') ){
        return 'MW'
    } else if (weight.includes('WELTER') ){
        return 'WW'
    }   else if (weight.includes('LIGHTWEIGHT')){
        return 'LW'
    } else if (weight.includes('FEATHERWEIGHT') && !weight.includes('WOMAN')){
        return 'FW'
    } else if (weight.includes('BANTAMWEIGHT') && !weight.includes('WOMAN')){
        return 'BW'
    }  else if (weight.includes('FLYWEIGHT') && !weight.includes('WOMAN')){
        return 'FLW'
    } else if (weight.includes('BANTAMWEIGHT') && weight.includes('WOMAN')){
        return 'WBW'
    } else if (weight.includes('FEATHERWEIGHT') && weight.includes('WOMAN')){
        return 'WFW'
    }  else if (weight.includes('FLYWEIGHT') && weight.includes('WOMAN')){
        return 'WFLW'
    } else if (weight.includes('STRAW')){
        return 'WSW'
    }
}