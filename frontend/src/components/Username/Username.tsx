import { Dispatch, FC, SetStateAction } from "react";

// STYLES
import "../../App.css";

interface UsernameProps {
  setUserName: Dispatch<SetStateAction<string>>;
  userName: string;
  showMessages?: boolean;
  setShowMessages: Dispatch<SetStateAction<boolean>>;
}

const Username: FC<UsernameProps> = ({
  userName,
  setUserName,
  setShowMessages,
}) => {
  // This could have just lived down below but multple ways to handle it.
  // Depends on style guide and what the team prefers.
  const handleSetUserName = (name: string) => {
    setUserName(name);
  };

  return (
    <div className="Username_Wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowMessages(true);
        }}>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Provide your username..."
          value={userName}
          onChange={(e) => handleSetUserName(e.target.value)}
        />
        <button type="submit">Let's Go</button>
      </form>
    </div>
  );
};

export default Username;
