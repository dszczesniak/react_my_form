export function setCleanState(){
    return{
        type: 'SET_CLEAN_STATE',
        payload: {
                form: [{
                    id: 0,
                    name: `form_${0}`,
                    subInpCount: 0
                }]
        }
    }
}

export function addFirstComponent(props){
    var lastForm = props[props.length-1];
    props[1] !== undefined ? console.log(props[1].form[0].id) : console.log("rfrfr")

    return props[0] != undefined ?

    {
        type:'ADD_FIRST_COMPONENT',
        payload: {
            form:[{
                        id: lastForm.form[0].id+1,
                        name: `form_${lastForm.form[0].id+1}`,
                        subInpCount: 0
                    }]
        }
    } 

    :

    {
        type:'ADD_FIRST_COMPONENT',
        payload: {
            form:[{
                        id: 0,
                        name: `form_${0}`,
                        subInpCount: 0
                    }]
        }
    }

}