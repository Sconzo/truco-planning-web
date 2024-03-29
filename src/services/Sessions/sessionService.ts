import {Api} from '../axios-config'
import {RoomInterface} from "../../interfaces/RoomInterface";
import {SystemInterface} from "../../interfaces/SystemInterface";
import {CustomSystemResponse} from "../../dtos/CustomSystemResponse";
import {CustomSystemRequest} from "../../dtos/CustomSystemRequest";

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


async function votesReveal(mean: string, sessionId: string) {
    try {
        const response = await Api.patch('/session/reveal', {
            mean,
            sessionId,
        });
        return response;
    } catch (error) {
        console.error('Erro ao revelar votos:', error);
    }
}

async function newRound(sessionId : string) {
    try {
        const response = await Api.patch('/session/reset', {
            sessionId,
        });
        return response;
    } catch (error) {
        console.error('Erro ao ao renovar rodada:', error);
    }
}

async function listAllDecks() : Promise<SystemInterface[]>{
    try {
        const response = await Api.get('/deck/list');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar decks:', error);
        return Promise.reject("Erro ao listar decks");
    }
}

// async function createDeck(deck : SystemInterface) : Promise<SystemInterface>{
//     try {
//         const response = await Api.post('/deck', {
//             name : deck.name,
//             values : deck.intValues
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Erro ao listar decks:', error);
//         return Promise.reject("Erro ao listar decks");
//     }
// }

async function createSessionCustomDeck(customSystemRequest: CustomSystemRequest) : Promise<CustomSystemResponse> {
    try {
        const response = await Api.post('/session/custom-deck', {
            customSystemRequest
        });
        const systemResponseInterface : CustomSystemResponse = response.data;

        console.log(`Sessão criada com ID: ${systemResponseInterface.sessionId}`);
        return systemResponseInterface;
    } catch (error) {
        console.error('Erro ao criar sessão:', error);
        return Promise.reject("Erro ao criar deck");
    }
}

export const SessionService = {
    createSession,
    getSessionById,
    votesReveal,
    newRound,
    listAllDecks,
    //createDeck
    createSessionCustomDeck
}
