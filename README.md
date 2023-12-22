Области хранения данных:

-   база данных на json-server
-   BFF
-   Редакс стор (будут храниться состояния приложений)

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), Стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Стор (использование на клиенте)
-   статья: БД (список статей), Стор (отображение в браузере)
-   комментарий: БД (список комментариев), Стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registed_at / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

-   сесия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-   user: id / login / roleId / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registeredAt / role
