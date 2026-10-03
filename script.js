/* =========================================
   THE GAME 2026
   EVENT STATE SYSTEM
========================================= */


/* =========================================
   EVENT TIMES
========================================= */

const OPENING_TIME =
    new Date("2026-10-03T13:30:00+02:00");

const QUEST_ONE_TIME =
    new Date("2026-10-03T14:00:00+02:00");

const CONVERGENCE_END =
    new Date("2026-10-31T23:59:59+01:00");


/* =========================================
   ELEMENTS
========================================= */

const openingState =
    document.getElementById("openingState");

const questState =
    document.getElementById("questState");

const convergenceState =
    document.getElementById("convergenceState");

const finaleState =
    document.getElementById("finaleState");

const systemLabel =
    document.getElementById("systemLabel");


/* =========================================
   HELPERS
========================================= */

function pad(number) {
    return String(number).padStart(2, "0");
}


function showState(state) {

    const states = [
        openingState,
        questState,
        convergenceState,
        finaleState
    ];

    states.forEach(element => {
        element.classList.add("hidden");
    });

    state.classList.remove("hidden");
}


/* =========================================
   OPENING COUNTDOWN
========================================= */

function updateOpening(now) {

    const difference =
        OPENING_TIME - now;

    if (difference <= 0) {

        showState(questState);

        return;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    document.getElementById("days")
        .textContent = pad(days);

    document.getElementById("hours")
        .textContent = pad(hours);

    document.getElementById("minutes")
        .textContent = pad(minutes);

    document.getElementById("seconds")
        .textContent = pad(seconds);


    systemLabel.textContent =
        "OPENING SEQUENCE";
}


/* =========================================
   QUEST ONE COUNTDOWN
========================================= */

function updateQuest(now) {

    const difference =
        QUEST_ONE_TIME - now;


    if (difference <= 0) {

        showState(convergenceState);

        return;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;


    document.getElementById("questMinutes")
        .textContent = pad(minutes);

    document.getElementById("questSeconds")
        .textContent = pad(seconds);


    systemLabel.textContent =
        "OPENING ACTIVE";
}


/* =========================================
   CONVERGENCE
========================================= */

function updateConvergence(now) {

    const totalDuration =
        CONVERGENCE_END - QUEST_ONE_TIME;

    const elapsed =
        now - QUEST_ONE_TIME;


    let progress =
        elapsed / totalDuration;


    progress =
        Math.max(
            0,
            Math.min(1, progress)
        );


    const percentage =
        progress * 100;


    document.getElementById("percentage")
        .textContent =
        percentage.toFixed(2);


    document.getElementById("meterFill")
        .style.width =
        `${percentage}%`;


    document.getElementById("meterDate")
        .textContent =
        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).toUpperCase();


    systemLabel.textContent =
        "CONVERGENCE ACTIVE";


    /*
       The closer the Convergence gets
       to 100%, the more intense the red
       atmospheric glow becomes.
    */

    const intensity =
        0.10 + (progress * 0.30);


    document.documentElement
        .style.setProperty(
            "--convergenceIntensity",
            intensity
        );


    if (progress >= 1) {

        showState(finaleState);

        systemLabel.textContent =
            "CONVERGENCE COMPLETE";
    }
}


/* =========================================
   FINALE
========================================= */

function updateFinale() {

    showState(finaleState);

    systemLabel.textContent =
        "CONVERGENCE COMPLETE";
}


/* =========================================
   MAIN STATE MACHINE
========================================= */

function updateEvent() {

    const now =
        new Date();


    if (now < OPENING_TIME) {

        if (
            openingState.classList.contains("hidden")
        ) {
            showState(openingState);
        }

        updateOpening(now);

        return;
    }


    if (now < QUEST_ONE_TIME) {

        if (
            questState.classList.contains("hidden")
        ) {
            showState(questState);
        }

        updateQuest(now);

        return;
    }


    if (now < CONVERGENCE_END) {

        if (
            convergenceState.classList.contains("hidden")
        ) {
            showState(convergenceState);
        }

        updateConvergence(now);

        return;
    }


    updateFinale();
}


/* =========================================
   LIVE CLOCK
========================================= */

function updateClock() {

    const now =
        new Date();

    const hours =
        pad(now.getHours());

    const minutes =
        pad(now.getMinutes());

    const seconds =
        pad(now.getSeconds());


    document.getElementById("clock")
        .textContent =
        `${hours}:${minutes}:${seconds} CEST`;
}


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    const container =
        document.getElementById("particles");


    const amount =
        window.innerWidth < 650
            ? 30
            : 65;


    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.bottom =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${8 + Math.random() * 16}s`;


        particle.style.animationDelay =
            `${Math.random() * -20}s`;


        particle.style.opacity =
            Math.random();


        container.appendChild(particle);
    }
}


/* =========================================
   INITIALIZE
========================================= */

createParticles();

updateEvent();
updateClock();


setInterval(updateEvent, 1000);
setInterval(updateClock, 1000);