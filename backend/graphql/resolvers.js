const Message = require("../models/message");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  Query: {
    message: (_, { ID }) => Message.findById(ID),
    allMessages: (_, __, ___, ____) => Message.find({}).exec(),
  },
  Mutation: {
    async createMessage(_, { messageInput: { text, username } }) {
      const newMessage = new Message({
        text: text,
        createdBy: username,
      });

      const res = await newMessage.save();
      pubsub.publish("MESSAGE_CREATED", {
        messageCreated: {
          text: text,
          createdBy: username,
        },
      });
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED"),
    },
  },
};
