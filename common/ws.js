import consts from "@/common/consts.js"
import {Gtx} from "@/common/gtx.js"
import store from '@/store/index.js'
import {LoginMsgBuilder, PullMsgBuilder, ReceiveMsgBuilder} from '@/common/builders/msgBuilder.js'

class Chat {
	
	constructor() {
		this.socketTask = null
		this.connecting = false
		this.reconnectTimes = 0
	}
	
	static getInstance() {
		if (!this.instance) {
			this.instance = new Chat()
		}
		return this.instance
	}
	
	getWsIp() {
		if (!this.wsIp && !(this.wsIp = uni.getStorageSync("wsIp"))) {
			this.wsIp = '127.0.0.1'	
		}
		return this.wsIp
	}
	
	setWsIp(wsIp) {
		this.wsIp = wsIp
		uni.setStorageSync("wsIp", wsIp)
	}
	
	/**
	 * 建立连接
	 */
	connect() {

		
		try {
			
			this.socketTask = uni.connectSocket({
			  url: 'ws://' + this.getWsIp() + ':8081/websocket',
			  success() {
				  console.log("开始建立连接")
				  return this.socketTask
			  }
			});
			
			
			this.socketTask.onMessage((data) => {
				console.log("收到数据:"+data.data)
				this.onMessage(JSON.parse(data.data))
			})
			
			this.socketTask.onOpen((e) => {
				console.log("连接已打开")	
				store.commit('setConnectProcess', 'ok')		
				this.reconnectTimes = 0
				this.login()
				this.pullMsg()
				
			})
			
	
			this.socketTask.onError((e) => {
				this.reconnect()
			})
			
			this.socketTask.onClose((e) => {
				this.reconnect()
			})
			
		} catch(e) {
			console.log(e)
		}
		
	}
	
	login() {
		let loginMsg = new LoginMsgBuilder()
			.setFr(Gtx.getLogin().uid)
			.setMsgType(consts.MSG_TYPE.LOGIN)
			.build()
		this.send(loginMsg)
	}
	
	pullMsg() {
		let pullMsg = new PullMsgBuilder()
			.setFr(Gtx.getLogin().uid)
			.setMsgType(consts.MSG_TYPE.PULL_MSG)
			.build()
		this.send(pullMsg)
	}
	
	recevieMsg(seqs) {
		let receiveMsg = new ReceiveMsgBuilder()
			.setFr(Gtx.getLogin().uid)
			.setMsgType(consts.MSG_TYPE.RECEIVE_MSG)
			.setSeqs(seqs)
			.build()
		this.send(receiveMsg)
	}

	reconnect() {
		if (this.connecting) {
			return
		}
		store.commit('setConnectProcess', '连接失败,' + '第' + ++this.reconnectTimes + '次重连...' + this.wsIp)
		this.connecting = true;
		setTimeout(() => {
			this.connect()
			this.connecting = false;
		}, 2000)
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
