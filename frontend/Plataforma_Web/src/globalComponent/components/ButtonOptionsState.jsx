import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Badge from "react-bootstrap/Badge";
import UserContext from "../../UserContextApi/UserContext";

import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdOutlineEmergencyShare } from "react-icons/md";
import { GiPoliceCar } from "react-icons/gi";
import { CgUnavailable } from "react-icons/cg";
import { useContext } from "react";

function ButtonOptionsState() {
  const { radioValue, setRadioValue } = useContext(UserContext);

  const radios = [
    {
      name: (
        <>
          <TiThSmallOutline /> Todo el personal
        </>
      ),
      value: "1",
      badgeText: "Todo el personal",
    },
    {
      name: <MdOutlineEventAvailable />,
      value: "2",
      badgeText: "Personal en activo",
    },
    {
      name: <MdOutlineEmergencyShare />,
      value: "3",
      badgeText: "Personal en emergencia",
    },
    { name: <GiPoliceCar />, value: "4", badgeText: "Personal en  emergencia" },
    {
      name: <CgUnavailable />,
      value: "5",
      badgeText: "Personal en ausente",
    },
  ];

  const selectedRadio = radios.find((radio) => radio.value === radioValue);

  return (
    <>
      <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Badge
        bg="secondary"
        text="dark "
        style={{ padding: "0.8em", fontSize: "1.4em" }}
      >
        {selectedRadio?.badgeText}
      </Badge>

      {"d"}
    </>
  );
}

export default ButtonOptionsState;
