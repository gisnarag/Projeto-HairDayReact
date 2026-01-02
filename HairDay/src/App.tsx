import Text from "./components/text";
import Button from "./components/button";
import Input from "./components/input";
import Icon from "./components/icon";
import DayIcon from "./assets/sun.svg?react";
import AfternoonIcon from "./assets/afternoon.svg?react";
import NightIcon from "./assets/night.svg?react";
import PersonIcon from "./assets/person.svg?react";
import RightIcon from "./assets/right.svg?react";
import LeftIcon from "./assets/left.svg?react";
import CalendarIcon from "./assets/calendar.svg?react";
import TrashIcon from "./assets/trash.svg?react";

export default function App() {

  return (
    <>
      <Text className="text-gray-700">
        SURTANDO
      </Text>

      <div>
        <Icon svg={DayIcon} animate={true} />
        <Icon svg={AfternoonIcon} animate={true} />
        <Icon svg={NightIcon} animate={true} />
        <Icon svg={PersonIcon} className=" fill-yellow" />
        <Icon svg={RightIcon} className=" fill-yellow" />
        <Icon svg={LeftIcon} className=" fill-yellow" />
        <Icon svg={CalendarIcon} className=" fill-yellow" />
        <Icon svg={TrashIcon} className=" fill-yellow" />
      </div>

      <div>
        <Button disabled className="w-80" />
        <Button className="w-80" />
      </div>

      <div className=" flex w-80 h-15 gap-3 px-3 py-4 bg-gray-500 rounded-md border border-gray-200 cursor-pointer">
        <Icon svg={CalendarIcon} className=" fill-yellow"></Icon>
        <Input type="date" className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 cursor-pointer focus:outline-none" />
      </div>

      <div className=" flex w-80 h-15 gap-3 px-3 py-4 bg-gray-500 rounded-md border border-gray-200 cursor-pointer">
        <Icon svg={PersonIcon} className=" fill-yellow"></Icon>
        <Input type="text" className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 focus:outline-none" />
      </div>
    </>
  )
}
