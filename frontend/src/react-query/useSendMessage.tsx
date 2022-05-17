import { useMutation } from "react-query";
import axios from "axios";

const sendMessage = async (vars: any) => {
  try {
    const { text, userName } = vars;
    const variables = { messageInput: { text: text, username: userName } };
    const { data } = await axios.post(
      `http://localhost:5000/graphql`,
      { query, variables, body: JSON.stringify({ query, variables }) },
      { headers: { "Content-Type": "application/json" } }
    );
    if (data) {
      // console.log("data: ", data);
      // no need to return the data as the subscription is triggering a refetch
      // although if you want to see the data you can comment it back in.
      // *thumbs up*
    }
  } catch (error) {
    console.log("err: ", error);
    // NOT FINISHED. LOL
  }
};

const query = `
mutation CreateMessage($messageInput: MessageInput) {
createMessage(messageInput: $messageInput) {
  text
  createdBy
}
}
`;

export const useSendMessage = (vars: any, options: any) => {
  return useMutation(() => sendMessage(vars), options);
};
