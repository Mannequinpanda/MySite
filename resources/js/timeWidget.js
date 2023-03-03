let timeText = document.getElementById("timeUntil");

const endOfSem = new Date (2022, 11, 22);
const MIL_IN_DAY = 1000 * 60 * 60 * 24;
const MIL_IN_HOUR = 1000 * 60 * 60;
const MIL_IN_MIN = 1000 * 60;

function timeUntil(date) {
    let day = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;
    let remaining = endOfSem.getTime() - date.getTime();

    day = Math.floor(remaining / MIL_IN_DAY);
    remaining %= MIL_IN_DAY;
    hour = Math.floor(remaining / MIL_IN_HOUR);
    remaining %= MIL_IN_HOUR;
    minute = Math.floor(remaining / MIL_IN_MIN);
    remaining %= MIL_IN_MIN;
    second = Math.floor(remaining / 1000);

    return {
        days: day,
        hours: hour,
        minutes: minute,
        seconds: second
    };
}

function updateTime() {
    let time = timeUntil(new Date());
    timeText.textContent = time.days + " Days " + time.hours + " Hours " + 
    time.minutes + " Minutes " + time.seconds + " Seconds.";
}

setInterval(updateTime, 1000);