# API Endpoints
## Superuser (Only use for cleanup)
Destroy action mean permanently remove an object from database
| HTTP Verbs | Endpoints                | Authenticate | Action         |
| ---------- | ------------------------ | ------------ | -------------- |
| DELETE     | api/admin/users/:slug/   | Superuser    | Destroy user   |
| DELETE     | api/admin/threads/:slug/ | Superuser    | Destroy thread |
## Search
Destroy action mean permanently remove an object from database
| HTTP Verbs | Endpoints   | Authenticate | Action                                                  |
| ---------- | ----------- | ------------ | ------------------------------------------------------- |
| GET        | api/search/ | User         | Search for users, threads and posts that contains query |
## Authentication
| HTTP Verbs | Endpoints          | Authenticate | Action                                 |
| ---------- | ------------------ | ------------ | -------------------------------------- |
| POST       | api/auth/register/ | Anonymous    | Register new user                      |
| POST       | api/auth/login/    | Anonymous    | Authenticate user (email and password) |
| POST       | api/auth/refresh/  | User         | Refresh access token if needed         |
| POST       | api/auth/logout/   | User         | Logout user                            |
## User
| HTTP Verbs | Endpoints        | Authenticate | Action                             |
| ---------- | ---------------- | ------------ | ---------------------------------- |
| GET        | api/users/       | Admin        | Get all active users               |
| GET        | api/users/:slug/ | User         | Get user detail                    |
| PUT        | api/users/:slug/ | User         | Update user detail                 |
| DELETE     | api/users/:slug/ | User         | Delete user (set user as inactive) |
## Category
| HTTP Verbs | Endpoints             | Authenticate | Action                                        |
| ---------- | --------------------- | ------------ | --------------------------------------------- |
| GET        | api/categories/       | User         | Get all categories                            |
| POST       | api/categories/       | User         | Create new category                           |
| GET        | api/categories/:slug/ | User         | Get categories detail and all threads related |
| PUT        | api/categories/:slug/ | User         | Update category detail                        |
| DELETE     | api/categories/:slug/ | User         | Destroy category (not reccomended)            |
## Thread
| HTTP Verbs | Endpoints          | Authenticate | Action                                  |
| ---------- | ------------------ | ------------ | --------------------------------------- |
| GET        | api/threads/       | User         | Get all active threads                  |
| POST       | api/threads/       | User         | Create new thread                       |
| GET        | api/threads/:slug/ | User         | Get thread detail and all posts related |
| POST       | api/threads/:slug/ | User         | Create new post in current thread       |
| PUT        | api/threads/:slug/ | User         | Update thread detail                    |
| DELETE     | api/threads/:slug/ | User         | Delete thread (set thread as inactive)  |
## Post
| HTTP Verbs | Endpoints             | Authenticate | Action                                  |
| ---------- | --------------------- | ------------ | --------------------------------------- |
| GET        | api/posts/            | User         | Get all posts                           |
| GET        | api/:thread/:post_id/ | User         | Get post in specified thread            |
| PUT        | api/:thread/:post_id/ | User         | Update post content in specified thread |
| DELETE     | api/:thread/:post_id/ | User         | Delete post in specified thread         |
