/**
 * @file
 * @author cjw
 * Created by cjw on 16/5/27.
 */
var action = {
  addTodo: function (text){
      return {
          type: 'add',
          text:text
      }
  },
  delTodo: function (id) {
      return {
          type: 'del',
          id: id
      }
  },
  showTodo: function (filter) {
      return {
          type: 'show',
          filter: filter
      }
  }
};
var filter = {};
var initState = {
    todoList:[],
    filter: filter,
    id: 0
};

var reducer = function (state, action) {
    state = state || initState;
    switch (action.type) {
        case 'add':
            state.todoList.push({
                id: state.id+1,
                text: action.text
            });
            state.id++;
            return state;
        case 'del':
          /* state.todoList.filter(function (item) {
                return item !==  action.id;
            });*/
            if(state.todoList.length > 0) {
                for (var i=0; i < state.todoList.length; i++) {
                    if (action.id == state.todoList[i].id) {
                        state.todoList.splice(0,1);
                    }
                };
            }

            return state;
        default:
            return state;
    }
};

/*
* reducer 多个的处理
* */

var reducer1 = function (state, action) {
    state = state || initState;
    switch (action.type) {
        case 'add':
            state.todoList.push({
                id: state.id+1,
                text: action.text
            });
            state.id++;
            return state;
        default:
            return state;
    }
};
var reducer2 = function (state, action) {
    state = state || initState;
    switch (action.type) {
        case 'del':
            if(state.todoList.length > 0) {
                for (var i=0; i < state.todoList.length; i++) {
                    if (action.id == state.todoList[i].id) {
                        state.todoList.splice(0,1);
                    }
                };
            }
            return state;
        default:
            return state;
    }
};

var combineReducers = Redux.combineReducers;


var rootReducer = combineReducers({
    reducer1:reducer1,
    reducer2:reducer2
});

//var store = Redux.createStore(reducer);

var store = Redux.createStore(rootReducer);



function renderData (state) {
    var ul = document.getElementById('ui');
    var html = '';
    state.todoList.forEach(function (item) {
       /* var li = document.createElement('li');
        var span = document.createElement('span');
        span.innerHTML = item.text;
        li.appendChild(span);*/
        html += '<li><span>' + item.text + '</span><span data="'+item.id+'" onclick="del(this);" class="del">删除</span></li>'
    });
    ul.innerHTML = html;
}

var button = document.getElementById('button');
button.addEventListener('click', function (e) {
    var value = document.getElementById('name').value;
    if (value) {
        store.dispatch(action.addTodo(value));
        renderData(initState);
    }
    document.getElementById('name').value= '';
});
function del(id) {
    console.log (id.getAttribute('data'));
     store.dispatch(action.delTodo(id.getAttribute('data')));
    renderData(initState);
};

store.subscribe(function () {
    console.log(initState);
});









