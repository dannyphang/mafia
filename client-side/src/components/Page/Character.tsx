import {
  Checkbox,
  Input,
  Modal,
  Radio,
  Text,
  Textarea,
  useModal,
} from "@nextui-org/react";
import CreateCharacterButton from "../Button/CreateCharacterButton";
import Header from "../SharedSection/Header";
import { CharacterDTO, CharacterService } from "../../service/CharacterService";
import { useEffect, useState } from "react";
import {
  characterAbilityList,
  characterSideList,
} from "../../assests/data/CharacterData";

const Character = () => {
  const [charactersLists, setCharactersLists] = useState<CharacterDTO[]>([]);
  let charactersAbility: string[] = [];

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    new CharacterService().getAllCharacters().then((data) => {
      setCharactersLists(data);
    });
  }

  // character
  const [characterObj, setCharacterObj] = useState<CharacterDTO>();
  const [abilitList, setAbilityList] = useState<string[]>([]);
  const [orderValue, setOrderValue] = useState(0);
  let character: CharacterDTO;

  // modal
  const { visible, setVisible } = useModal(false);
  const modalHandler = async (id?: string) => {
    if (id !== undefined) {
      character = await new CharacterService().getCharacterById(id);
      for (const key in character.characterAbility) {
        if (character.characterAbility[key] === true) {
          charactersAbility.push(key);
        }
      }
      setAbilityList(charactersAbility);
      setOrderValue(character.characterOrder);
      setCharacterObj(character);
    }
    setVisible(true);
  };
  const closeModalHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Header />
      <Text size={50} className="ml-5 font-semibold">
        Character List
      </Text>
      {charactersLists.map((character) => (
        <div
          key={character.characterId}
          onClick={() => modalHandler(character.characterId)}
        >
          <div className="flex">
            <div className="text-center border-double border-2 border-rose-500 rounded w-32 m-5 px-5">
              <Text size={20}>{character.characterName}</Text>
            </div>
            <div className="border-double border-2 border-orange-500 rounded-full m-5 px-2">
              <Text size={20}>{character.characterSide}</Text>
            </div>
          </div>
          <div className="flex w-9/12 ml-5">
            <Text size={16}>{character.characterDescription}</Text>
          </div>
          <div className="border-b border-gray-400 mx-4"></div>
        </div>
      ))}
      <CreateCharacterButton characterList={getCharacters} />
      <Modal
        aria-label="modal"
        scroll
        width="80%"
        open={visible}
        onClose={closeModalHandler}
        closeButton
        blur
      >
        <Modal.Header>
          <Text aria-label="text" id="character-modal-title" size={18}>
            Character - {characterObj?.characterId}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            readOnly
            aria-label="input"
            label="Character Name"
            fullWidth
            bordered
            initialValue={characterObj?.characterName}
          />
          <Textarea
            aria-label="textarea"
            readOnly
            minRows={1}
            label="Character Description"
            bordered
            initialValue={characterObj?.characterDescription}
          />
          <Radio.Group
            label="Side"
            orientation="horizontal"
            isReadOnly={true}
            defaultValue={characterObj?.characterSide}
          >
            <div>
              {characterSideList.map((item) => (
                <Radio
                  key={item}
                  value={item}
                  css={{
                    display: "inline-grid",
                    gridTemplateColumns: "auto",
                    marginTop: "0px !important",
                  }}
                >
                  {item}
                </Radio>
              ))}
            </div>
          </Radio.Group>
          <Input
            aria-label="input"
            label="Order"
            bordered
            type="number"
            value={orderValue}
          />
          <Checkbox.Group
            aria-label="checkbox"
            isReadOnly={true}
            defaultValue={abilitList}
          >
            <div>
              {characterAbilityList.map((item) => (
                <Checkbox
                  key={item}
                  value={item}
                  css={{
                    display: "inline-grid",
                    gridTemplateColumns: "auto 130px",
                    marginTop: "0px !important",
                  }}
                >
                  <div className="justify-self-start">{item}</div>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Character;
