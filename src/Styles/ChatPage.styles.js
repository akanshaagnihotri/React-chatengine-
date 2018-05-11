const styles={
	chatroom:{
		display:'flex',
		flexDirection:'row',
		background:'linear-gradient(rgb(31, 97, 218), rgba(59, 197, 165, 0.73))',
		width:'100vw',
		height:'100vh'
	},
	chatShare:{
		flex:3,
		display:'flex',
		flexDirection:'column',

		
	},
	userShare:{
		flex:1,
		backgroundColor:'rgba(0,0,0,0.8)'
	},
	singleCard:{
		margin:15
	},
	lastActive:{
		color:'white'
	},
	innerchatShare:{
		flex:8,
		backgroundColor:'rgba(0,0,0,0.8)',
		width:'80vw',
		height:'100vh',
		margin:'0px',
		
	},
	indivisualChat:{
		margin:15
	},
	yourChat:{
		margin:10,
		backgroundColor:'#c9cdfb',
		marginLeft:750

	},
	addMessage:{
      flex:1,
      margin:'5px'
	}
	


}
export default styles;