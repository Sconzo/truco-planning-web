
import {Api} from '../axios-config'

async function addParticipant(name : string, sessionId : string, spectator : boolean) {
    try {
        const response = await Api.post('/user', {
            name,
            sessionId,
            spectator,
        });

        const participantId = response.data.userId;

        console.log(`Participante adicionado com ID: ${participantId}`);
        return participantId;
    } catch (error) {
        console.error('Erro ao adicionar participante:', error);
    }
}

async function removePlayer(userId : string, sessionId : string) {
    try {
        const response = await Api.post('/user/remove', {
            userId,
            sessionId,
        });

        const participantId = response.data.userId;

        console.log(`Participante removido com ID: ${participantId}`);
        return participantId;
    } catch (error) {
        console.error('Erro ao remover participante:', error);
    }
}

async function userVoted( sessionId : string,userId : string, vote : string) {
    try {
        const response = await Api.post('/user/vote', {
            sessionId,
            userId,
            vote,
        });

        const participantId = response.data.userId;

        console.log(`Votou: ${participantId}`);
        return participantId;
    } catch (error) {
        console.error('Erro ao votar:', error);
    }
}

export const UserService = {
    addParticipant,
    removePlayer,
    userVoted
}

