import {Api} from '../axios-config'
import {RoomInterface} from "../../interfaces/RoomInterface";

async function createSession(name: string, votingSystemId: number) {
    try {
        const response = await Api.post('/session/', {
            name,
            votingSystemId
        });

        const sessionId = response.data.sessionId;

        console.log(`Sessão criada com ID: ${sessionId}`);
        return sessionId;
    } catch (error) {
        console.error('Erro ao criar sessão:', error);
    }
}

async function getSessionById(sessionId: string): Promise<RoomInterface> {
    try {
        const response = await Api.get(`/session/${sessionId}`);
        const session = response.data;

        console.log(`Sessão encontrada: ${session}`);
        return session;
    } catch (error) {
        console.error('Sessão não encontrada:', error);
        return Promise.reject("Sessão não encontrada");
    }
}

export const SessionService = {
    createSession,
    getSessionById
}
