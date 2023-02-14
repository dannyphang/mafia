import {
  useModal,
  Button,
  Modal,
  Text,
  Input,
  Textarea,
  Radio,
  Checkbox,
} from "@nextui-org/react";
import React, { useState } from "react";
import "../../assests/style/_style.css";
import { CharacterDTO, CharacterService } from "../../service/CharacterService";

const CreateCharacterButton = (props: { characterList: () => void }) => {
  const characterSideList = ["民", "神", "狼"];
  const characterAbilityList = [
    "isBounce",
    "isChecker",
    "isDealer",
    "isExplode",
    "isHealer",
    "isInvisible",
    "isKiller",
    "isProtector",
    "isSilentener",
  ];

  const characterInput = {
    name: "",
    order: 0,
    description: "",
    side: "",
  };

  // modal
  const { visible, setVisible } = useModal(false);
  const modalHandler = () => {
    setVisible(true);
    console.log("modal button clicked");
  };
  const closeModalHandler = () => {
    setVisible(false);
  };

  // input
  const [nameValue, setNameValue] = useState("");
  const [orderValue, setOrderValue] = useState(0);
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNameValue(event.target.value);
  };
  const handleOrderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOrderValue(Number(event.target.value));
  };
  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescriptionValue(event.target.value);
  };

  const initValue = () => {
    setNameValue("");
    setOrderValue(0);
    setDescriptionValue("");
    setChecked([]);
  };

  // side
  const [selected, setSelected] = useState("");

  // checkbox
  const [checked, setChecked] = useState<string[]>([]);

  // button
  const cancelBtn = () => {
    initValue();
    setVisible(false);
  };

  const createBtn = () => {
    console.log(nameValue);
    console.log(orderValue);
    console.log(descriptionValue);
    console.log(selected);
    console.log(checked);

    let tempMap = new Map<string, boolean>();
    for (let i = 0; i < characterAbilityList.length; i++) {
      if (checked.includes(characterAbilityList[i])) {
        tempMap.set(characterAbilityList[i], true);
      } else {
        tempMap.set(characterAbilityList[i], false);
      }
    }

    let character: CharacterDTO = {
      characterName: nameValue,
      characterOrder: orderValue,
      characterDescription: descriptionValue,
      characterSide: selected,
      characterAbility: tempMap,
    };

    console.log(tempMap);

    new CharacterService().createCharacter(character).then(props.characterList);

    initValue();
    setVisible(false);
  };

  return (
    <div className="grid justify-items-center my-12 mx-5">
      <Button aria-label="button" onPress={modalHandler}>
        New Character
      </Button>
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
            Create New Character
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            required={true}
            aria-label="input"
            clearable
            label="Character Name"
            fullWidth
            bordered
            value={nameValue}
            onChange={handleNameChange}
          />
          <Textarea
            aria-label="textarea"
            required={true}
            minRows={1}
            label="Character Description"
            bordered
            value={descriptionValue}
            onChange={handleDescriptionChange}
          />
          <Radio.Group
            label="Side"
            isRequired={true}
            orientation="horizontal"
            value={selected}
            onChange={setSelected}
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
            onChange={handleOrderChange}
          />
          <Checkbox.Group
            aria-label="checkbox"
            value={checked}
            onChange={setChecked}
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

          <div className="m-5 grid grid-cols-2 gap-4">
            <Button
              aria-label="button"
              flat
              color="warning"
              auto
              onPress={cancelBtn}
            >
              Cancel
            </Button>
            <Button
              aria-label="button"
              flat
              color="primary"
              auto
              onPress={createBtn}
            >
              Create
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateCharacterButton;
