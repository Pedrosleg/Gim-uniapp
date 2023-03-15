<template>
	<view class="content">
		<scroll-view v-for="chatView in chatViews">
			<view class="chatCell" @click="f(chatView.name)" >
				<view class="avatarView">
					<image class="avatar" :src="chatView.avatar"></image>
					<view class="tips" v-if="chatView.tipCount > 0">{{chatView.tipCount}}
					</view>
				</view>
				<view class="textView">
					<view class="username">{{chatView.name}}</view>
					<view class="text">{{chatView.text}}</view>
				</view>
				<view class="dateView">{{chatView.date}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	import consts from '@/common/consts.js'
	import Chat from '@/common/ws.js'
	import {Gtx} from '@/common/gtx.js'
	import store from '@/store/index.js'
	import {SessionBuilder} from '@/common/builders/sessionBuilder.js'
	import {DateFormat} from '@/common/dateFormat.js'
	
	export default {
		
		data() {
			return {
			
			}
		},
		
		
		
		computed: {
			
			chatViews() {
				try {
					
					if (!Gtx.getLogin().uid) return
					
					if (Object.keys(store.state.msgs).length == 0) {
						
						let toUid = Gtx.getLogin().uid == '123' ? '456' : '123'
						
						let tipCount = store.state.tipCount[toUid] == undefined ? 0 :
							store.state.tipCount[toUid]
							
						let session = new SessionBuilder()
							.setAvatar("../../static/botAvatar.png")
							.setName(toUid)
							.setDate("12:00")
							.setText("hi, sb")
							.setTipCount(tipCount)
							.build()
						return [session]
						
					} else {
						let chatViews = []
						
						for (let toUid in store.state.msgs) {
							let msgs = store.state.msgs[toUid]
							let lastMsg = msgs[msgs.length - 1]
							
							let tipCount = store.state.tipCount[toUid] == undefined ? 0 :
								store.state.tipCount[toUid]
							
							let session = new SessionBuilder()
								.setAvatar("../../static/botAvatar.png")
								.setName(toUid)
								.setDate(DateFormat.transform(lastMsg.sendTimestamp))
								.setText(lastMsg.data.text)
								.setTipCount(tipCount)
								.build()
							chatViews.push(session)
						}
						return chatViews
					}
				} catch(e) {
					console.log(e)
				}
			}
			
		},
		
		created() {
			
			if (!Gtx.getLogin().uid) {
				uni.reLaunch({
					url:"/pages/tabBar/login"
				})
				return
			}
						
			Chat.getInstance().connect()
		},
		
		methods: {
			f(i) {
				uni.navigateTo({
					url: "/pages/tabBar/chat?uid="+i
				})
			}
		}
	}
</script>

<style>
	.tips {
		background-color: red;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		text-align: center;
		line-height: 18px;
		width: 18px;
		height: 18px;
		font-size: 11px;
		font-weight: 700;
		color: white;
		border-radius: 6px;
		border-style: solid;
		border-width: 1px;
		border-color: white;
	}
	.username {
		font-size: 15px;
		height: 21px;
		line-height: 21px;
	}
	.text {
		font-size: 13px;
		height: 18px;
		line-height: 18px;
		color: #8f8f94;
	}
	.dateView {
		color: #8f8f94;
		margin-top: 8px;
		height: 33px;
		width: 41px; 
		line-height: 33px;
		margin-right: 12px;
		font-size: 12px;
	}
	.textView {
		margin-top: 15px;
		height: 43px;
		width: 100%; 
		margin-left: 12px;
		margin-right: 12px;
	}
	.avatarView {
		position: relative;
		height: 55px;
		width: 55px; 
		margin-top: 8px;
		margin-left: 12px;
	}
	.avatar {
		width: 55px;
		height: 55px; 
	}
	.chatCell {
		display: flex;
		flex-direction: row;
		height: 72px;
	}
	.content {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
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
