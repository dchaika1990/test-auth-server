## Запросы к серверу

1. **Login**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/login** . Передовать данные в формате JSON в следующем виде: 
```js
{
    email: '',
    password: ''
}
```
*Сервер вернет token в виде строки, пример токена: `6a58824a-4bfa-44ab-b415-a145ce80913e`*

2. **Signup**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/signup** . Передовать данные в формате JSON в следующем виде: 
```js
{
    email: '',
    name: '',
    password: ''
}
```
*Сервер вернет token в виде строки, пример токена: `6a58824a-4bfa-44ab-b415-a145ce80913e`*

3. **Verify**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/verify** . Передовать данные в формате JSON в следующем виде: 
```js
{
    token: '',
}
```
*Сервер вернет Имя пользователя в виде строки, пример токена: `Easycode user`*
---

## Данные для входа
```js
email: test@test@com
password: Easycode1234

```
---

## Если сервер упал
Перейдите по адресу https://easycode-test-auth-server.herokuapp.com/test