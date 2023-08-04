export default function enoughAirtime(usage, airtime){
    let usageList = usage.split(',');
     let cost = 0;
     let remainingBalance = 0;
    for (let i = 0; i < usageList.length; i++){
    let costList = usageList[i].trim();
      if (costList == "call"){
      cost = cost + 1.88;
      } else if(costList == "sms"){
      cost = cost + 0.75;
      } else if (costList == "data"){
      cost = cost + 12;
      }
    }
      remainingBalance = airtime - cost;
      if(remainingBalance > 0) {
      return remainingBalance.toFixed(2);
      } else {
      return 0.00;
      }
    }