import Pusher from 'pusher-js';
import {Api} from '../axios-config'

const pusherKey = "5918ae5c8a1c68cce96d"
const pusherCluster = "sa1"

if (!pusherKey || !pusherCluster) {
    console.error('As variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER devem estar definidas.');
    throw new Error('Variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER não estão definidas.');

}

const pusher = new Pusher(pusherKey, {
    cluster: pusherCluster,
    forceTLS: true,
});



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

export const UserService = {
    addParticipant
}

