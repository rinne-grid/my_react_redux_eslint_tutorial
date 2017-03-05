let nextTodoId = 0;

/**
 * Todoの追加
 * @param {String} text
 * @return {Object} action
 */
function addToDo(text) {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text,
    };
}

/**
 * Todoの完了/未完了
 * @param {Number} id
 * @return {Object} action
 */
function toggleToDo(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id,
    };
}

// 公開のため、この行を追加してあげないと、呼び出せない
export {addToDo, toggleToDo};
