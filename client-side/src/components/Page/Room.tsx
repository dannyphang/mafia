import { Button } from "@nextui-org/react";
import { useState } from "react";

const Room = () => {
  let isGameStart: Boolean = false;
  const [gameStart, setGameStart] = useState(isGameStart);

  return (
    <div className="grid justify-items-center m-5">
      {/* <GameStartButton /> */}
    </div>
  );
};

export default Room;
