
import {Api} from '../axios-config'

async function createSession(name : string, votingSystem:string) {
    try {
        const response = await Api.post('/session/', {
            name,
            votingSystem
        });

        const sessionId = response.data.sessionId;

        console.log(`Sessão criada com ID: ${sessionId}`);
        return sessionId;
    } catch (error) {
        console.error('Erro ao criar sessão:', error);
    }
}

export const SessionService = {
    createSession
}
