// import Pusher from 'pusher-js';
// import {Environment} from "../../utils/Environment";
//
// const pusherKey = "5918ae5c8a1c68cce96d"
// const pusherCluster = "sa1"
//
// if (!pusherKey || !pusherCluster) {
//     console.error('As variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER devem estar definidas.');
//     throw new Error('Variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER não estão definidas.');
//
// }
//
// const userId = localStorage.getItem('userId');
// console.log("userId no pusher: ", userId)
//
// const pusher = new Pusher(pusherKey, {
//     cluster: pusherCluster,
//     forceTLS: true,
//     authEndpoint:Environment.SERVER_URL + '/pusher/auth',
//     auth: {
//         params: {
//             id: userId,
//         },
//     },
// });
//
// export default pusher;