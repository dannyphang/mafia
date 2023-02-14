import { Text } from "@nextui-org/react";
import CreateCharacterButton from "../Button/CreateCharacterButton";
import Header from "../SharedSection/Header";
import { apiConfig } from "../../environment/apiConfig";
import { CharacterDTO } from "../../service/CharacterService";
import { useEffect, useState } from "react";

const Character = () => {
  // let charactersList = [
  //   {
  //     name: "预言家",
  //     order: 4,
  //     description: "预言家可以在夜间查验任意一名玩家，知道其阵营身份。",
  //     side: "神",
  //   },
  //   {
  //     name: "女巫",
  //     order: 3,
  //     description:
  //       "女巫拥有解药和毒药，解药可以解救任意一名被刀玩家，毒药可以毒杀任意一名玩家，其中解药和毒药都必须在夜间使用，但不能同一晚上使用两种药。",
  //     side: "神",
  //   },
  //   {
  //     name: "平民",
  //     order: 0,
  //     description: "没有任何技能。",
  //     side: "民",
  //   },
  //   {
  //     name: "狼人",
  //     order: 3,
  //     description: "夜间可以刀杀任意一名玩家。",
  //     side: "狼",
  //   },
  // ];

  const [charactersLists, setCharactersLists] = useState<CharacterDTO[]>([]);

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    await fetch(apiConfig.baseUrl + "/character")
      .then((res) => res.json())
      .then((data) => {
        setCharactersLists(data);
      });

    console.log(charactersLists[0].characterAbility);
  }

  return (
    <div>
      <Header />
      <Text size={50} className="ml-5 font-semibold">
        Character List
      </Text>
      {charactersLists.map((character) => (
        <div>
          <div className="flex">
            <div
              className="text-center border-double border-2 border-rose-500 rounded w-32 m-5 px-5"
              key={character.characterName}
            >
              <Text size={20}>{character.characterName}</Text>
            </div>
            <div
              className="border-double border-2 border-orange-500 rounded-full m-5 px-2"
              key={character.characterSide}
            >
              <Text size={20}>{character.characterSide}</Text>
            </div>
          </div>
          <div
            className="flex w-9/12 ml-5"
            key={character.characterDescription}
          >
            <Text size={16}>{character.characterDescription}</Text>
          </div>
          <div className="border-b border-gray-400 mx-4"></div>
        </div>
      ))}
      <CreateCharacterButton characterList={getCharacters} />
    </div>
  );
};

export default Character;
