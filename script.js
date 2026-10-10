/* =========================================
   THE GAME 2026
   EVENT STATE SYSTEM
========================================= */


/* =========================================
   QUEST SCHEDULE
========================================= */

const QUESTS = [
    {
        id: "Q1",
        title: "THE SILENT ARRIVAL",
        date: new Date("2026-10-03T14:00:00+02:00")
    },
    {
        id: "Q2",
        title: "THE WATCHER'S TOWER",
        date: new Date("2026-10-03T19:00:00+02:00")
    },
    {
        id: "Q3",
        title: "THE BROKEN SEALS",
        date: new Date("2026-10-04T19:00:00+02:00")
    },
    {
        id: "Q4",
        title: "ECHOES BENEATH THE VOLCANO",
        date: new Date("2026-10-06T19:00:00+02:00")
    },
    {
        id: "Q5",
        title: "THE LAST SEALKEEPER",
        date: new Date("2026-10-10T11:00:00+02:00")
    },
    {
        id: "Q6",
        title: "BEYOND THE VEIL",
        date: new Date("2026-10-14T19:00:00+02:00")
    },
    {
        id: "Q7",
        title: "THE LOST CREW",
        date: new Date("2026-10-18T19:00:00+02:00")
    },
    {
        id: "Q8",
        title: "THE RESCUE",
        date: new Date("2026-10-22T19:00:00+02:00")
    },
    {
        id: "Q9",
        title: "THE LAST CHANCE",
        date: new Date("2026-10-27T19:00:00+01:00")
    },
    {
        id: "Q10",
        title: "THE HALLOWED CONVERGENCE",
        date: new Date("2026-11-01T18:00:00+01:00")
    }
];


/* =========================================
   EVENT TIMES
========================================= */

const OPENING_TIME =
    new Date("2026-10-03T13:30:00+02:00");

const EVENT_START =
    new Date("2026-10-03T14:00:00+02:00");

const CONVERGENCE_END =
    new Date("2026-11-01T18:00:00+01:00");


/* =========================================
   ELEMENTS
========================================= */

const systemLabel =
    document.getElementById("systemLabel");

const openingState =
    document.getElementById("openingState");

const questState =
    document.getElementById("questState");

const convergenceState =
    document.getElementById("convergenceState");

const finaleState =
    document.getElementById("finaleState");


/* Opening countdown */

const days =
    document.getElementById("days");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const seconds =
    document.getElementById("seconds");


/* Quest 1 countdown */

const questMinutes =
    document.getElementById("questMinutes");

const questSeconds =
    document.getElementById("questSeconds");


/* Current / next quest */

const currentQuest =
    document.getElementById("currentQuest");

const nextQuest =
    document.getElementById("nextQuest");

const nextQuestDate =
    document.getElementById("nextQuestDate");


/* Next quest countdown */

const nextDays =
    document.getElementById("nextDays");

const nextHours =
    document.getElementById("nextHours");

const nextMinutes =
    document.getElementById("nextMinutes");

const nextSeconds =
    document.getElementById("nextSeconds");

const nextCountdownLabel =
    document.getElementById("nextCountdownLabel");


/* Convergence */

const percentage =
    document.getElementById("percentage");

const meterFill =
    document.getElementById("meterFill");

const convergenceStatus =
    document.getElementById("convergenceStatus");

const meterDate =
    document.getElementById("meterDate");

const eventMessage =
    document.getElementById("eventMessage");


/* Finale countdown */

const finaleDays =
    document.getElementById("finaleDays");

const finaleHours =
    document.getElementById("finaleHours");

const finaleMinutes =
    document.getElementById("finaleMinutes");

const finaleSeconds =
    document.getElementById("finaleSeconds");


/* Footer */

const clock =
    document.getElementById("clock");


/* =========================================
   HELPERS
========================================= */

function pad(value) {

    return String(value).padStart(2, "0");
}


function hideAllStates() {

    if (openingState) {
        openingState.classList.add("hidden");
    }

    if (questState) {
        questState.classList.add("hidden");
    }

    if (convergenceState) {
        convergenceState.classList.add("hidden");
    }

    if (finaleState) {
        finaleState.classList.add("hidden");
    }
}


function showState(element) {

    hideAllStates();

    if (element) {
        element.classList.remove("hidden");
    }
}


/* =========================================
   COUNTDOWN
========================================= */

function getTimeParts(milliseconds) {

    if (milliseconds <= 0) {

        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }


    const totalSeconds =
        Math.floor(milliseconds / 1000);


    return {
        days:
            Math.floor(totalSeconds / 86400),

        hours:
            Math.floor(
                (totalSeconds % 86400) / 3600
            ),

        minutes:
            Math.floor(
                (totalSeconds % 3600) / 60
            ),

        seconds:
            totalSeconds % 60
    };
}


