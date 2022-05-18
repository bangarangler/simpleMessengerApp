# Simple Messenger App

## Running the Application

use `asdf` or `nvm` / any prefered method to work in different Node versions and
install Node 18.1.0

I use tmux but you can open multiple terminals or proceed as you would normally go
about your business.

1. git clone the repo
2. copy and paste the .env.example and create a .env inside the backend
   directory. Paste it inside `backend/.env` (I've pushed up the creds in
   .env.example.) Let me know when your finished with it and I'll delete the
   free test DB. It's open and should connect with the provided credentials.
   (Never do this for actual app, but for the sake of this POC here ya go ; ))
3. from the root directory run `make install` (this will install for backend and
   frontend). Once finished continue.
4. from the root directory in one terminal run `make startBE` (this will start up
   the backend). alternatively you could `cd backend && npm run dev`
5. from the root directory in second termianl run `make startFE` (this will start
   up the frontend). alternatively you could `cd frontend && npm start`
6. profit... Open a few browser tabs and join the conversation. Please ignore
   the styles. They are super minimal and I didn't take the time to worry
   about it. I'm a bit OCD and that could easily have taken over my life if I
   looked at it more than twice (lol).

## Tech Used

- Node
- GraphQL
- JavaScript
- TypeScript
- React
- MongoDB

## Design Decisions

Many ways to complete this task. Server-side-events, tools like socket.io,
pusher, long polling, websockets, etc.

I love graphQL and any chance to mess around with it I'm happy to tinker around.
Also the "tooling" around TypeScript and GraphQL is really fantastic! I didn't
utilize a lot of the things I normally would here as they are time consuming to
set up however the net benefit for a team is wonderful. Would highly recomend
it and look forward to chatting about it.

I used a basic node express with apollo-server to handle the GraphQL api. I did
not use TypeScript as I wanted you guys to see older code and newer TypeScript
code in the frontend. I would prefer TypeScript throughout.

I used MongoDB Atlas as it's fast to set up and get up and running. Didn't want
to waste time migrating tables and messeing with SQL for such a small ask.

On the frontend I spun up a simple create-react-app TypeScript template and used
react-query and apollo/client for the subscriptions.

There are a ton of tools and libraries that you could use. I used apollo
because it's simple to set up the subscription support. And react-query becuase
it's amazing and shows familiarity with multiple tools on the frontend.

## Future Enhancments

Where do I begin?

1. I would change the whole backend to TypeScript.
2. I would leave express and use Fastify or another more performant node
   backend.
3. I might implement it in Go as I absolutly love coding in Go and it would be
   much faster. (not a need here. Node is a great choice and popular choice for
   real-time apps. Wonderful tooling and support and well equipped to handle
   the job).
4. Add tests (and not silly 100% coverage useless tests. But good unit tests and
   E2E testing probably with cypress, possibly with jest)
5. I would remove mongoose, as I've ran into trouble with it in the past as it
   updates much slower than the mongodb drivers and I'm not a giant fan of OEM's
   in SQL or No-SQL. Would prefer to just write the SQL or JSON in a text
   editor and have it be versioned and shareable for the team.
6. Would certainly add in codegen and get the schema generating types used
   across the backend and frontend including the react-query hooks. Would no
   longer need to write any of that code just generate it and use it.
7. I would break the resolvers and types into multiple files and combine them.
   That way the logic is nice and easy to find and work with and you don't have
   one giant resolver. (was no need for that here as it's such a small
   application).
8. I would consider other technologies in general. This is only a posible
   implementation and as fast as tech (especially javascript) changes there is
   always improvments and better things coming out. Mind you newer is not
   always better. But anything with performance gains or nice tooling for faster
   development implementation is always worth looking into.
9. There are many more things that could be done for this application but just
   fiting it into my schedule and getting it done I'm happy with this solution
   as I think it showcases multiple skills and solves the original ask without
   being over the top or lacking of functionality.
