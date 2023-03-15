<template>
	<view class="content">
		<image @click="setting" class="setting" src="../../static/setting.png"></image>
		<view style="text-align: center;">
			<image class="logo" src="../../static/login.png"></image>
		</view>
		<view>
			<input class="input" type="text" placeholder="账号" :value="username" @input="u_input"/>
			<input class="input" type="text" placeholder="密码" :value="password"/>
			<view class="confirm" @click="login">登录</view>
		</view>
	</view>
</template>

<script>	

	import store from '@/store/index.js'
	import {Gtx} from '@/common/gtx.js'
	import Chat from '@/common/ws.js'
	
	export default {
		
		
		data() {
			return {
				username : "",
				password : ""
			}
		},
		
		on() {
			uni.switchTab({
				url: "/pages/tabBar/index"
			})
		},
		
		
		methods: {
			login() {
				
				//记录登录状态
				Gtx.login(this.username)
				 
				uni.switchTab({
					url: "/pages/tabBar/index"
				})
			},
			u_input(e) {
				this.username = e.detail.value
			},
			
			setting() {
				uni.showModal({
					title: "设置ws地址",
					editable: true,
					success: function(res) {
						if (res.confirm) {
							Chat.getInstance().setWsIp(res.content)
						}
					}
				})
			}
		}
		
		
	}
</script>

<style>
	.logo {
		margin-top: 100px;
		margin-bottom: 30px;
		width: 61px;
		height:49px;
	}
	.input {
		margin: auto;
		padding-left: 10px;
		border-style: solid;
		border-width: 1px;
		border-radius: 32px;
		border-color: #aaaaaa;
		margin-top: 10px;
		width: 311px;
		height: 56px;	
	}
	.confirm {
		margin: auto;
		margin-top: 40px;
		border-radius: 32px;
		width: 80px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		background-color: #d1f879;
	}
	.setting {
		position: absolute;
		right: 20px;
		width: 20px;
		height:20px;
	}
	.content {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
