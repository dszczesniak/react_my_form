export function addFirstComponent(forms) {
    var lastForm;
    forms !== undefined ?
        forms.length !== 0 ?
            lastForm = forms[forms.length - 1]
            :
            lastForm = { id: -1 }
        : lastForm = { id: -1 };

    return {
        type: 'ADD_FIRST_COMPONENT',
        payload: [{
            id: lastForm.id + 1,
            idParent: null,
            level: 0,
            childs: [],
            history:[],
            isDisplayed: true,
            dataForm: {
                question: '',
                type: 'radio',
                answer: ''
            }
        }]
    }
}

export function addChildComponent(props, type) {
    const forms = props.forms;
    const lastForm = forms[forms.length - 1];
    var history =[];
 
     for(let item of props.history){
             history.push(item);
     }
     history.push(props.id)

    return {
        type: 'ADD_CHILD_COMPONENT',
        payload: [{
            id: lastForm.id + 1,
            idParent: props.id,
            level: props.level + 1,
            childs:[],
            history,
            isDisplayed: false,
            dataForm: {
                question: '',
                type: 'radio',
                condition: '===',
                conditionAnswer: type === 'radio' ? 'yes' : '',
                answer: ''
            }
        }]
    }
}

export function deleteForm(props) {
    var id = props.id;
    var allForms = props.allForms;
    for (let num in allForms) {
        if (allForms[num].history.includes(props.id) || allForms[num].id === props.id) {
            allForms.splice(num, 1)
            deleteForm(props);
        }
        if (allForms[num]){
            if(allForms[num].childs.includes(props.id)){
                var childs = allForms[num].childs;
                for(let index in childs){
                    if(childs[index] === props.id){
                        childs.splice(index, 1)
                    }
                }
            }
        }
    }

    return {
        type: 'DELETE_FORM',
        newChildren: childs,
        id
    }
}

export function addDataToForm(newData, id) {

    return {
        type: 'ADD_NEW_DATA_FORM',
        payload: newData,
        id
    }
}

export function addChildToTree(props){
    var lastForm = props.forms[props.forms.length - 1];

    var childs = [];

    for (let item of props.childs) {
        childs.push(item);
    }
    childs.push(lastForm.id + 1);

    return {
        type: 'ADD_CHILD_TO_TREE',
        toSearchId: props.id,
        newChilds: childs
    }
}
