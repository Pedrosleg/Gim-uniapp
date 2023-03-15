<template>
	<div></div>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			1111111
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: "",
				a : false,
				olda : false
			}
		},
		
		onLoad() {
		},
		
		onShow() {
			// this.title = '3456'
		},
		methods: {
			greet(event) {
				// this.a = this.olda
				this.$nextTick(function(){
						this.a = true
				})
			
			
				// this.a = true
			}
		}
	}
</script>

<style>
	.content {
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
