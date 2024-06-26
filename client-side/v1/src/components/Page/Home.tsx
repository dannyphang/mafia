import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerDTO, PlayerService } from "../../service/PlayerService";
import { RoomService } from "../../service/RoomService";

const Home = () => {
  //open modal
  const [visible, setVisible] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const closeHandler = () => {
    setEnterName(false);
    setVisible(false);
  };
  let isEnterName: boolean = false;
  const [enterName, setEnterName] = useState(false);

  // input room id
  const [roomId, setRoomId] = useState("");
  const roomIdHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRoomId(event.target.value);
  };

  // route
  const navigate = useNavigate();
  async function createRoom() {
    let newRoomId: string = "";

    await new RoomService().createNewRoom().then((data) => {
      newRoomId = data.roomId;
      //navigate("/room/" + data.roomId);

      setVisible(true);
    });

    // let newPlayer: PlayerDTO = {
    //   playerId: "",
    //   name: playerName,
    //   characterId: "",
    //   alive: true,
    //   killed: false,
    //   protected: false,
    // };

    // let newPlayerId: string = "";
    // await new PlayerService().createNewPlayer(newPlayer).then((data) => {
    //   newPlayerId = data.playerId;
    // });

    // await new RoomService()
    //   .addPlayerToRoom(newRoomId, newPlayerId)
    //   .then(() => {
    //     navigate("/room/" + newRoomId);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setPlayerName("");
  }

  // const toRoom = () => {
  //   if (roomId === "") {
  //     alert("Room id cannot be empty.");
  //   } else {
  //     new RoomService().getRoomById(roomId).then((data) => {
  //       if (data.roomId === null) {
  //         alert("Room id does not exist.");
  //       } else {
  //         setVisible(true);
  //       }
  //     });
  //   }
  // };

  const toEnterNameHandler = () => {
    setEnterName(true);
    isEnterName = true;
  };

  const nextHandle = () => {
    console.log(isEnterName);
    if (!isEnterName) {
      toEnterNameHandler();
    } else {
      toTheRoomHandle();
    }
  };

  const toTheRoomHandle = async () => {
    let newPlayer: PlayerDTO = {
      playerId: "",
      name: playerName,
      characterId: "",
      alive: true,
      killed: false,
      protected: false,
    };

    let newPlayerId: string = "";
    await new PlayerService().createNewPlayer(newPlayer).then((data) => {
      newPlayerId = data.playerId;
    });

    await new RoomService()
      .addPlayerToRoom(roomId, newPlayerId)
      .then(() => {
        navigate("/room/" + roomId);
      })
      .catch((error) => {
        console.log(error);
      });
    setPlayerName("");
  };

  const noPlayerHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPlayerNumber(Number(event.target.value));
  };

  const nameHandler = (event: any) => {
    setPlayerName(event.target.value);
  };

  const toCharacter = () => {
    navigate("/character");
  };

  const enterKeyPressName = (event: any) => {
    if (event.key === "Enter") {
      nextHandle();
    }
  };

  // const enterKeyPressRoom = (event: any) => {
  //   if (event.key === "Enter") {
  //     toRoom();
  //   }
  // };

  return (
    <div className="grid justify-items-center my-12">
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Number of players...
          </Text>
        </Modal.Header>
        <Modal.Body>
          {!enterName && (
            <Input
              aria-label="input"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              autoFocus
              placeholder="0"
              type="number"
              onChange={noPlayerHandler}
              onKeyDown={enterKeyPressName}
            />
          )}
          {/* loop input based on noPlayerHandler */}
          {enterName &&
            [...Array(playerNumber)].map((_, index) => (
              <Input
                key={index}
                id={String(index)}
                aria-label="input"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                autoFocus
                placeholder="Name"
                onChange={nameHandler}
                onKeyDown={enterKeyPressName}
              />
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={nextHandle}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col">
        {/* <div className="col w-screen grid justify-items-center">
          <Input
            aria-label="input"
            placeholder="Room Id"
            autoFocus
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
            onKeyDown={enterKeyPressRoom}
          />
        </div> */}
        <div className="m-5 grid grid-cols-2 gap-4">
          {/* <Button
            aria-label="button"
            flat
            color="primary"
            auto
            onPress={toRoom}
          >
            Enter Room
          </Button> */}
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
