## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

# How to run the project

1- Git clone repository  
2- run <code>npm i</code>  
3- once the install is complete run <code>npm run start</code>  
4- make sure to create an .env file and populate it with the below variables

    REACT_APP_ACCESS_TOKEN // Unsplash Access Token
        
    REACT_APP_REDIRECT_URI // where the project is running example (http://localhost:3000)

    REACT_APP_BASE_URL // unsplash base url (https://api.unsplash.com/)
    
    REACT_APP_CLIENT_SECRET // Client secret you obtain from unsplash api

    REACT_APP_PORT // Port you're running
