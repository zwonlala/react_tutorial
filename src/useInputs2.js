import { useReducer, useCallback } from 'react';

function reducer(state, action) {
    switch(action.type) {
        case 'CHANGE':
            const { name, value } = action;
            return {
                ...state,
                [name] : value
            };

        case 'RESET':
            return  action.initialState;

        default :
            throw new Error('Unhandled action');
    }
}

function useInputs2 (initialState) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type : 'CHANGE',
            name,
            value
        });
    }, [])

    const reset = useCallback(() => dispatch({type:'RESET', initialState}), []);

    return [state, onChange, reset];
}

export default useInputs2;