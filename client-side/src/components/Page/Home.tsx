import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const toRoom = () => {
    navigate("/room");
  };
  const toCharacter = () => {
    navigate("/character");
  };

  return (
    <div className="grid justify-items-center my-12">
      <div className="col">
        <div className="col w-screen grid justify-items-center">
          <Input
            aria-label="input"
            placeholder="Room Id"
            clearable
            width="80%"
            contentRight={
              <div
                style={{
                  width: "12px",
                }}
              ></div>
            }
            contentRightStyling={false}
          />
        </div>
        <div className="m-5 grid grid-cols-2 gap-4">
          <Button
            aria-label="button"
            flat
            color="primary"
            auto
            onPress={toRoom}
          >
            Enter
          </Button>
          <Button
            aria-label="button"
            flat
            color="warning"
            auto
            onPress={toCharacter}
          >
            Character
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
