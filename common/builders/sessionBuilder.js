export class SessionBuilder {
	
	setAvatar(avatar) {
		this.avatar = avatar
		return this
	}

	setName(name) {
		this.name = name
		return this
	}
	
	setTipCount(tipCount) {
		this.tipCount = tipCount
		return this
	}
	
	setDate(date) {
		this.date = date
		return this
	}
	
	setText(text) {
		this.text = text
		return this
	}

	build() {
		return {
			avatar: this.avatar,
			name: this.name,
			date: this.date,
			text: this.text,
			tipCount: this.tipCount
		}
	}
	
}
