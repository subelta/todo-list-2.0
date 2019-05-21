# todo-list-2.0
Todo List with React and Ring UI

Можно помечать выполненными, добавлять, редактировать, удалять дела, фильтровать по принципу выполненности.

Берет список либо из localStorage, если там ничего нет, то из jsona, который лежит в папке incoming-data
Чтение невалидного или отсутствующего JSONа влечет исключение и всплывающее окно с ошибкой

Формат JSONа следующий: 
~~~
{ 
    "todoList" : [
        {
            "id": 1,
            "task": "walk the dog",
            "completed": "false"
        },
     ]
 }
~~~

Пустой проект создан вот [этим](https://github.com/JetBrains/ring-ui#quick-start) путем
