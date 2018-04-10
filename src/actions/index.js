export function addFirstComponent(oldProps) {
    var lastForm;
    oldProps.length !== 0 ?
        lastForm = oldProps[oldProps.length - 1]
        :
        lastForm = {id:-1};


    return {
        type: 'ADD_FIRST_COMPONENT',
        payload: [{
            id: lastForm.id + 1 ,
            idParent:null, //do not for change
            level:0,       //do not for change
            tree:[]        //do not for change
        }]
    }
}

export function addChildComponent(oldProps, actualProps) {
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
            tree
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