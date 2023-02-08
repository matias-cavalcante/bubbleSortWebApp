function paintLessOneSecond(counter, clockBox){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 100) {
            clearInterval(intervalId);
            return;
        }
        let updated = "00"  + ":" + counter.toString().padStart(2, "0");
        clockBox.innerText = updated;
    }, 10);
}

function paintSecondCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            let updated = "0" + (parseInt(timeStr.substring(0,1)) + 1).toString() + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            let updated = "0" + timeStr.substring(0,1) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }  
    }, 10);
}

function paintThirdCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            let updated = (parseInt(timeStr.substring(0,2)) + 1).toString() + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            let updated = timeStr.substring(0,2) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }
    }, 10);
}

export function updateClock(time, clock) {
    let countTo99 = 0;
    let timeString = time.toString().padStart(4, "0");
    if (time < 1000){
        paintLessOneSecond(countTo99, clock)
    } else if (time > 1000 && time < 10000){
        paintSecondCase(countTo99, clock, timeString)
    } else if(time > 10000){
        paintThirdCase(countTo99, clock, timeString)
    }
}