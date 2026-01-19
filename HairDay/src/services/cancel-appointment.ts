import { apiConfig } from "./api-config";

export async function cancelAppointment(id: string) {
    const response = await fetch(`${apiConfig.baseURL}/appointments/${id}`,
        { method: 'DELETE' }
    )

    if (!response.ok) {
        throw new Error("Erro ao cancelar agendamento.")
    }

    return true
}
