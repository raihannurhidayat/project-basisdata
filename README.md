
<h1 align="center">
</a>
  <br>
  SHIL.IT
  <br>
</h1>

<h4 align="center">Aplikasi forum interaktif sederhana.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Features

* User authentication
  - Register
  - Login
  - Admin permissions
* User
  - Update or delete user
* Thread
  - Read Threads
  - Create, update or delete thread
* Post
  - Create, read, update or delete post
* Search for user, thread or post

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```powershell
# Clone this repository
git clone https://github.com/raihannurhidayat/project-basisdata.git

# Go into the repository
cd project-basisdata
```
Run Server
```powershell
# Set up virtual environment
python -m venv venv

# Install dependancies
pip install -r requirements.txt

# Go into the project server directory
cd server/main/

# Migrate database
python manage.py migrate

# Run Server
python manage.py runserver

```
Run Client
```powershell
# Go into project client directory
cd project-basisdata/client/

# Install dependencies
npm i

# Run the app
npm run dev
```

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Django](https://github.com/django/django)
- [React](https://github.com/facebook/react)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- And more

## License

This project is licensed under the [MIT License](https://github.com/raihannurhidayat/project-basisdata/blob/master/LICENSE)

---
