# Altimus

Local setup for the project :
Prerequisite: Node must be installed on your system, if not follow this https://nodejs.org/en/download.

Client code : 
1. Run **npm install** inside the client folder in the terminal.
2. Run **npm run dev** to run the client code locally.
3. The server will start mostly on port 5173 if not check the terminal for the port it started and open the browser with http://localhost:5173/.

For the application to work properly, we need the backend code to be running locally.

Server code: 
1. Run **npm install** inside the server folder in the terminal.
2. Run **npm run dev** to run the server code locally.
3. The server will start mostly on port 1337.
4. If the 1337 port is not available or you want to change it the change in the server folder go to index.js and change the line where it says app.listen(1337, ())
5. Post which go to the client folder and change the port in the vite.config.js file and change the line => target: "http://localhost:1337", to the respective port of the backend.

Now your application will run without any issues in local. 
DB is already running on MongoDB atlas which is on the cloud so no need to setup the database. 

