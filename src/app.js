// 'use strict';

import {createStore} from 'redux';
import {addToDo, toggleToDo} from './actions/TodoAction';
import TodoReducer from './reducers/TodoReducer';

import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

// const TodoReducer = require('./reducers/TodoReducer');
// const TodoAction = require('./actions/TodoAction')

// /**
//  * @param {object} state
//  * @param {object} action
//  * @return {object} state
//  */
// function reducer(state, action) {
//     return state;
// }

// const store = createStore(reducer, {todo: []});
// console.log(store.getState());

const store = createStore(TodoReducer, {todo: []});
// store.subscribe(() => console.log(store.getState()));

// console.log('買い物を追加');
// store.dispatch(addToDo('買い物に行く'));

// console.log('銀行を追加');
// store.dispatch(addToDo('銀行に行く'));

// console.log('銀行に行くをDone');
// store.dispatch(toggleToDo(1));

const App = () => (
    <div>
        <AddToDoComponent />
        <ToDoListComponent />
    </div>
);


// AddToDoComponentはconnect関数でラップされて使用される
// connect関数でラップされたコンポーネントは引数としてdispatch関数を受け取る
// --> storeに紐づけられたReduxのdispatch関数
//     dispatch関数はonClickなどのView側の操作により、Storeに対してActionを投げたいときに使用する
let AddToDoComponent = ({dispatch}) => {
    let input;


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addToDo(input.value));
        input.value = '';
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref ={
                    (node) => {
                        input = node;
                    }
                }
                />
                <button>Todoに追加する</button>
            </form>
        </div>
    );
};


// reduxとReactコンポーネントの接続を行う
AddToDoComponent = connect()(AddToDoComponent);

let ToDoListComponent = ({todo, dispatch}) => {
    return (
        <ul>{
            todo.map( (t) => {
                return <li key={t.id}>
                    {/* spanタグと、checkboxを追加 */}
                    <span style={{textDecoration: t.completed 
                                        ? 'line-through': 'none'}}>
                        {t.text}
                        <input type="checkbox" 
                            onClick={ (e) => { dispatch(toggleToDo(t.id)); }}
                            checked={t.completed}
                        />
                    </span>
                </li>;
            })
        }</ul>
    );
};

/**
 * Storeが更新されるたび、Storeの情報が渡るため、Reactのプロパティとして変換する
 * @param {Object} state
 * @return {Object} state
 */
function mapStateToProps(state) {
    return {
        todo: state.todo,
    };
}

ToDoListComponent = connect(mapStateToProps)(ToDoListComponent);


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
