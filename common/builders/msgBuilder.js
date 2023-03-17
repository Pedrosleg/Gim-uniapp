
class MsgBuilder {
	
	setFr(fr) {
		this.fr = fr
		return this
	}

	setTo(to) {
		this.to = to
		return this
	}
	
	setMsgType(msgType) {
		this.msgType = msgType
		return this
	}

	build() {
		
		let nowTimestamp = Date.now();
		
		return {
			msgId: nowTimestamp + '_' + Math.random().toString(36).substr(2, 9),
			fr: this.fr,
			to: this.to,
			sendTimestamp: nowTimestamp,
			msgType: this.msgType,
		}
	}
	
}

/**
 * 登录消息
 */
export class LoginMsgBuilder extends MsgBuilder {}

/**
 * 文本消息
 */
export class TextMsgBuilder extends MsgBuilder {
	
	setText(text) {
		this.text = text
		return this
	}
	
	build() {
		let d = super.build()
		d['body'] = {
			text: this.text
		}
		return d
	}
}

/**
 * 读消息
 */
export class ReadMsgsBuilder extends MsgBuilder {
	
	setReadMsgIds(readMsgIds) {
		this.readMsgIds = readMsgIds
		return this
	}
	
	build() {
		let d = super.build()
		d['body'] = {
			readMsgIds: this.readMsgIds
		}
		return d
	}
}

/**
 * 拉消息
 */
export class PullMsgBuilder extends MsgBuilder {}

/**
 * 收到消息
 */
export class ReceiveMsgBuilder extends MsgBuilder {
	
	setSeqs(seqs) {
		this.seqs = seqs
		return this
	}
	
	build() {
		let d = super.build()
		d['body'] = {
			seqs: this.seqs
		}
		return d
	}
	
}