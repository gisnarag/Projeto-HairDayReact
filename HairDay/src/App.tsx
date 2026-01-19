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
import ScheduleItem from "./components/schedule-item";
import ButtonTrashIcon from "./components/button-trash-icon";
import useDateInput from "./hooks/use-date-input";
import useButtonHourSelected from "./hooks/use-button-hour";
import { openingHours } from "./utils/opening-hours";
import ButtonItem from "./components/button-item";
import useTextInput from "./hooks/use-text-input";
import { newAppointment } from "./services/new-appointment";
import { today } from "./hooks/use-date-input";
import { useEffect, useState } from "react";
import { apiConfig } from "./services/api-config";
import dayjs from "dayjs";
import { cancelAppointment } from "./services/cancel-appointment";

export default function App() {

  const { dateInput, setDateInput, handleChangeDateInput } = useDateInput();

  const { selectedHour, setSelectedHour, handleButtonHourSelected } = useButtonHourSelected();

  const { name, setName, handleTextInput } = useTextInput();

  const [isBookings, setIsBookings] = useState<{ hour: string, date: string }[]>([])

  const [bookings, setBookings] = useState<{ client: string, hour: string, id: string }[]>([])

  const hoursMorning = openingHours.filter(item => item.period === "morning").map(item => item.hour)
  const hoursAfternoon = openingHours.filter(item => item.period === "afternoon").map(item => item.hour)
  const hoursNight = openingHours.filter(item => item.period === "night").map(item => item.hour)

  function isPastHour(hour: string) {
    if (!dayjs(dateInput).isSame(dayjs(), "day")) {
      return false
    }

    const selectedDateTime = dayjs(`${dateInput} ${hour}`)
    return selectedDateTime.isBefore(dayjs())
  }

  interface Booking {
    id: string,
    client: string,
    hour: string,
    date: string
  }

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch(`${apiConfig.baseURL}/appointments`)
      const data = await response.json()

      // isBooking guarda apenas hour + date para bloquear horários, não representa um agendamento completo, por isso não usa id
      const blocked = data.map((item: Booking) => ({
        hour: item.hour,
        date: item.date
      }))

      setIsBookings(blocked)
    }

    loadBookings()
  }, [])

  function isBooked(hour: string, date: string): boolean {
    return isBookings.some(booking => {
      console.log({ bookingHour: booking.hour, bookingDate: booking.date, hour, date })
      return booking.hour === hour && booking.date === date
    })
  }

  async function fetchLoadBookings(date: string) {
    const response = await fetch(`${apiConfig.baseURL}/appointments`)
    const data: Booking[] = await response.json();

    const filteredBookings = data.filter(book => book.date === date).map(book => ({ client: book.client, hour: book.hour, id: book.id }))
    setBookings(filteredBookings)
  }

  useEffect(() => {
    fetchLoadBookings(dateInput)
  }, [dateInput])

  async function handleCancelAppointment(
    id: string,
    hour: string,
    date: string
  ) {
    try {
      await cancelAppointment(id)

      setBookings(prev =>
        prev.filter(booking => booking.id !== id)
      )

      setIsBookings(prev =>
        prev.filter(
          booking =>
            booking.hour !== hour || booking.date !== date
        )
      )
    } catch {
      alert("Erro ao cancelar o agendamento 😿")
    }
  }

  async function handleConfirmButton() {
    if (!selectedHour || !dateInput || !name) {
      alert("Preencha todos os campos para agendamento! \u{1F63C}")
      return;
    }

    const payload = {
      hour: selectedHour,
      date: dateInput,
      client: name
    };

    // Ei função, toma esse pacote de dados aqui 
    await newAppointment(payload)

    await fetchLoadBookings(dateInput)

    // Atualiza estado para renderizar o componente e o disabled ser habilitado logo após um novo agendameto
    setIsBookings(prev => [...prev, {
      hour: selectedHour,
      date: dateInput,
    }]
    )

    setDateInput(today);
    setSelectedHour("");
    setName("");
  }

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
            <Input type="date" value={dateInput} min={dateInput} className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 focus:outline-none cursor-pointer" onChange={handleChangeDateInput} onKeyDown={(e) => e.preventDefault()} />
          </ContainerStyle>

          <Text as="h2" appearance="secondary" variant="title-md" className="mt-10 ml-10">Horários</Text>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-2 ml-10">Manhã</Text>

          <ul className="bg-gray-700 h-12 ml-10 flex items-center justify-between w-95">
            <li className="flex gap-3" >
              {hoursMorning.map(hour => (
                <ButtonItem key={hour} selected={selectedHour == hour} onClick={() => handleButtonHourSelected(hour)} disabled={isBooked(hour, dateInput) || isPastHour(hour)}>
                  {hour}
                </ButtonItem>
              ))}
            </li>
          </ul>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-3 ml-10">Tarde</Text>

          <ul className="bg-gray-700 h-25 ml-10 flex items-center justify-between w-95">
            <li className="flex flex-wrap gap-3" >
              {hoursAfternoon.map(hour => (
                <ButtonItem key={hour} selected={selectedHour == hour} disabled={isBooked(hour, dateInput) || isPastHour(hour)} onClick={() => handleButtonHourSelected(hour)}>
                  {hour}
                </ButtonItem>
              ))}
            </li>
          </ul>

          <Text as="p" appearance="secondary" variant="body-text-md" className="mt-3 ml-10">Noite</Text>

          <ul className="bg-gray-700 h-12 ml-10 flex items-center justify-between w-95">
            <li className="flex gap-3" >
              {hoursNight.map(hour => (
                <ButtonItem key={hour} selected={selectedHour == hour} onClick={() => handleButtonHourSelected(hour)} disabled={isBooked(hour, dateInput) || isPastHour(hour)}>
                  {hour}
                </ButtonItem>
              ))}
            </li>
          </ul>

          <Text as="h2" appearance="secondary" variant="title-md" className="mt-10 ml-10 mb-2">Cliente</Text>

          <ContainerStyle variant="secondary" className="ml-10 bg-gray-700">
            <Icon svg={PersonIcon} className=" fill-yellow"></Icon>
            <Input type="text" placeholder="Nome do cliente" value={name} className="font-sans text-base leading-6 text-gray-200 border-b-gray-200 focus:outline-none" onChange={handleTextInput} />
          </ContainerStyle>

          <div className="ml-10 mt-7">
            <Button className="w-90" onClick={() => handleConfirmButton()} />
          </div>
        </section>

        <aside className="bg-gray-800 flex-col">

          <div className="bg-gray-800 flex flex-row-reverse mr-20">

            <ContainerStyle variant="sm" className="ml-auto mt-25 bg-gray-700">
              <Icon svg={CalendarIcon} className=" fill-yellow"></Icon>
              <Input type="date" value={dateInput} min={dateInput} className="font-sans text-base leading-6 text-gray-200 focus:outline-none cursor-pointer" onChange={handleChangeDateInput} onKeyDown={(e) => e.preventDefault()} />
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
                <Icon svg={DayIcon} className="fill-yellow mt-3 ml-2"></Icon>
                <ServicePeriodList period={"morning"} label={"Manhã"} className="mt-4 mb-3 ml-1 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-4" appearance="tertiary">09h-12h</Text>
            </ContainerStyle>

            {bookings.filter(booking => hoursMorning.includes(booking.hour)).map((booking) => (
              <ScheduleItem
                key={booking.id}
                client={booking.client}
                hour={booking.hour}
                className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
                <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-5" onClick={() => handleCancelAppointment(booking.id, booking.hour, dateInput)} />
              </ScheduleItem>
            ))}

            <ContainerStyle className="border border-gray-500 border-b-gray-500 bg-gray-800">
              <div className="flex px-2 gap-1.5">
                <Icon svg={AfternoonIcon} className="fill-yellow mt-3 ml-2"></Icon>
                <ServicePeriodList period={"afternoon"} label={"Tarde"} className="mt-4 mb-3 ml-1 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-4" appearance="tertiary">13h-17h</Text>
            </ContainerStyle>

            {bookings.filter(booking => hoursAfternoon.includes(booking.hour)).map((booking) => (
              <ScheduleItem
                key={booking.id}
                client={booking.client}
                hour={booking.hour}
                className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
                <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-5" onClick={() => handleCancelAppointment(booking.id, booking.hour, dateInput)} />
              </ScheduleItem>
            ))}

            <ContainerStyle className="border border-gray-500 border-b-gray-500 bg-gray-800">
              <div className="flex px-2 gap-2">
                <Icon svg={NightIcon} className="fill-yellow mt-3 ml-2" animate={true}></Icon>
                <ServicePeriodList period={"night"} label={"Noite"} className="mt-4 mb-3 ml-1 cursor-default" />
              </div>
              <Text className="text-gray-300 mt-4" appearance="tertiary">18h-21h</Text>
            </ContainerStyle>

            {bookings.filter(booking => hoursNight.includes(booking.hour)).map((booking) => (
              <ScheduleItem
                key={booking.id}
                client={booking.client}
                hour={booking.hour}
                className="flex mb-3 border border-gray-500 border-t-0 bg-gray-800">
                <ButtonTrashIcon icon={TrashIcon} className="ml-auto mt-5 mb-5" onClick={() => handleCancelAppointment(booking.id, booking.hour, dateInput)} />
              </ScheduleItem>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  )
}