function setCountdown(
    dayElement,
    hourElement,
    minuteElement,
    secondElement,
    milliseconds
) {

    const time =
        getTimeParts(milliseconds);


    if (dayElement) {
        dayElement.textContent =
            pad(time.days);
    }

    if (hourElement) {
        hourElement.textContent =
            pad(time.hours);
    }

    if (minuteElement) {
        minuteElement.textContent =
            pad(time.minutes);
    }

    if (secondElement) {
        secondElement.textContent =
            pad(time.seconds);
    }
}


/* =========================================
   DATE FORMAT
========================================= */

function formatDate(date) {

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Amsterdam"
    }).toUpperCase();
}


function formatShortDate(date) {

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Amsterdam"
    }).toUpperCase();
}


function formatTime(date) {

    return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Amsterdam"
    });
}


/* =========================================
   QUEST LOOKUPS
========================================= */

function getCurrentQuest(now) {

    let current = null;


    for (const quest of QUESTS) {

        if (
            now.getTime() >=
            quest.date.getTime()
        ) {

            current = quest;

        } else {

            break;
        }
    }


    return current;
}


function getNextQuest(now) {

    for (const quest of QUESTS) {

        if (
            now.getTime() <
            quest.date.getTime()
        ) {

            return quest;
        }
    }


    return null;
}


/* =========================================
   CONVERGENCE PERCENTAGE
========================================= */

function getConvergencePercentage(now) {

    const currentTime =
        now.getTime();

    const startTime =
        EVENT_START.getTime();

    const endTime =
        CONVERGENCE_END.getTime();


    if (currentTime <= startTime) {
        return 0;
    }


    if (currentTime >= endTime) {
        return 100;
    }


    const progress =
        (
            (currentTime - startTime) /
            (endTime - startTime)
        ) * 100;


    return Math.max(
        0,
        Math.min(100, progress)
    );
}


/* =========================================
   OPENING STATE
========================================= */

function updateOpeningState(now) {

    const time =
        now.getTime();


    /*
        BEFORE OPENING
    */

    if (time < OPENING_TIME.getTime()) {

        showState(openingState);


        setCountdown(
            days,
            hours,
            minutes,
            seconds,
            OPENING_TIME.getTime() - time
        );


        if (systemLabel) {
            systemLabel.textContent =
                "SYSTEM STANDBY";
        }


        return true;
    }


    /*
        OPENING CEREMONY
    */

    if (time < EVENT_START.getTime()) {

        showState(questState);


        setCountdown(
            null,
            null,
            questMinutes,
            questSeconds,
            EVENT_START.getTime() - time
        );


        if (systemLabel) {
            systemLabel.textContent =
                "OPENING CEREMONY";
        }


        return true;
    }


    return false;
}


/* =========================================
   ACTIVE EVENT STATE
========================================= */

function updateActiveEvent(now) {

    const time =
        now.getTime();


    if (time < EVENT_START.getTime()) {
        return;
    }


    if (time >= CONVERGENCE_END.getTime()) {
        return;
    }


    showState(convergenceState);


    if (systemLabel) {
        systemLabel.textContent =
            "EVENT ACTIVE";
    }
}


/* =========================================
   QUEST DISPLAY
========================================= */

function updateQuestDisplay(now) {

    const current =
        getCurrentQuest(now);

    const next =
        getNextQuest(now);


    /*
        No quest yet
    */

    if (!current) {

        if (currentQuest) {
            currentQuest.textContent =
                "Q1 — THE SILENT ARRIVAL";
        }

        return;
    }


    /*
        Q10 is active
    */

    if (current.id === "Q10") {

        if (currentQuest) {
            currentQuest.textContent =
                "Q10 — THE HALLOWED CONVERGENCE";
        }

        if (nextQuest) {
            nextQuest.textContent =
                "FINAL QUEST";
        }

        if (nextQuestDate) {
            nextQuestDate.textContent =
                "THE HALLOWED CONVERGENCE";
        }

        if (nextCountdownLabel) {
            nextCountdownLabel.textContent =
                "FINAL QUEST";
        }

        setCountdown(
            nextDays,
            nextHours,
            nextMinutes,
            nextSeconds,
            0
        );

        return;
    }


    /*
        Normal active quest
    */

    if (currentQuest) {

        currentQuest.textContent =
            `${current.id} — ${current.title}`;
    }


    /*
        Next quest
    */

    if (next) {

        if (nextQuest) {

            nextQuest.textContent =
                `${next.id} — ${next.title}`;
        }


        if (nextQuestDate) {

            nextQuestDate.textContent =
                `${formatDate(next.date)} · ${formatTime(next.date)} CEST`;
        }


        if (nextCountdownLabel) {

            nextCountdownLabel.textContent =
                "NEXT QUEST RELEASE";
        }


        setCountdown(
            nextDays,
            nextHours,
            nextMinutes,
            nextSeconds,
            next.date.getTime() -
            now.getTime()
        );

        return;
    }


    /*
        No next quest
    */

    if (nextQuest) {
        nextQuest.textContent =
            "COMPLETE";
    }


    if (nextQuestDate) {
        nextQuestDate.textContent =
            "THE HALLOWED CONVERGENCE";
    }


    if (nextCountdownLabel) {
        nextCountdownLabel.textContent =
            "EVENT STATUS";
    }


    setCountdown(
        nextDays,
        nextHours,
        nextMinutes,
        nextSeconds,
        0
    );
}


