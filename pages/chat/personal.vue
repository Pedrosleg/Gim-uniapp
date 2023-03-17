<template>
	<view class="content">
			<scroll-view :style="{height: msgViewsHeight}" scroll-y="true" :scroll-top="scrollTop" >
				<view v-for="msgView, i in msgs['msgs']">
						<view class="msgView" style="justify-content: flex-end;" v-if="msgView.fr == loginUid">
							<view class="text" style="margin-right: 5px; background-color: #d1f879;">{{msgView.data.text}}</view>
							<image class="avatar" src="../../static/botAvatar.png"></image>
						</view>
						<view class="msgView" v-else>
							<image class="avatar" src="../../static/botAvatar.png"></image>
							<view class="text" style="margin-left: 5px;background-color: aliceblue">{{msgView.data.text}}</view>
						</view>
				</view>	
			</scroll-view> 
			
	
			<view id="abc" class="inputAreaView" :style="{height: inputAreaHeight}">
				<textarea class="input" placeholder="输入新消息" @confirm="confirm" :value="val" @input="theBlur" ></textarea>
				<image src="/static/photo.png" class="photo"></image>
				<image src="/static/emotion.png" class="emotion"></image>
			</view>
	</view>
</template>

<script>
	
	import store from '@/store/index.js'
	import Chat from '@/common/ws.js'
	import consts from '@/common/consts.js'
	import {Gtx} from '@/common/gtx.js'
	import {ReadMsgsBuilder, TextMsgBuilder} from '@/common/builders/msgBuilder.js'
	import {DateFormat} from '@/common/dateFormat.js'
	
	export default {
		
		data() {
			return {
				message: "",
				toUid: "",
				val: "",
				scrollTop: 0,
				inputAreaHeight: "88px",
				scrollRealHeight: 0,
				loginUid: Gtx.getLogin().uid
			}
		},
		
		computed: {
			
			msgViewsHeight() {
				return uni.getWindowInfo().windowHeight - 94 + 'px'
			},
			
			msgs() {
				try {
					setTimeout(() => {
						uni.createSelectorQuery().selectAll('.msgView')
						.boundingClientRect((data) => {
							let dt = 0
							data.forEach(d => {
								dt += d.height
							})
							this.scrollRealHeight = dt
							console.log(this.scrollRealHeight)
							this.scrollTop = this.scrollRealHeight - parseInt(this.msgViewsHeight)
							console.log(this.scrollTop)
						}).exec()
	
					}, 10)
				} catch(e) {
					console.log(e)
				}
				
				let msgs = store.state.msgs[this.toUid] == undefined ? [] 
				: store.state.msgs[this.toUid]
				
				//将最新的1条消息，提交"已读"状态
				if (msgs.length != 0) {
					let lastMsgId = msgs[msgs.length-1].msgId
					// //如果已经提交过，不再重复提交
					let rml = store.state.readMsgs.length
					if (rml == 0 || store.state.readMsgs[rml-1] != lastMsgId) {
						let readMsgs = new ReadMsgsBuilder()
							.setFr(Gtx.getLogin().uid)
							.setMsgType(consts.MSG_TYPE.READ_MSG)
							.setReadMsgIds([lastMsgId])
							.build()
						
						Chat.getInstance().send(readMsgs)
					}
				} 

				//将提示数清空
				store.state.tipCount[this.toUid] = 0

				return  {
					msgs : msgs,
					l: msgs.length
				}
			}
		},
		
		
		onLoad(option) {	
			this.toUid = option.uid
			uni.setNavigationBarTitle({
				title: this.toUid
			})
		},
		
		methods: {
			
			theBlur(e) {
				if (e.detail.value.indexOf('\n') != -1) {
					uni.hideKeyboard()
					this.confirm()
					return
				}
				this.val = e.detail.value;
			},
			
			confirm(event) {
				
				console.log("eee")
				try {
					
					let textMsg = new TextMsgBuilder()
						.setFr(Gtx.getLogin().uid)
						.setTo(this.toUid)
						.setMsgType(consts.MSG_TYPE.TEXT)
						.setText(this.val)
						.build()
					
					store.commit('addReadMsgs', [textMsg.msgId])
					Chat.getInstance().send(textMsg)
					Chat.getInstance().pushMsg(textMsg)
	
					this.val = ""
				
				} catch (e) {
					console.log(e)
				}
			},
			dateTransform(t) {
				return DateFormat.transform(t)
			}
		}
	}
</script>

<style>
	.inputAreaView {

		border-top-style: solid;
		border-top-width: 0.1px;
		border-top-color: #eeeeee;
		width: 100%;
		position: fixed;
		bottom: 0px;
		display: flex;
	}
	.input {
		font-size: 14px;
		color: #8f8f94;
		margin-top: 8px;
		width: 80%;
		height: 72px;
		margin-left: 12px;
	}
	
	.emotion {
		width: 24px;
		height: 24px;
		margin-top: 5px;
		margin-left: 6px;
		margin-right: 12px;
	}
	
	.photo {
		width: 24px;
		height: 24px;
		margin-left: 6px;
		margin-top: 5px;
	}

	.avatar {
		margin-top: 12px;
		width: 32px;
		height: 32px; 
	}
	
	.text {
		word-wrap: break-word; 
		overflow-wrap: break-word;
		margin-top: 12px;
		font-size: 15px;
		border-radius: 5px;
		padding: 10px;
		max-width: 60%;
	}

	.msgView {
		display: flex;
		flex-direction: row;
		margin-left: 8px;
		margin-right: 8px;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
