import Text from "./components/text";
import Button from "./components/button";
import Input from "./components/input";
import Icon from "./components/icon";
import DayIcon from "./assets/sun.svg?react";
import AfternoonIcon from "./assets/afternoon.svg?react";
import NightIcon from "./assets/night.svg?react";
import PersonIcon from "./assets/person.svg?react";
import CalendarIcon from "./assets/calendar.svg?react";
import TrashIcon from "./assets/trash.svg?react";
import Logo from "./assets/logo.svg?react";
import ServicePeriodList from "./components/service-period-list";
import ContainerStyle from "./components/container-style";
import ServicePeriodItem from "./components/service-period-item";
import ScheduleItem from "./components/schedule-item";
import ButtonTrashIcon from "./components/button-trash-icon";

export default function App() {

  return (
    <main className="bg-gray-800">

      <header className="absolute bg-gray-600 rounded-b-lg w-35 flex items-center justify-center py-3">
        <Logo />
      </header>

      <div className="flex gap-20 bg-gray-800">

        <section className="bg-gray-700 w-150 ml-10 px-10 h-220">
          <Text as="h1" appearance="inverse" variant="page-title" className="space-y-2 flex flex-col w-100 mt-18 ml-10">
            Agende um atendimento
          </Text>

          <Text as="p" appearance="secondary" className="space-y-2 flex flex-col w-100 mt-4 ml-10">
            Selecione data, horário e informe o nome do cliente para criar o agendamento.
          </Text>

          <Text as="h2" appearance="secondary" variant="title-md" className="mt-6 ml-10 mb-2">Data</Text>

          <ContainerStyle variant="secondary" className="ml-10 bg-gray-700">
            <Icon svg={CalendarIcon} className=" fill-yellow"></Icon>
            <Input type="date" className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 cursor-pointer focus:outline-none" />
          </ContainerStyle>

          <Text as="h2" appearance="secondary" variant="title-md" className="mt-10 ml-10">Horários</Text>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-2 ml-10">Manhã</Text>

          <ul className="bg-gray-700 h-12 ml-10 flex items-center justify-between w-95">
            <ServicePeriodItem period={"morning"} className="flex gap-3" />
          </ul>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-3 ml-10">Tarde</Text>

          <ul className="bg-gray-700 h-25 ml-10 flex items-center justify-between w-95">
            <ServicePeriodItem period={"afternoon"} className="flex flex-wrap gap-3" />
          </ul>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-3 ml-10">Noite</Text>

          <ul className="bg-gray-700 h-12 ml-10 flex items-center justify-between w-95">
            <ServicePeriodItem period={"night"} className="flex gap-3" />
          </ul>

          <Text as="h2" appearance="secondary" variant="title-md" className="mt-10 ml-10 mb-2">Cliente</Text>

          <ContainerStyle variant="secondary" className="ml-10 bg-gray-700">
            <Icon svg={PersonIcon} className=" fill-yellow"></Icon>
            <Input type="text" placeholder="Nome do cliente" className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 focus:outline-none" />
          </ContainerStyle>

          <div className="ml-10 mt-7">
            <Button className="w-80" />
          </div>
        </section>

        <aside className="bg-gray-800 flex-col">

          <div className="bg-gray-800 flex flex-row-reverse mr-20">

            <ContainerStyle variant="sm" className="ml-auto mt-25 bg-gray-700">
              <Icon svg={CalendarIcon} className=" fill-yellow"></Icon>
              <Input type="date" className="font-sans text-base leading-6 text-gray-200 cursor-pointer focus:outline-none" />
            </ContainerStyle>

            <div className="mt-32">
              <Text as="h2" appearance="inverse" variant="page-title">
                Sua agenda
              </Text>

              <Text as="p" appearance="secondary" className="mt-3">Consulte os seus cortes de cabelo agendados por dia.</Text>
            </div>
          </div>

          <ul className="bg-gray-800 mt-7 mr-20">
            <ContainerStyle className=" bg-gray-800 border border-gray-500 border-b-gray-500">
              <div className="flex px-2 gap-1.5">
                <Icon svg={DayIcon} className="fill-yellow mt-2"></Icon>
                <ServicePeriodList period={"morning"} label={"Manhã"} className="mt-3 mb-3 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-3" appearance="tertiary">09h-12h</Text>
            </ContainerStyle>

            <ScheduleItem className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
              <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-5" />
            </ScheduleItem>

            <ContainerStyle className="border border-gray-500 border-b-gray-500 bg-gray-800">
              <div className="flex px-2 gap-1.5">
                <Icon svg={AfternoonIcon} className="fill-yellow mt-2"></Icon>
                <ServicePeriodList period={"afternoon"} label={"Tarde"} className="mt-3 mb-3 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-3" appearance="tertiary">13h-17h</Text>
            </ContainerStyle>

            <ScheduleItem className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
              <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-5" />
            </ScheduleItem>

            <ContainerStyle className="border border-gray-500 border-b-gray-500 bg-gray-800">
              <div className="flex px-2 gap-2">
                <Icon svg={NightIcon} className="fill-yellow mt-2" animate={true}></Icon>
                <ServicePeriodList period={"night"} label={"Noite"} className="mt-3 mb-3 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-3" appearance="tertiary">18h-21h</Text>
            </ContainerStyle>

            <ScheduleItem className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
              <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-3" />
            </ScheduleItem>
          </ul>
        </aside>
      </div>
    </main>
  )
}
