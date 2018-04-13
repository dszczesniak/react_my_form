export function addFirstComponent(oldProps) {
    var lastForm;
    oldProps !== undefined ?
        oldProps.length !== 0 ?
            lastForm = oldProps[oldProps.length - 1]
            :
            lastForm = {id:-1}
    :lastForm = {id:-1};

    return {
        type: 'ADD_FIRST_COMPONENT',
        payload: [{
            id: lastForm.id + 1 ,
            idParent:null,
            level:0,
            tree:[],
            dataForm:{
                question:'',
                type:'radio',
                answer:''
            }
        }]
    }
}

export function addChildComponent(oldProps, actualProps, type) {
    var lastForm = oldProps[oldProps.length - 1];
    var tree =[];

    for(let item of actualProps.tree){
            tree.push(item);
    }
    tree.push(actualProps.id)

    return {
        type: 'ADD_CHILD_COMPONENT',
        payload: [{
            id: lastForm.id + 1,
            idParent: actualProps.id, 
            level: actualProps.level+1,
            tree,
            dataForm:{
                question:'',
                type:'radio',
                condition:'===',
                conditionAnswer:'',
                answer: type==='radio' ? 'yes' : ''
            }
        }]
    }
}

export function deleteForm(props){
    var allForms = props.allForms;
    for(let num in allForms){
        if(allForms[num].tree.includes(props.id) || allForms[num].id === props.id ){
            allForms.splice(num, 1)
            deleteForm(props);
        }
    }

    return{
        type:'DELETE_FORM',
        payload: allForms
    }
}

export function addDataToForm(newData, id){

    return{
        type:'ADD_NEW_DATA_FORM',
        payload: newData,
        id
    }
}


export function sortFormsForDisplay(forms){
    var tab =[];
    if(forms){
        for(let item1 of forms){
            if(!tab.includes(item1)){
                tab.push(item1);
                for(let item2 of forms){
                    item2.tree.includes(item1.id) ? tab.push(item2) : null
                }
            }
        }
    }
    
    return {
        type:'SORT_FORMS',
        payload: tab
    }
}