import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      auto
      light
      color="secondary"
      icon={<IoIosArrowBack />}
      css={{
        width: "50px !important",
      }}
      onPress={() => navigate(-1)}
    />
  );
};

export default BackButton;
