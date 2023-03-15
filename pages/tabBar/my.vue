<template>
	<view class="content">
		<view class="header">
			<image class="avatar" src="../../static/avatar.png"></image>
			<view class="relation">
				<view class="number">12</view>
				<view class="text">好友</view>
			</view>
			<view class="relation">
				<view class="number">47</view>
				<view class="text">群组</view>
			</view>
			<view class="relation">
				<view class="number">5</view>
				<view class="text">聊天室</view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row; width: 100%;">
			<view class="name">卡卡迪曼</view>
		</view>
		<view class="sign">
			签名：他写了个寂寞，并且一脸无辜～
		</view>
		<view class="setting" @click="quit">退出</view>
	</view>
</template>

<script>
	import {Gtx} from '@/common/gtx.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			quit() {
				Gtx.login('')
				uni.reLaunch({
					url:"/pages/tabBar/login"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
	}
	.header {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 72px;
	}
	.avatar {		
		width: 72px;
		height: 72px;
		margin-left: 20px;
	}
	.relation {
		text-align: center;
		width: 32px;
		margin-left: 50px;
	}
	.number {
		font-size: 22px;
		height: 22px;
		margin-top: 20px;
		margin-bottom: 4px;
	}
	.text {
		font-size: 10px;
		opacity: 0.4;
	}
	.name {
		font-size: 16px;
		width: 72px;
		margin-left: 20px;
		margin-top: 16px;
	}
	.sign {
		font-size: 13px;
		opacity: 0.5;
		margin-top: 8px;
		width: 100%;
		margin-left: 20px;
	}
	.setting {
		text-align: center;
		background-color: #d1f879;
		margin-top: 12px;
		border-color: aliceblue;
		border-radius: 12px;
		border-style: solid;
		font-size: 15px;
		font-weight: 500;
		padding: 17.5px;
		border-width: 1px;
		margin-left: 20px;
		margin-right: 20px;
		/* height: 56px; */
	}
</style>
