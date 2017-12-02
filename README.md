## Запросы к серверу

1. **Login**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/login** . Передовать данные в формате JSON в следующем виде: 
```js
{
    email: 'example@example.com', // должен быть в правильном формате example@example.com
    password: 'Examplepassword1' // пароль должен состоять минимум из 8 символов и должен содержать хотя бы одну Большую букву и хотя бы одну цифру
}
```
*Сервер вернет token в виде строки, пример токена: `6a58824a-4bfa-44ab-b415-a145ce80913e`*

2. **Signup**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/signup** . Передовать данные в формате JSON в следующем виде: 
```js
{
    email: 'example@example.com', // должен быть в правильном формате example@example.com
    name: 'examplename', // имя должно быть только английскими буквами от 3 до 16 символов
    password: 'Examplepassword1' // пароль должен состоять минимум из 8 символов и должен содержать хотя бы одну Большую букву и хотя бы одну цифру
}
```
*Сервер вернет token в виде строки, пример токена: `6a58824a-4bfa-44ab-b415-a145ce80913e`*

3. **Verify**. Метод запроса: **POST**, url: **https://easycode-test-auth-server.herokuapp.com/verify** . Передовать данные в формате JSON в следующем виде: 
```js
{
    token: '6a58824a-4bfa-44ab-b415-a145ce80913e', // пример токена который вы должны передать на сервер
}
```
*Сервер вернет Имя пользователя в виде строки, пример: `Easycode user`*

---

## Тестовые данные для входа
```js
email: test@test@com
password: Easycode1234

```
*Сервер вернет token в виде строки, пример токена: `6a58824a-4bfa-44ab-b415-a145ce80913e`*

---

## Если сервер упал
Перейдите по адресу https://easycode-test-auth-server.herokuapp.com/test