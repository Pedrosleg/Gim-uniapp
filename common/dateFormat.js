export class DateFormat {
	
	static transform(timestamp) {
		let date = new Date() 
		let date2 = new Date(timestamp)
		if (date2.getFullYear() + date2.getMonth() + date2.getDate() == 
			date.getFullYear() + date.getMonth() + date.getDate()) {
				return date2.getHours() + ':' + date2.getMinutes()
		} else {
			return date2.getMonth() + '-' + date2.getDate()
		}
	}
	
}