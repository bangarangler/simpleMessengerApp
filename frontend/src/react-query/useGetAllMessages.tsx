// I would turn the hardcoded url into a .env or put it in a constants file.
// Again multiple solutions that would depend on the deployment aspect but I
// wouldn't hardcode it here as it should be easily changed elsewhere.  This
// file is more or less set it and forget it unless changes to the schema are
// made and someone would need to say add in updatedBy to the returned data.
// even that if you where using codegen would automatically show up and be
// updated once you generated the react-query hook based off the backend graphql
// schema.
import { useQuery } from "react-query";
import axios from "axios";

const query = `
  query AllMessages {
  allMessages {
    text
    createdBy
  }
}
`;

const getAllMessages = async () => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/graphql`,
      { query },
      { headers: { "Content-Type": "application/json" } }
    );
    if (data?.data?.allMessages) {
      return data?.data?.allMessages;
    }
  } catch (error) {
    console.log("err: ", error);
    // much better error handling should be used here. This is basic and not
    // finished by any means.
  }
};

export const useGetAllMessages = (options: any) => {
  return useQuery(GET_ALL_MESSAGES, () => getAllMessages(), options);
};

export const GET_ALL_MESSAGES = "get_all_messages";