/* =========================================
   CONVERGENCE TEXT
========================================= */

function updateConvergenceText(
    now,
    progress
) {

    /*
        Q10
    */

    const current =
        getCurrentQuest(now);


    if (
        current &&
        current.id === "Q10"
    ) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "CONVERGENCE ACTIVE";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE HALLOWED CONVERGENCE IS UNDERWAY.";
        }

        return;
    }


    /*
        0% - 24%
    */

    if (progress < 25) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "IN MOTION";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE CONVERGENCE IS IN MOTION.";
        }

        return;
    }


    /*
        25% - 49%
    */

    if (progress < 50) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "UNSTABLE";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE BOUNDARY IS BEGINNING TO SHIFT.";
        }

        return;
    }


    /*
        50% - 74%
    */

    if (progress < 75) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "DESTABILIZING";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE VEIL IS BEGINNING TO BREAK.";
        }

        return;
    }


    /*
        75% - 89%
    */

    if (progress < 90) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "CRITICAL";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE HALLOWED REALM IS DRAWING CLOSER.";
        }

        return;
    }


    /*
        90% - 96%
    */

    if (progress < 97) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "SEVERE";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE BARRIER IS COLLAPSING.";
        }

        return;
    }


    /*
        97% - 98.99%
    */

    if (progress < 99) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "CRITICAL FAILURE";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE CONVERGENCE CANNOT BE STOPPED.";
        }

        return;
    }


    /*
        99% - 99.99%
    */

    if (progress < 100) {

        if (convergenceStatus) {
            convergenceStatus.textContent =
                "FINAL PHASE";
        }

        if (eventMessage) {
            eventMessage.textContent =
                "THE HALLOWED REALM IS OPEN.";
        }

        return;
    }
}


/* =========================================
   CONVERGENCE METER
========================================= */

function updateConvergence(now) {

    const progress =
        getConvergencePercentage(now);


    /*
        Percentage
    */

    if (percentage) {

        percentage.textContent =
            progress.toFixed(2);
    }


    /*
        Meter
    */

    if (meterFill) {

        meterFill.style.width =
            `${progress}%`;
    }


    /*
        Date
    */

    if (meterDate) {

        meterDate.textContent =
            formatShortDate(EVENT_START);
    }


    updateConvergenceText(
        now,
        progress
    );
}


/* =========================================
   FINALE COUNTDOWN
========================================= */

function updateFinaleCountdown(now) {

    const remaining =
        CONVERGENCE_END.getTime() -
        now.getTime();


    if (remaining <= 0) {

        setCountdown(
            finaleDays,
            finaleHours,
            finaleMinutes,
            finaleSeconds,
            0
        );

        return;
    }


    setCountdown(
        finaleDays,
        finaleHours,
        finaleMinutes,
        finaleSeconds,
        remaining
    );
}


/* =========================================
   FINAL EVENT STATE
========================================= */

function updateFinaleState(now) {

    const time =
        now.getTime();


    if (
        time <
        CONVERGENCE_END.getTime()
    ) {

        return false;
    }


    showState(finaleState);


    if (systemLabel) {
        systemLabel.textContent =
            "EVENT CONCLUDED";
    }


    if (percentage) {
        percentage.textContent =
            "100.00";
    }


    if (meterFill) {
        meterFill.style.width =
            "100%";
    }


    return true;
}


/* =========================================
   FOOTER CLOCK
========================================= */

function updateClock(now) {

    if (!clock) {
        return;
    }


    clock.textContent =
        now.toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Europe/Amsterdam"
            }
        );
}


/* =========================================
   MAIN UPDATE
========================================= */

function update() {

    const now =
        new Date();


    /*
        Footer clock always runs
    */

    updateClock(now);


    /*
        Final state takes priority
    */

    if (updateFinaleState(now)) {

        updateFinaleCountdown(now);

        return;
    }


    /*
        Before event / opening ceremony
    */

    if (updateOpeningState(now)) {

        return;
    }


    /*
        Active event
    */

    updateActiveEvent(now);

    updateQuestDisplay(now);

    updateConvergence(now);

    updateFinaleCountdown(now);
}


/* =========================================
   INITIALIZE
========================================= */

update();

setInterval(update, 1000);
