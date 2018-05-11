import Pusher from 'pusher-js'
const _pusher = new Pusher('bd745946701981a075e9',{
      cluster: 'ap2',
      encrypted: false,
      auth: {
   		 headers: {
     	 'Access-Control-Allow-Origin': "enable"
   		 }
 	   }
    });
export default {
	pusher: _pusher
}






