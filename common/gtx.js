export class Gtx {
	
	static getLogin() {
		let uid = this.login.uid ? this.login.uid : uni.getStorageSync("loginUid")
		return {
			uid: uid
		}
	}
	
	static login(uid) {
		uni.setStorageSync("loginUid", uid)
	}
	
}