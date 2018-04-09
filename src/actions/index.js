export function setCleanState(){
    return{
        type: 'SET_CLEAN_STATE',
        payload: {
                items: [],
                counter: 0
        }
    }
}

export function addFirstComponent(props){
    return{
        type:'ADD_FIRST_COMPONENT',
        payload: {
            items: [{
                        id: props.counter+1,
                        name: `form_${props.counter+1}`,
                        subInpCount: 0
                    }],
            counter: props.counter+1
        }
    }

}