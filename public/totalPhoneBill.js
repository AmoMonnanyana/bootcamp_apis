export default function totalPhoneBill(list, call_price, sms_price) {
	let phoneBill = list.split(',');
	//console.log(phoneBill)
	let cost = 0;
	for (let i = 0; i < phoneBill.length; i++) {
		let bill = phoneBill[i].trim();
		//console.log(bill)
		if (bill == "call") {
			cost = cost + call_price;
		} else if (bill == "sms") {
			cost = cost + sms_price;
		}
	}
	return "R" + cost.toFixed(2);

}