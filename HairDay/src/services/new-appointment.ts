import { apiConfig } from "./api-config";

interface newAppointmentProps {
    hour: string,
    date: string,
    client: string,
};

export async function newAppointment(payload: newAppointmentProps) {

    // fetch recebe: URL e config da requisição
    const response = await fetch(`${apiConfig.baseURL}/appointments`, {

        // no POST você normalmente envia dados no body
        method: "POST",

        // headers são metadados da requisição HTTP, como etiquetas coladas na caixa. Eles dizem ao servidor como interpretar o que está sendo enviado. Ei servidor, o conteúdo que estou enviando está em JSON
        headers: {
            "Content-type": "application/json",
        },

        // body → é o conteúdo (os dados)
        body: JSON.stringify(payload)
    })

    // Mesmo se o servidor responder erro (400, 500), fetch ainda retorna um response, por isso para verificar usa-se -> response.ok. 
    // response.ok é uma propriedade booleana do objeto retornado pelo fetch, se o status HTTP foi sucesso (true)
    if (!response.ok) {
        console.log("Erro na requisição:", response.status)
        alert("Não foi possível agendar. Tente novamente mais tarde. \u{1F63F}")
        return;
    }

    alert("Agendamento realizado com sucesso! \u{1F638}")
} 
