export function setCleanState() {
    return {
        type: 'SET_CLEAN_STATE',
        payload: [{
            id: 0,
            name: `form_${0}`,
            subInpCount: 0
        }]
    }
}

export function addFirstComponent(props) {
    var lastForm = props[props.length - 1];

    return {
        type: 'ADD_FIRST_COMPONENT',
        payload: [{
            id: lastForm.id + 1,
            name: `form_${lastForm.id + 1}`,
            subInpCount: 0
        }]
    }

}