#для того чтобы стартануть сервер, надо скачать nodejs
#https://nodejs.org/en/
#после этого надо открыть консоль в директории проекта, и выполнить команду
npm install
#эта команда установит необходимые зависимости
#после этого надо ввести команду
node index.js
#эта команда запустит веб сервер
#для того чтобы проверить, все ли в порядке, надо открыть в браузере странцу
#http://localhost
#там должна быть надпись this is index page


#устанавливаем webpack - вводим команду (флаг -g - global)
npm install -g webpack
#устанавливаем webpack-cli - вводим команду (флаг -g - global)
npm install -g webpack-cli
#собираем клиентскую часть вызовом команды
webpack
#после вызова этой команды все файлы из директории client будут перенесены в файл assets/js/bundle.js


#api
#для того чтобы пользоваться API, надо установить программу postman
#https://www.getpostman.com/apps
#в настройках запроса postman надо найти вкладку headers и добавить заголовок
#Content-Type: application/json
#перейти во вкладку body, и нажать на кнопку raw (по умолчанию стоит form-data)

#запросы с типом get отправляются без тела запроса
#запросы с типом post, delete, put отправляются с телом запроса

#запросы для контроллера users:
#get http://localhost/users/1    - возвращает пользователя с идентификатором 1

#post http://localhost/users/list   - возвращает список пользователей. Тело запроса
#{"pagination": {"skip": 0, "pageSize": 10}, "filter": {"email": "email@email.com"}}  < параметр filter не является обязательным

#post http://localhost/users/save   - возвращает список пользователей. Тело запроса
#{"id": 1, "email": "email@gmail.com", "password": "asdf"}  < если передан параметр id, то пользователь будет обновлен


