import consts from "@/common/consts.js"
import {Gtx} from "@/common/gtx.js"
import store from '@/store/index.js'
import {LoginMsgBuilder} from '@/common/builders/msgBuilder.js'

class Chat {
	
	constructor() {
		this.conn = null
		this.socketTask = null
		this.connecting = false
		this.wsIp =  '127.0.0.1'
	}
	
	static getInstance() {
		if (!this.instance) {
			this.instance = new Chat
		}
		return this.instance
	}
	
	setWsIp(wsIp) {
		this.wsIp = wsIp
	}
	
	/**
	 * 建立连接
	 */
	connect() {
		
		try {
			
			this.socketTask = uni.connectSocket({
			  url: 'ws://' + this.wsIp + ':8081/websocket',
			  success() {
				  console.log("正在建立链接")
				  return this.socketTask
			  }
			});
			
			this.socketTask.onMessage((data) => {
				
				console.log("收到数据:"+data.data)
				this.onMessage(JSON.parse(data.data))
			})
			
			this.socketTask.onOpen((e) => {
				console.log("连接已打开")
				
				let loginMsg = new LoginMsgBuilder()
					.setFr(Gtx.getLogin().uid)
					.setMsgType(consts.MSG_TYPE.LOGIN)
					.build()
				
				this.send(loginMsg)
			})
			
			this.socketTask.onError((e) => {
				console.log("连接报错")
				this.reconnect('e')
			})
			
			this.socketTask.onClose((e) => {
				console.log("链接已经关闭")
				this.reconnect('c')
			})
			
		} catch(e) {
			console.log(e)
		}
		
	}
	
	reconnect(tag) {
		if (this.connecting) {
			return
		}
		this.connecting = true;
		setTimeout(() => {
			console.log("开始重连...")
			this.connect()
			this.connecting = false;
		}, 3000)
	}
	
	pushMsg(data) {
		store.commit('push', data)
	}

	
	onMessage(data) {
		store.commit('addTipCount', {
			"uid": data.fr,
			"count": 1
		})
		this.pushMsg(data)
	}
	
	/**
	 * 发送消息
	 */
	send(data) {
		let d = JSON.stringify(data)
		try {
			this.socketTask.send({
				data: d
			})
		} catch(e) {
			console.log(e)
		}
	}
	
}

export default Chat
