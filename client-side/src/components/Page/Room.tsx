import {
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Modal,
  PressEvent,
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
  let isAssignChar: Boolean = false;
  const [gameStart, setGameStart] = useState(isGameStart);
  const [assignChar, setAssignChar] = useState(isAssignChar);
  const [playerLists, setPlayerLists] = useState<PlayerDTO[]>([]);
  const [charactersLists, setCharactersLists] = useState<CharacterDTO[]>([]);
  const [gameCharactersLists, setGameCharactersLists] = useState<
    CharacterDTO[]
  >([]);
  const [characterAmount, setCharacterAmount] = useState(0);
  const [totalCharacterAmount, setTotalCharacterAmount] = useState(0);
  const [characterName, setCharacterName] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [characterPlayerList, setCharacterPlayerList] = useState<any[]>([]);
  const [deleteVisible, setDeleteVisible] = useState(true);
  const [playerCardVisible, setPlayerCardVisible] = useState(false);
  const [playerIndex, setPlayerIndex] = useState("");

  useEffect(() => {
    getPlayers();
    getCharacters();
  }, []);

  if (!id) return <div>Loading...</div>;

  const gameStartClicked = () => {
    setAssignChar(true);
    getCharacters();
  };

  function StartButton() {
    return (
      <div className="grid justify-items-center my-12">
        <Button auto flat rounded color="secondary" onPress={gameStartClicked}>
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
    if (id) {
      await new PlayerService().getPlayerListByRoomId(id).then((data) => {
        setPlayerLists(data);
      });
    }
  }

  const handleCharacterNameChange = (event: any) => {
    setCharacterName(event.target.value);
    setCharacterId(event.target.options[event.target.selectedIndex].id);
  };

  const handleCharacterAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCharacterAmount(Number(event.target.value));
  };

  const playerCardBtn = () => {
    setDeleteVisible(!deleteVisible);
  };

  const showCharCard = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    let playerId =
      playerLists[Number((event.target as HTMLSpanElement).id)].playerId;
    //console.log(playerId);
    for (let player of playerLists) {
      if (player.playerId === playerId) {
        await new CharacterService()
          .getCharacterById(player.characterId)
          .then((data) => {
            console.log(data.characterName);
          });
      }
    }
    setPlayerIndex((event.target as HTMLSpanElement).id);

    // display actions modal for the player (kill, check, protect, etc.)
    setPlayerCardVisible(true);
  };

  function handlePlayerAction(e: any) {
    playerAction(e.target.id);
  }

  async function playerAction(action: string) {
    if (action) {
      console.log(action);
      let selectedPlayer: PlayerDTO = playerLists[Number(playerIndex)];
      let playerUpdate: PlayerDTO;

      // protect
      if (action === "protect") {
        // update player's protected to true
        playerUpdate = {
          playerId: selectedPlayer.playerId,
          name: selectedPlayer.name,
          characterId: selectedPlayer.characterId,
          alive: true,
          killed: false,
          protected: true,
        };

        await new PlayerService()
          .updatePlayer(playerUpdate.playerId, playerUpdate)
          .then((result) => {
            console.log(result);
          });
      }

      // kill
      if (action === "kill") {
        // check if player is protected
        if (selectedPlayer.protected) {
          playerUpdate = {
            playerId: selectedPlayer.playerId,
            name: selectedPlayer.name,
            characterId: selectedPlayer.characterId,
            alive: true,
            killed: false,
            protected: false,
          };
        } else {
          // update player's alive to false
          playerUpdate = {
            playerId: selectedPlayer.playerId,
            name: selectedPlayer.name,
            characterId: selectedPlayer.characterId,
            alive: true,
            killed: true,
            protected: false,
          };
        }

        await new PlayerService()
          .updatePlayer(playerUpdate.playerId, playerUpdate)
          .then((result) => {
            console.log(result);
          });
      }

      // check character side
      if (action === "check") {
        let selectedPlayer: PlayerDTO = playerLists[Number(playerIndex)];
        for (let character of charactersLists) {
          if (selectedPlayer.characterId === character.characterId) {
            if (character.characterSide === "狼") {
              console.log("bad");
            } else {
              console.log("good");
            }
          }
        }
      }

      // heal
      if (action === "heal") {
        // update player's killed to false
        playerUpdate = {
          playerId: selectedPlayer.playerId,
          name: selectedPlayer.name,
          characterId: selectedPlayer.characterId,
          alive: true,
          killed: false,
          protected: false,
        };

        await new PlayerService()
          .updatePlayer(playerUpdate.playerId, playerUpdate)
          .then((result) => {
            console.log(result);
          });
      }

      // poison
      if (action === "poison") {
        // check if player is protected
        if (selectedPlayer.protected) {
          playerUpdate = {
            playerId: selectedPlayer.playerId,
            name: selectedPlayer.name,
            characterId: selectedPlayer.characterId,
            alive: true,
            killed: false,
            protected: false,
          };
        } else {
          // update player's killed to true
          playerUpdate = {
            playerId: selectedPlayer.playerId,
            name: selectedPlayer.name,
            characterId: selectedPlayer.characterId,
            alive: true,
            killed: true,
            protected: false,
          };
        }

        await new PlayerService()
          .updatePlayer(playerUpdate.playerId, playerUpdate)
          .then((result) => {
            console.log(result);
          });
      }

      // vote
      if (action === "vote") {
        // update player's alive to false
        playerUpdate = {
          playerId: selectedPlayer.playerId,
          name: selectedPlayer.name,
          characterId: selectedPlayer.characterId,
          alive: false,
          killed: false,
          protected: false,
        };

        await new PlayerService()
          .updatePlayer(playerUpdate.playerId, playerUpdate)
          .then((result) => {
            console.log(result);
          });
      }
    }

    setPlayerCardVisible(false);
  }

  function PlayerCard() {
    return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={playerCardVisible}
        onClose={() => setPlayerCardVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            What you want to do...?
          </Text>
          {playerIndex}
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={2} justify="center" style={{}}>
            <Grid className="p-5" key={"protect"}>
              <Card
                style={{
                  padding: "20px",
                  width: "fit-content",
                }}
                isPressable
                onPress={handlePlayerAction}
                id="protect"
              >
                Protect
              </Card>
            </Grid>
            <Grid className="p-5" key={"kill"}>
              <Card
                style={{
                  padding: "20px",
                  width: "fit-content",
                }}
                isPressable
                onPress={handlePlayerAction}
                id="kill"
              >
                Kill
              </Card>
            </Grid>
            <Grid className="p-5" key={"check"}>
              <Card
                style={{
                  padding: "20px",
                  width: "fit-content",
                }}
                isPressable
                onPress={handlePlayerAction}
                id="check"
              >
                Check
              </Card>
            </Grid>
            <Grid className="p-5" key={"poison"}>
              <Card
                style={{
                  padding: "20px",
                  width: "fit-content",
                }}
                isPressable
                onPress={handlePlayerAction}
                id="poison"
              >
                Poison
              </Card>
            </Grid>
            <Grid className="p-5" key={"heal"}>
              <Card
                style={{
                  padding: "20px",
                  width: "fit-content",
                }}
                isPressable
                onPress={handlePlayerAction}
                id="heal"
              >
                Heal
              </Card>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="primary"
            onPress={() => setPlayerCardVisible(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const nextBtn = async () => {
    console.log(gameCharactersLists);
  };

  const sortCharacterOrder = () => {
    for (let gameChar of charactersLists) {
      for (let gamePlayerChar of characterPlayerList) {
        if (gameChar.characterId === gamePlayerChar.id) {
          //console.log(gameChar);
          gameCharactersLists.push(gameChar);
        }
      }
    }

    gameCharactersLists.sort((a, b) => {
      return a.characterOrder - b.characterOrder;
    });
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
        getPlayers();
      });
    }
  };

  const addCharacter = () => {
    let characters = {
      id: characterId,
      name: characterName,
      amount: characterAmount,
    };

    characterPlayerList.push(characters);
    setTotalCharacterAmount(totalCharacterAmount + characterAmount);
    setCharacterAmount(0);
  };

  const assignCharacter = async () => {
    let amt = 0;
    for (let i = 0; i < characterPlayerList.length; i++) {
      amt += characterPlayerList[i].amount;
    }
    if (amt === playerLists.length) {
      // random assgin character to player
      for (let i = 0; i < characterPlayerList.length; i++) {
        let character = characterPlayerList[i];
        let playerList = playerLists;
        for (let j = 0; j < character.amount; j++) {
          let random = Math.floor(Math.random() * playerList.length);
          let player = playerList[random];
          let updatePlayer: PlayerDTO = {
            playerId: player.playerId,
            name: player.name,
            characterId: character.id,
            alive: true,
            killed: false,
            protected: false,
          };
          await new PlayerService()
            .updatePlayer(player.playerId, updatePlayer)
            .then(() => {
              playerList.splice(random, 1);
            })
            .then(() => {
              setGameStart(true);
              setAssignChar(false);
            });
        }
      }
      await getPlayers();
      sortCharacterOrder();
    }
  };

  const emptyList = () => {
    setCharacterPlayerList([]);
    setTotalCharacterAmount(0);
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
      {/* shows players at room page before game start, hide it after the game start */}
      {!assignChar && !gameStart && (
        <div>
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
          <StartButton />
        </div>
      )}

      {/* shows character selection */}
      {assignChar && !gameStart && (
        <div className="block row">
          <div className="flex justify-center row my-5">
            <div>Player amount: {playerLists.length}</div>
          </div>
          {/* select character and amount */}
          {totalCharacterAmount < playerLists.length && (
            <div>
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
                        id={character.characterId}
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
            </div>
          )}
          {/* select character and amount */}

          {/* table shows choosed character */}
          {totalCharacterAmount > 0 && (
            <div>
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
                      <Table.Column key={column.key}>
                        {column.label}
                      </Table.Column>
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

              {/* submit and reset button */}
              <div className="flex justify-center row mt-5">
                <Button
                  auto
                  flat
                  color={"primary"}
                  rounded
                  onPress={assignCharacter}
                  className="mx-2"
                >
                  Submit
                </Button>
                <Button
                  auto
                  flat
                  color={"primary"}
                  rounded
                  onPress={emptyList}
                  className="mx-2"
                >
                  Reset
                </Button>
              </div>
              {/* submit and reset button */}
            </div>
          )}
          {/* table shows choosed character */}

          <div className="flex justify-center row mt-3">
            <Button
              auto
              flat
              color={"primary"}
              rounded
              onPress={() => setAssignChar(false)}
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* shows assigned players and game start */}
      {!assignChar && gameStart && (
        <div>
          <Grid.Container gap={2} justify="center" style={{}}>
            {playerLists.map((item, index) => (
              <Grid className="p-5" key={index}>
                <Card
                  style={{
                    padding: "20px",
                    width: "fit-content",
                  }}
                  id={String(index)}
                  isPressable
                  onClick={showCharCard}
                >
                  {item.name}
                </Card>
              </Grid>
            ))}
          </Grid.Container>
          <div className="flex justify-center row mt-3">
            <Button
              auto
              flat
              color={"primary"}
              rounded
              onPress={() => {
                setAssignChar(true);
                setGameStart(false);
                setGameCharactersLists([]);
              }}
              className="mx-2"
            >
              Back
            </Button>
            <Button
              auto
              flat
              color={"primary"}
              rounded
              onPress={nextBtn}
              className="mx-2"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Game Start */}
      {/* Night Time */}
      {gameStart && <PlayerCard />}
    </div>
  );
};

export default Room;
