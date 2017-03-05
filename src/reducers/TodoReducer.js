
/**
 * Actionに従ってstateの状態を変更する
 * @param {Object} state
 * @param {Object} action
 * @return {Object} state
 */
function TodoReducer(state, action) {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                // stateに対して直接pushして変更を加えず、concatによって新たに追加したstateを返す
                todo: state.todo.concat({
                    id: action.id,
                    text: action.text,
                    completed: false,
                }),
            };
        case 'TOGGLE_TODO':
            return {
                todo: state.todo.map((t) => {
                    if(t.id !== action.id) {
                        return t;
                    }
                    // state自身を壊さないように、タスクん完了/未完了を設定
                    return Object.assign({}, t, {completed: !t.completed});
                }),
            };
        default:
            return state;
    }
}

export default TodoReducer;
