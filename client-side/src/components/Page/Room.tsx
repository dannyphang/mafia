import {
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Table,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterDTO, CharacterService } from "../../service/CharacterService";
import { PlayerDTO, PlayerService } from "../../service/PlayerService";
import { RoomService } from "../../service/RoomService";

const Room = () => {
  const { id } = useParams();

  let isGameStart: Boolean = false;
  const [gameStart, setGameStart] = useState(isGameStart);
  const [playerLists, setPlayerLists] = useState<PlayerDTO[]>([]);
  const [charactersLists, setCharactersLists] = useState<CharacterDTO[]>([]);
  const [characterAmount, setCharacterAmount] = useState(0);
  const [characterName, setCharacterName] = useState("");
  const [characterPlayerList, setCharacterPlayerList] = useState<any[]>([]);
  const [deleteVisible, setDeleteVisible] = useState(true);

  useEffect(() => {
    getPlayers();
    getCharacters();
  }, []);

  if (!id) return <div>Loading...</div>;

  let isPlayerOne: Boolean = true;

  const gameStartClicked = () => {
    setGameStart(true);
    getCharacters();
  };

  function StartButton() {
    return (
      <div className="grid justify-items-center my-12">
        <Button auto flat rounded color="secondary" onClick={gameStartClicked}>
          Start Game
        </Button>
      </div>
    );
  }

  async function getCharacters() {
    new CharacterService().getAllCharacters().then((data) => {
      setCharactersLists(data);
    });
  }

  async function getPlayers() {
    if (id != undefined) {
      new PlayerService().getPlayerListByRoomId(id).then((data) => {
        setPlayerLists(data);
      });
    }
  }

  const handleCharacterNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCharacterName(event.target.value);
  };

  const handleCharacterAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCharacterAmount(Number(event.target.value));
  };

  const playerCardBtn = () => {
    setDeleteVisible(!deleteVisible);
  };

  const deletePlayerBtn = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    // when delete button is clicked, only remove the player from the room
    if (!deleteVisible) {
      let playerId = (event.target as HTMLSpanElement).id;
      await new RoomService()
        .deletePlayerFromRoom(id, playerId)
        .then((result) => {
          getPlayers();
        });

      await new PlayerService().deletePlayer(playerId).then((result) => {
        setDeleteVisible(!deleteVisible);
      });
    }
  };

  const addCharacter = () => {
    let characters = {
      name: characterName,
      amount: characterAmount,
    };

    characterPlayerList.push(characters);
    setCharacterAmount(0);
  };

  const emptyList = () => {
    setCharacterPlayerList([]);
  };

  const columns = [
    {
      key: "character",
      label: "Character",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ];

  return (
    <div
      className="h-screen m-0"
      style={{
        backgroundColor: "",
      }}
    >
      {/* <Header /> */}
      <div>{id}</div>
      {/* shows players at room page before game start */}
      <div>
        {!gameStart && (
          <Grid.Container gap={2} justify="center" style={{}}>
            {playerLists.map((item, index) => (
              <Grid className="p-5" key={index}>
                <Badge
                  id={item.playerId}
                  color="error"
                  content="-"
                  isInvisible={deleteVisible}
                  onClick={deletePlayerBtn}
                >
                  <Card
                    style={{
                      padding: "20px",
                      width: "fit-content",
                    }}
                    isPressable
                    onPress={playerCardBtn}
                  >
                    <Text>{item.name}</Text>
                  </Card>
                </Badge>
              </Grid>
            ))}
          </Grid.Container>
        )}
      </div>

      {isPlayerOne && !gameStart && <StartButton />}

      <div>
        {gameStart && (
          <div className="block row">
            {/* select character and amount */}
            <div className="flex justify-center row">
              <form>
                <select
                  onChange={handleCharacterNameChange}
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid rgba(0, 0, 0, 0.15)",
                    padding: "9px",
                    borderRadius: "0.75rem",
                    marginRight: "10px",
                    fontSize: "0.875rem",
                  }}
                >
                  {charactersLists.map((character) => (
                    <option
                      value={character.characterName}
                      style={{
                        backgroundColor: "white",
                        width: "100px",
                        borderRadius: "0.75rem",
                      }}
                    >
                      {character.characterName}
                    </option>
                  ))}
                </select>

                <Input
                  aria-label="input"
                  bordered
                  type="number"
                  value={characterAmount}
                  onChange={handleCharacterAmountChange}
                />
              </form>
            </div>
            {/* select character and amount */}

            {/* add button */}
            <div className="flex justify-center row mt-5">
              <Button
                auto
                flat
                color={"success"}
                rounded
                onPress={addCharacter}
              >
                +
              </Button>
            </div>
            {/* add button */}

            {/* table shows choosed character */}
            <div className="flex justify-center row mt-5">
              <Table
                aria-label="table"
                css={{
                  height: "auto",
                  minWidth: "90vw",
                }}
              >
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={characterPlayerList}>
                  {(item) => (
                    <Table.Row key={item.name}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.amount}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
            {/* table shows choosed character */}

            {/* submit and reset button */}
            <div className="flex justify-center row mt-5">
              <Button auto flat color={"success"} rounded>
                Submit
              </Button>
              <Button auto flat color={"error"} rounded onPress={emptyList}>
                Reset
              </Button>
            </div>
            {/* submit and reset button */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
