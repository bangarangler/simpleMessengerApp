import { FC, useState } from "react";
import { useSubscription, gql } from "@apollo/client";
import { useQueryClient } from "react-query";

// CUSTOM HOOK
// Used react-query... it's lovely. Lot's of this work can be generated for you
// including types and hooks but wanted to demonstrate how to write them by hand
// without lots of fancy tools.  Although I would highly recommed using tools
// like graphql-tools & codegen as the types will be generated off of your
// backend and it's a safer and easier to work in enviornment as you can explore
// the graphQL api in something like apollo studio and know that your types and
// data fetching hooks are generated off of the graphql schema and your types
// are all nice and aligned throughout.
import { useGetAllMessages } from "../../react-query/useGetAllMessages";
import { useSendMessage } from "../../react-query/useSendMessage";

// STYLES
import "../../App.css";

// This is Apollo Client ->  I would recommend using one or the other.  However
// wanted to demonstrate familiarity with multiple tools.  I personally really
// like react-query and keeping api "state" totally seperate from react "state".
const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageCreated {
      text
      createdBy
    }
  }
`;

// I usually like to pull all my types, interfaces, etc into a seperate file.
// for example in this directory i would make a MessagesTypes.ts file and import
// the types here.  I opted not to do that for this however the folder structure
// is set up to accomodate for it.
interface MessagesProps {
  userName: string;
}

const Messages: FC<MessagesProps> = ({ userName }) => {
  const qClient = useQueryClient();
  // @ts-ignore
  const { data } = useGetAllMessages();
  useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data: any) => {
      // left this incase you want to see the data in the console
      // console.log("data onSubscriptionData: ", data);
      qClient.invalidateQueries("get_all_messages");
      // multiple ways to handle the above.  I could manually add in the data.
      // however for this it's much simpler to just invalidate the
      // get_all_messages query which tells react query to fetch all messages
      // again.  I trigger it when the data hits the subscription and could have
      // done it multiple ways.  This was simple and allowed me to keep it
      // moving. *thumbs up*
    },
  });

  // REACT STATE
  const [text, setText] = useState("");

  // SEND MESSAGE CODE
  const { mutate } = useSendMessage({ text, userName }, { enabled: false });

  return (
    <>
      <ul>
        {data?.map((message: any, idx: any) => {
          return (
            <li key={idx + message.createdBy}>
              {message?.createdBy} says {message?.text}
            </li>
          );
        })}
      </ul>
      <div className="sendForm_wrapper">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>New Message</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* @ts-ignore */}
          <button onClick={() => mutate({ text, userName })}>Send</button>
        </form>
      </div>
    </>
  );
};

export default Messages;
