export default function totalPhoneBill(list){
	let phoneBill = list.split(',');
  //console.log(phoneBill)
  let cost = 0; 
	for ( let i = 0; i < phoneBill.length; i++){
   		let bill = phoneBill[i].trim();
      //console.log(bill)
		if (bill == "call"){
			cost = cost + 2.75;
		} else if (bill == "sms"){
			cost = cost + 0.65;
		}
	}
  return "R" + cost.toFixed(2);
  
}