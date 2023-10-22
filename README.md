# libraries

- tailwind css for bootstraping and creating templates from login and registration page
- jest,supertest and RTL for testing
- forgot password isnt working as its not hosted and link goes via email as localhost

# Installation

Run the following command to clone the repository

````
Go to ```app``` and ```backend``` directory to install packages
````

cd app
npm install

```

```

cd backend
npm install

````
# Configuration
Create ```.env``` file inside ```backend``` directory and copy the following code

````

MONGO_URI=Your mongodb URI
GMAIL_USERNAME=your gmail address
GMAIL_PASSWORD=password created inside 'App Password' section under google accounts setting
PORT=8000
JWT_SECRET=a random secret key eg. thisisasecretkey

````
# Run the App
Go to ```backend``` and ```app``` directory and start the server
````

cd backend
nodemon server

```

```

cd frontend
npm start

```

```
