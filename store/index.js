// 页面路径：store/index.js
import { createStore } from 'vuex'
import {Gtx} from '@/common/gtx.js'

export default createStore({
	
	state : {
		//本地消息列表
		msgs: {},
		//已读消息列表
		readMsgs: [],
		//未读消息数
		tipCount: {},
	},
	
	mutations: {
		push(state, data) {
			let key = Gtx.getLogin().uid != data.fr ? data.fr : data.to
			if (state.msgs[key] == undefined) {
				state.msgs[key] = [];
			}
			state.msgs[key].push(data)
		},
		addReadMsgs(state, msgs) {
			state.readMsgs = state.readMsgs.concat(msgs)
		},
		addTipCount(state, data) {
			let uid = data.uid
			let count = data.count
			if (state.tipCount[uid] == undefined) {
				state.tipCount[uid] = 0
			}
			state.tipCount[uid] += count
		}
	}
	
})