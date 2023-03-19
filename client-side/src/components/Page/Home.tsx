import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // input room id
  const [roomId, setRoomId] = useState("");
  const roomIdHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRoomId(event.target.value);
  };

  // route
  const navigate = useNavigate();
  const createRoom = () => {
    navigate("/room");
  };
  const toRoom = () => {
    if (roomId === "") {
      alert("Room id cannot be empty.");
    } else {
      navigate("/room/" + roomId);
    }
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
            value={roomId}
            onChange={roomIdHandler}
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
            Enter Room
          </Button>
          <Button
            aria-label="button"
            flat
            color="success"
            auto
            onPress={createRoom}
          >
            Create Room
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
