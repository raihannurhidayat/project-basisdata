# API Endpoints
## Superuser (Only use for cleanup)
Destroy action mean permanently remove an object from database
| HTTP Verbs | Endpoints                | Authenticate | Action         |
| ---------- | ------------------------ | ------------ | -------------- |
| DELETE     | api/admin/users/:slug/   | Superuser    | Destroy user   |
| DELETE     | api/admin/threads/:slug/ | Superuser    | Destroy thread |
## Authentication
| HTTP Verbs | Endpoints         | Authenticate | Action                                 |
| ---------- | ----------------- | ------------ | -------------------------------------- |
| POST       | api/auth/register | Anonymous    | Register new user                      |
| POST       | api/auth/login/   | Anonymous    | Authenticate user (email and password) |
| POST       | api/auth/refresh/ | User         | Refresh access token if needed         |
| POST       | api/auth/logout/  | User         | Logout user                            |
## User
| HTTP Verbs | Endpoints        | Authenticate | Action                             |
| ---------- | ---------------- | ------------ | ---------------------------------- |
| GET        | api/users/       | Admin        | Get all active users               |
| GET        | api/users/:slug/ | User         | Get user detail                    |
| POST       | api/users/:slug/ | User         | Register new user                  |
| PUT        | api/users/:slug/ | User         | Update user detail                 |
| DELETE     | api/users/:slug/ | User         | Delete user (set user as inactive) |
## Thread (NOT YET IMPLEMENTED)
| HTTP Verbs | Endpoints          | Authenticate | Action                                  |
| ---------- | ------------------ | ------------ | --------------------------------------- |
| GET        | api/threads/       | User         | Get all active threads                  |
| GET        | api/threads/:slug/ | User         | Get thread detail and see posts related |
| POST       | api/threads/:slug/ | User         | Create new thread                       |
| PUT        | api/threads/:slug/ | User         | Update thread detail                    |
| DELETE     | api/threads/:slug/ | User         | Delete thread (set thread as inactive)  |
## Post (NOT YET IMPLEMENTED)
| HTTP Verbs | Endpoints                   | Authenticate | Action                                  |
| ---------- | --------------------------- | ------------ | --------------------------------------- |
| GET        | api/:thread/posts/:post_id/ | User         | Get post in specified thread            |
| POST       | api/:thread/posts/:post_id/ | User         | Create a new post in specified thread   |
| PUT        | api/:thread/posts/:post_id/ | User         | Update post content in specified thread |
| DELETE     | api/:thread/posts/:post_id/ | User         | Delete post content in specified thread |
