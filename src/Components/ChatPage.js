import React, { Component } from 'react';
import axios from 'axios';
import { AutoSizer, List } from 'react-virtualized';
import Apis from '../Common/api.js';
import Configs from '../Common/configs.js';
import { Card, Feed ,Form, TextArea ,Button} from 'semantic-ui-react';
import { ChatPageStyles as styles } from '../Styles';
import UserImage from '../Assets/Images/user.jpg'

class ChatPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			ListData: [],
			chatData:[],
			usermessage:''
		};
	}

	componentDidMount(){
		const urlForUsers= Apis.base + Apis.getUsers;
		const urlForMessages=Apis.base+Apis.getChat;
		const pusher = Configs.pusher;
		const channel  = pusher.subscribe('pusher-chatroom');

		axios.get(urlForUsers).then((response)=>{
			console.log(response);
			this.setState({
				ListData:response.data
			})
		})

		axios.get(urlForMessages).then((response)=>{
			console.log(response.data);
			this.setState({
				chatData:response.data
			},()=>{
				this.ChatListWindow.scrollToPosition((this.state.chatData.length-1)*70);
			})
		})

		channel.bind('addedUser', (data)=> {
			let oldList = this.state.ListData;
			let alreadyExist = false;
			oldList.map((ind)=> {
				if(ind.name === data.name)
					alreadyExist = true;
				return(null);
			});
			if(!alreadyExist) {
					oldList.push(data);
					this.setState({ListData:oldList});
			}
		})
	
		channel.bind('addedMessage',(data)=>{
			let oldMessages=this.state.chatData;
			oldMessages.push(data);
			this.setState({chatData:oldMessages},()=>{
				this.ChatListWindow.scrollToPosition((this.state.chatData.length-1)*70);
			});
		})
	}

	rowRenderer = ({style=styles, key, index}) => {
		return(
			<div>
				<Feed style={styles.singleCard}>
	        		<Feed.Event>
			          <Feed.Label image={UserImage}/>
			          <Feed.Content>
			            <Feed.Date content={this.state.ListData[index].date} style={styles.lastActive} />
			            <Feed.Summary>
			              <a>{this.state.ListData[index].name} joined chatroom</a> 
			            </Feed.Summary>
			          </Feed.Content>
			        </Feed.Event>
		        </Feed>
		    </div>
		)
	}

	rowRendererchat= ({style=styles,key,index}) =>{
		let { chatData} = this.state;

 		if (this.state.chatData[index].name === this.props.match.params.name) {
 			return(
 				<Card style={styles.yourChat}>
			    	<Card.Content>
			        	<Card.Meta>{chatData[index].name}</Card.Meta>
			        	<Card.Description>{chatData[index].message}</Card.Description>
			      	</Card.Content>
	            </Card>
			)
 		} else {
			return(
				<Card style={styles.indivisualChat}>
			    	<Card.Content>
				     	<Card.Meta>{chatData[index].name}</Card.Meta>
				        <Card.Description>{chatData[index].message}</Card.Description>
			     	</Card.Content>
	            </Card>
			)
		}
	}

	addToMessageArray = () =>{
		let url = Apis.base+Apis.addMessage;
		try {
			axios.post(url, {
				message:this.state.usermessage,
				name:this.props.match.params.name
			});
		}
		catch(e){
			console.log(e);
		}
	}

	render(){
		return(
			<div style={styles.chatroom}>
				<div style={styles.userShare}>
					<AutoSizer>{
						({width=300, height=600}) =>(
								<List
									width={width}
								    height={height}
								    rowCount={this.state.ListData.length}
								    rowHeight={60}
								    rowRenderer={this.rowRenderer}
								    autoheight
		 						/>
							)
						}
					</AutoSizer>
				</div>
				<div style={styles.chatShare}>
					<div style={styles.innerchatShare}>
						<AutoSizer>{
							({width=500, height=700}) =>(
									<List
										ref={(e)=> this.ChatListWindow=e}
										onScroll={this.onScrollHandler}
					    				width={width}
									    height={height}
									    rowCount={this.state.chatData.length}
									    rowHeight={65}
									    rowRenderer={this.rowRendererchat}
									    autoheight
			 						/>
								)
							}
						</AutoSizer>
					</div>
					<Form  style={styles.addMessage}>
	               		<TextArea style={{maxWidth:'73vw'}} autoHeight placeholder='Type your message...' value={this.state.usermessage} onChange={(event)=>this.setState({usermessage:event.target.value})}/>
	                	<Button secondary style={{height:'70px'}} onClick={this.addToMessageArray}>SEND</Button>
	                </Form>
                </div>
			</div>
		)
	}
}

export default ChatPage;