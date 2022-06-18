# chat-application-React-node

Project consists of two folders: `backend` and `frontend`. In backend we have `index` file used as server for socket connection. Frontend folder contains React web app with routing.

## installation & initialization:

Both folders can start with `npm start`. In order for the chat app to function, we need to run them at the same time. Before that we install backages and then start.

In root  
 `cd frontend; npm i; cd ../backend; npm i; npm start`  
or  
`cd frontend && npm i && cd ../backend && npm i && npm start`

then in new terminal tab:  
`cd frontend; npm start`

# Functionality:

1. `/nick <name>` - sets your name for the chat.
2. `/think <message>` - makes the text appear in dark grey, instead of black.
3. `/oops` - removes the last message sent.
4. `(smile)` should produce a smiley face, `(wink)` should produce a winking face.
5. When a new message arrives, it should slide in, and the messages above slide up.
6. `/fadelast` - would fade out the last message to 10% visibility.
7. `/countdown <number> <url>` - would start a visible countdown on the other persons browser, and at the end of the countdown redirect them to the URL specified.
8. `/highlight <message>` - would make the font of the message 15% bigger and BOLD.
