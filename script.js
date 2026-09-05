/* =========================================================
   THE GAME 2026
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const GAME_START = new Date("2026-10-03T19:00:00");
const FINALE_DATE = new Date("2026-10-31T19:00:00");


/* =========================================================
   QUEST SCHEDULE
   ========================================================= */

const QUEST_DATES = {
    "quest-1":  new Date("2026-10-03T19:00:00"),
    "quest-2":  new Date("2026-10-06T19:00:00"),
    "quest-3":  new Date("2026-10-09T19:00:00"),
    "quest-4":  new Date("2026-10-12T19:00:00"),
    "quest-5":  new Date("2026-10-15T19:00:00"),
    "quest-6":  new Date("2026-10-18T19:00:00"),
    "quest-7":  new Date("2026-10-21T19:00:00"),
    "quest-8":  new Date("2026-10-24T19:00:00"),
    "quest-9":  new Date("2026-10-27T19:00:00"),
    "quest-10": new Date("2026-10-31T19:00:00")
};


/* =========================================================
   QUEST DATA
   ========================================================= */

const QUESTS = [

    {
        id: "quest-1",
        number: "QUEST 01",
        date: "OCT 03",
        title: "QUEST 1",
        description:
            "The first Halloween 2026 quest."
    },

    {
        id: "quest-2",
        number: "QUEST 02",
        date: "OCT 06",
        title: "QUEST 2",
        description:
            "The second quest of The Game 2026."
    },

    {
        id: "quest-3",
        number: "QUEST 03",
        date: "OCT 09",
        title: "QUEST 3",
        description:
            "The third quest of The Game 2026."
    },

    {
        id: "quest-4",
        number: "QUEST 04",
        date: "OCT 12",
        title: "QUEST 4",
        description:
            "The fourth quest of The Game 2026."
    },

    {
        id: "quest-5",
        number: "QUEST 05",
        date: "OCT 15",
        title: "QUEST 5",
        description:
            "The fifth quest of The Game 2026."
    },

    {
        id: "quest-6",
        number: "QUEST 06",
        date: "OCT 18",
        title: "QUEST 6",
        description:
            "The sixth quest of The Game 2026."
    },

    {
        id: "quest-7",
        number: "QUEST 07",
        date: "OCT 21",
        title: "QUEST 7",
        description:
            "The seventh quest of The Game 2026."
    },

    {
        id: "quest-8",
        number: "QUEST 08",
        date: "OCT 24",
        title: "QUEST 8",
        description:
            "The eighth quest of The Game 2026."
    },

    {
        id: "quest-9",
        number: "QUEST 09",
        date: "OCT 27",
        title: "QUEST 9",
        description:
            "The ninth quest of The Game 2026."
    },

    {
        id: "quest-10",
        number: "QUEST 10",
        date: "OCT 31",
        title: "THE HALLOWED CONVERGENCE",
        description:
            "The final confrontation. The players must activate and defend the three Severing Anchors, sever the Hallow King's connection to the world, and survive the Convergence."
    }

];


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

const pages =
    document.querySelectorAll(".page");

const pageButtons =
    document.querySelectorAll("[data-page]");


function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });


    const target =
        document.getElementById(pageId);


    if (!target) {

        console.warn(
            "Page not found:",
            pageId
        );

        return;
    }


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    pageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageId
        );

    });


    history.replaceState(
        null,
        "",
        `#${pageId}`
    );

}


/* Navigation buttons */

pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;


            if (page) {
                showPage(page);
            }

        }
    );

});


/* =========================================================
   INITIAL PAGE
   ========================================================= */

function initializePage() {

    const hash =
        window.location.hash.replace(
            "#",
            ""
        );


    if (
        hash &&
        document.getElementById(hash)
    ) {

        showPage(hash);

    }
    else {

        showPage("home");

    }

}


initializePage();


/* =========================================================
   COUNTDOWN HELPERS
   ========================================================= */

function getTimeRemaining(targetDate) {

    const now =
        new Date();


    const difference =
        targetDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        return {
            finished: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

    }


    const secondsTotal =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            secondsTotal / 86400
        );


    const hours =
        Math.floor(
            (secondsTotal % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (secondsTotal % 3600) /
            60
        );


    const seconds =
        secondsTotal % 60;


    return {
        finished: false,
        days,
        hours,
        minutes,
        seconds
    };

}


function pad(number) {

    return String(number)
        .padStart(2, "0");

}


/* =========================================================
   LARGE COUNTDOWN
   ========================================================= */

function formatLargeCountdown(targetDate) {

    const time =
        getTimeRemaining(targetDate);


    if (time.finished) {
        return "NOW";
    }


    return `
        ${time.days}D
        ${pad(time.hours)}H
        ${pad(time.minutes)}M
        ${pad(time.seconds)}S
    `;

}


/* =========================================================
   QUEST COUNTDOWN
   ========================================================= */

function formatQuestCountdown(targetDate) {

    const time =
        getTimeRemaining(targetDate);


    if (time.finished) {
        return "NOW";
    }


    if (time.days > 0) {

        return `
            ${time.days}D
            ${pad(time.hours)}H
        `;

    }


    return `
        ${pad(time.hours)}H
        ${pad(time.minutes)}M
    `;

}


/* =========================================================
   FIND NEXT QUEST
   ========================================================= */

function getNextQuest() {

    const now =
        new Date();


    for (const quest of QUESTS) {

        const date =
            QUEST_DATES[quest.id];


        if (
            date &&
            now < date
        ) {

            return {
                quest,
                date
            };

        }

    }


    return null;

}


/* =========================================================
   MAIN COUNTDOWN
   ========================================================= */

/*
 * The main countdown ALWAYS points to the next quest.
 *
 * Before the game:
 *     Quest 1
 *
 * During the game:
 *     Next upcoming quest
 *
 * Before October 31:
 *     Quest 10 / Hallowed Convergence
 *
 * After October 31:
 *     NOW
 */

function updateGameStartCountdown() {

    const timer =
        document.getElementById(
            "countdown-start-timer"
        );


    const status =
        document.getElementById(
            "countdown-start-status"
        );


    const title =
        document.getElementById(
            "countdown-start-title"
        );


    const label =
        document.getElementById(
            "countdown-start-label"
        );


    const nextQuest =
        getNextQuest();


    /*
     * Before / during the quest schedule
     */

    if (nextQuest) {

        if (timer) {

            timer.textContent =
                formatLargeCountdown(
                    nextQuest.date
                );

        }


        if (status) {

            status.textContent =
                nextQuest.quest.id === "quest-10"
                    ? "FINALE"
                    : "NEXT QUEST";

            status.classList.remove(
                "live"
            );

        }


        if (title) {

            title.textContent =
                nextQuest.quest.title;

        }


        if (label) {

            label.textContent =
                nextQuest.quest.number;

        }


        return;
    }


    /*
     * All quests have happened.
     */

    if (timer) {
        timer.textContent = "NOW";
    }


    if (status) {

        status.textContent =
            "THE GAME IS COMPLETE";

        status.classList.add(
            "live"
        );

    }


    if (title) {

        title.textContent =
            "THE HALLOWED CONVERGENCE";

    }


    if (label) {
        label.textContent = "QUEST 10";
    }

}


/* =========================================================
   HOME COUNTDOWN
   ========================================================= */

function updateHomeCountdown() {

    const element =
        document.getElementById(
            "home-countdown"
        );


    if (!element) {
        return;
    }


    const nextQuest =
        getNextQuest();


    if (nextQuest) {

        element.textContent =
            formatLargeCountdown(
                nextQuest.date
            );

        return;
    }


    element.textContent =
        "NOW";

}


/* =========================================================
   QUEST COUNTDOWNS
   ========================================================= */

function updateQuestCountdowns() {

    Object.entries(
        QUEST_DATES
    ).forEach(
        ([questId, targetDate]) => {

            const timer =
                document.querySelector(
                    `[data-countdown-id="${questId}"]`
                );


            const status =
                document.querySelector(
                    `[data-status-id="${questId}"]`
                );


            const eventCard =
                document.querySelector(
                    `[data-event-id="${questId}"]`
                );


            const questCard =
                document.querySelector(
                    `[data-quest-id="${questId}"]`
                );


            const card =
                eventCard ||
                questCard;


            const time =
                getTimeRemaining(
                    targetDate
                );


            /*
             * Quest is active / has arrived.
             */

            if (time.finished) {

                if (timer) {

                    timer.textContent =
                        "ACTIVE";

                }


                if (status) {

                    status.textContent =
                        "ACTIVE";

                    status.classList.add(
                        "live"
                    );

                }


                if (card) {

                    card.classList.add(
                        "active"
                    );

                    card.classList.remove(
                        "upcoming"
                    );

                }


                return;

            }


            /*
             * Quest is upcoming.
             */

            if (timer) {

                timer.textContent =
                    formatQuestCountdown(
                        targetDate
                    );

            }


            if (status) {

                status.textContent =
                    "UPCOMING";

                status.classList.remove(
                    "live"
                );

            }


            if (card) {

                card.classList.remove(
                    "active"
                );

                card.classList.add(
                    "upcoming"
                );

            }

        }
    );

}


/* =========================================================
   FINALE / QUEST 10
   ========================================================= */

/*
 * There is intentionally NO separate finale event.
 *
 * Quest 10 IS the finale.
 *
 * If the existing HTML still has a
 * countdown-finale-timer element, we update it too,
 * so the old layout does not break.
 */

function updateFinaleCountdown() {

    const timer =
        document.getElementById(
            "countdown-finale-timer"
        );


    const status =
        document.getElementById(
            "countdown-finale-status"
        );


    if (!timer && !status) {
        return;
    }


    const time =
        getTimeRemaining(
            FINALE_DATE
        );


    if (timer) {

        timer.textContent =
            time.finished
                ? "NOW"
                : formatLargeCountdown(
                    FINALE_DATE
                );

    }


    if (status) {

        status.textContent =
            time.finished
                ? "THE CONVERGENCE HAS BEGUN"
                : "QUEST 10 — THE HALLOWED CONVERGENCE";


        if (time.finished) {

            status.classList.add(
                "live"
            );

        }
        else {

            status.classList.remove(
                "live"
            );

        }

    }

}


/* =========================================================
   UPDATE ALL COUNTDOWNS
   ========================================================= */

function updateAllCountdowns() {

    updateGameStartCountdown();

    updateHomeCountdown();

    updateQuestCountdowns();

    updateFinaleCountdown();

}


updateAllCountdowns();


setInterval(
    updateAllCountdowns,
    1000
);


/* =========================================================
   CONVERGENCE SYSTEM
   ========================================================= */

/*
 * =========================================================
 * CONVERGENCE TEST OVERRIDE
 * =========================================================
 *
 * enabled: false = normal website behaviour
 * enabled: true  = manually control convergence
 *
 * value can be anything from 0 to 100.
 *
 * Examples:
 *
 * value: 25
 * value: 50
 * value: 75
 * value: 100
 */

const CONVERGENCE_TEST_OVERRIDE = {

    enabled: false,

    value: 100

};


/*
 * =========================================================
 * GET CONVERGENCE
 * =========================================================
 */

function getConvergencePercentage() {

    /*
     * TEST MODE
     */

    if (
        CONVERGENCE_TEST_OVERRIDE.enabled
    ) {

        return Math.max(
            0,
            Math.min(
                100,
                Number(
                    CONVERGENCE_TEST_OVERRIDE.value
                ) || 0
            )
        );

    }


    /*
     * NORMAL MODE
     */

    const now =
        new Date();


    let percentage = 0;


    if (
        now >= GAME_START
    ) {

        const total =
            FINALE_DATE -
            GAME_START;


        const elapsed =
            now -
            GAME_START;


        percentage =
            (
                elapsed /
                total
            ) *
            100;

    }


    return Math.max(
        0,
        Math.min(
            100,
            percentage
        )
    );

}


/*
 * =========================================================
 * CONVERGENCE STATUS
 * =========================================================
 */

function getConvergenceStatus(
    percentage
) {

    if (
        percentage >= 100
    ) {

        return "CONVERGENCE";

    }


    if (
        percentage >= 75
    ) {

        return "CRITICAL";

    }


    if (
        percentage >= 50
    ) {

        return "UNSTABLE";

    }


    if (
        percentage >= 25
    ) {

        return "DEGRADING";

    }


    return "MONITORING";

}


/*
 * =========================================================
 * UPDATE CONVERGENCE
 * =========================================================
 */

function updateConvergence() {

    const percentage =
        getConvergencePercentage();


    /*
     * HOME METER
     */

    const meter =
        document.getElementById(
            "meter-fill"
        );


    const value =
        document.getElementById(
            "meter-value"
        );


    if (meter) {

        meter.style.width =
            `${percentage}%`;

    }


    if (value) {

        value.textContent =
            `${Math.floor(percentage)}%`;

    }


    /*
     * CONVERGENCE PAGE
     */

    const pageMeter =
        document.getElementById(
            "convergence-page-meter"
        );


    const pageValue =
        document.getElementById(
            "convergence-page-value"
        );


    if (pageMeter) {

        pageMeter.style.width =
            `${percentage}%`;

    }


    if (pageValue) {

        pageValue.textContent =
            `${Math.floor(percentage)}%`;

    }


    /*
     * STATUS
     */

    const status =
        document.getElementById(
            "status"
        );


    const pageStatus =
        document.getElementById(
            "convergence-page-status"
        );


    const statusText =
        getConvergenceStatus(
            percentage
        );


    if (status) {

        status.textContent =
            statusText;

    }


    if (pageStatus) {

        pageStatus.textContent =
            statusText;

    }


    /*
     * GLOBAL CONVERGENCE VALUE
     *
     * Every convergence-related effect can
     * use this same value.
     */

    window.currentConvergence =
        percentage;


    window.currentConvergenceStatus =
        statusText;


    /*
     * TEST MODE CLASS
     */

    document.body.classList.toggle(
        "convergence-test-mode",
        CONVERGENCE_TEST_OVERRIDE.enabled
    );

}


/*
 * =========================================================
 * CONVERGENCE CORRUPTION
 * =========================================================
 */

function updateCorruption() {

    /*
     * IMPORTANT:
     *
     * Use the EXACT SAME convergence value
     * as the meter.
     */

    const percentage =
        getConvergencePercentage();


    /*
     * Convert:
     *
     * 0–100
     *
     * into:
     *
     * 0–1
     */

    const progress =
        percentage / 100;


    const corruption =
        document.getElementById(
            "convergence-corruption"
        );


    if (!corruption) {

        return;

    }


    /*
     * CSS variable controlling corruption.
     */

    corruption.style.setProperty(
        "--corruption",
        progress
    );


    /*
     * CRITICAL EFFECT
     *
     * Activates at 75%.
     */

    if (
        percentage >= 75
    ) {

        corruption.classList.add(
            "critical"
        );

    }
    else {

        corruption.classList.remove(
            "critical"
        );

    }

}


/*
 * =========================================================
 * INITIAL UPDATE
 * =========================================================
 */

updateConvergence();

updateCorruption();


/*
 * =========================================================
 * LIVE UPDATES
 * =========================================================
 */

setInterval(
    updateConvergence,
    1000
);


setInterval(
    updateCorruption,
    1000
);


/* =========================================================
   SYSTEM LOG
   ========================================================= */

function updateSystemLog() {

    const element =
        document.getElementById(
            "system-log-text"
        );


    if (!element) {
        return;
    }


    const now =
        new Date();


    if (now < GAME_START) {

        element.textContent =
            "The island remains under observation. Halloween 2026 has not begun.";

        return;

    }


    if (now >= FINALE_DATE) {

        element.textContent =
            "THE CONVERGENCE IS ACTIVE. SEVERING PROTOCOL REQUIRED.";

        return;

    }


    element.textContent =
        "Monitoring the island. The connection continues to strengthen.";

}


updateSystemLog();


setInterval(
    updateSystemLog,
    5000
);


/* =========================================================
   QUEST ARCHIVE
   ========================================================= */

function initializeQuestArchive() {

    const list =
        document.getElementById(
            "quest-list"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    QUESTS.forEach(
        quest => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "event-card";


            article.dataset.questId =
                quest.id;


            article.dataset.eventId =
                quest.id;


            article.innerHTML = `

                <div class="event-card-date">
                    ${quest.date}
                </div>

                <div>

                    <div class="event-card-number">
                        ${quest.number}
                    </div>

                    <div class="event-card-title">
                        ${quest.title}
                    </div>

                    <div class="event-card-subtitle">
                        ${quest.description}
                    </div>

                    <div
                        class="event-card-countdown"
                        data-countdown-id="${quest.id}">
                        ${formatQuestCountdown(
                            QUEST_DATES[quest.id]
                        )}
                    </div>

                </div>

                <div
                    class="event-card-status"
                    data-status-id="${quest.id}">
                    UPCOMING
                </div>

            `;


            article.addEventListener(
                "click",
                () => {

                    showQuestDetails(
                        quest
                    );

                }
            );


            list.appendChild(
                article
            );

        }
    );


    updateQuestCountdowns();

}


function showQuestDetails(quest) {

    const detail =
        document.getElementById(
            "quest-detail"
        );


    const number =
        document.getElementById(
            "quest-detail-number"
        );


    const date =
        document.getElementById(
            "quest-detail-date"
        );


    const title =
        document.getElementById(
            "event-detail-title"
        );


    const description =
        document.getElementById(
            "event-detail-description"
        );


    if (!detail) {
        return;
    }


    if (number) {

        number.textContent =
            quest.number;

    }


    if (date) {

        date.textContent =
            quest.date;

    }


    if (title) {

        title.textContent =
            quest.title;

    }


    if (description) {

        description.textContent =
            quest.description;

    }


    detail.classList.add(
        "visible"
    );

}


initializeQuestArchive();


/* =========================================================
   ISLAND MAP
   ========================================================= */

const mapLocations =
    document.querySelectorAll(
        ".map-location"
    );

mapLocations.forEach(
    location => {

        location.addEventListener(
            "click",
            () => {

                const title =
                    document.getElementById(
                        "map-detail-title"
                    );

                const text =
                    document.getElementById(
                        "map-detail-text"
                    );

                mapLocations.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );

                location.classList.add(
                    "selected"
                );

                if (title) {
                    title.textContent =
                        location.dataset.location;
                }

                if (text) {
                    text.textContent =
                        location.dataset.description;
                }

            }
        );

    }
);





/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

const backgroundMusic =
    document.getElementById(
        "background-music"
    );


let musicStarted =
    false;


function startMusic() {

    if (
        !backgroundMusic ||
        musicStarted
    ) {

        return;

    }


    backgroundMusic.volume =
        0.35;


    backgroundMusic
        .play()
        .then(
            () => {

                musicStarted =
                    true;

            }
        )
        .catch(
            () => {

                /*
                 * Browser autoplay protection.
                 */

            }
        );

}


document.addEventListener(
    "click",
    startMusic,
    {
        once: false
    }
);


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    const layer =
        document.getElementById(
            "particle-layer"
        );


    if (!layer) {
        return;
    }


    /*
     * Prevent duplicate particles if
     * this function is ever called again.
     */

    if (
        layer.children.length > 0
    ) {

        return;

    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 10}s`;


        particle.style.animationDuration =
            `${8 + Math.random() * 12}s`;


        layer.appendChild(
            particle
        );

    }

}


createParticles();



/* =========================================================
   TRANSMISSION
   ========================================================= */

const transmission =
    document.getElementById(
        "system-transmission"
    );


const transmissionClose =
    document.getElementById(
        "transmission-close"
    );


if (transmissionClose) {

    transmissionClose.addEventListener(
        "click",
        () => {

            if (transmission) {

                transmission.classList.remove(
                    "visible"
                );

            }

        }
    );

}


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "%cTHE GAME 2026",
    "font-size:24px;font-weight:bold;"
);


console.log(
    "Countdown system initialized."
);


console.log(
    "Game Start:",
    GAME_START
);


console.log(
    "Quest 10 / Hallowed Convergence:",
    FINALE_DATE
);


console.log(
    "Quest Dates:",
    QUEST_DATES
);

/* =========================================================================
   THE GAME 2026 — PREVIOUS EVENTS ARCHIVE DOSSIER
   =========================================================================
   Self-contained. Does not touch script.js or any existing page-routing
   logic. Only wires up:
     - clicking a .prev-event-card -> opens the fullscreen dossier overlay
     - #event-archive-back / Escape / backdrop click -> closes it
     - clicking a gallery image / finale image -> opens the lightbox

   All content for Easter and Summer lives in the EVENTS object below.

   IMAGE FILES:
     Easter:
       easter-teaser-1.jpg
       easter-teaser-2.jpg
       easter-teaser-3.jpg
       easter-teaser-4.jpg
       easter-teaser-5.jpg
       easter-teaser-6.jpg
       easter-teaser-7.jpg
       easter-teaser-8.jpg
       easter-finale.jpg

     Summer:
       summer-teaser-1.jpg
       summer-teaser-2.jpg
       summer-teaser-3.jpg
       summer-teaser-4.jpg
       summer-teaser-5.jpg
       summer-teaser-6.jpg
       summer-teaser-7.jpg
       summer-teaser-8.jpg
       summer-finale.jpg

   All image files are expected to be next to the HTML file.
   ========================================================================= */

(function () {
  "use strict";

  /* =======================================================================
     EVENT DATA
     ======================================================================= */

  var EVENTS = {

    /* =====================================================================
       EASTER EDITION
       ===================================================================== */

    easter: {
      era: "easter",
      tag: "EASTER 2026 / ARCHIVED RECORD",
      title: "THE EASTER EDITION",
      subtitle: "THE FIRST NEW ERA OF THE GAME",
      dates: "APRIL 06 — APRIL 25, 2026",

      overview: [
        "The Easter Edition was the first brand-new edition of The Game 2026 to introduce the token system. The event opened on April 6, and the finale took place on April 25.",
        "The event used a total of approximately 12 tokens. Players had to complete a variety of minigames in order to obtain them, including an Easter hunt inside the windmill, redstone-based challenges, zombie fights, puzzle-style challenges, exploration challenges, and several other custom minigames.",
        "The intention of the system was that players needed specific tokens, or a specific amount of tokens, in order to qualify for the finale. However, the token system did not function completely correctly, and because of this, everyone was eventually allowed to participate in the finale. This is recorded here honestly, as part of the true history of the event."
      ],

      sections: [
        {
          heading: "THE KILLER BUNNY",
          paragraphs: [
            "The main villain of the Easter Edition was the Killer Bunny. She slowly made her way from the mountain toward the forest, and as she moved across the island, corruption appeared around her — the ground changed into crimson netherrack, and crimson trees appeared in the places where she walked.",
            "This made her path across the island visually obvious to anyone watching. Eventually, the Killer Bunny stopped above the Fountain. She flew above it and watched the Forest Beacon, which was slowly becoming corrupted."
          ]
        },

        {
          heading: "THE FORSAKEN UNSEALER",
          paragraphs: [
            "At the point where she settled above the corrupted Forest Beacon, the Killer Bunny became known by a new name: THE FORSAKEN UNSEALER.",
            "The players eventually confronted her. It was the first real boss fight of this new era of The Game — relatively simple compared with later finales, with a handful of abilities, essentially the team's first attempt at building a proper boss encounter. It was built in approximately one week."
          ]
        },

        {
          heading: "THE FOREST BEACON",
          paragraphs: [
            "The players defeated the Killer Bunny. After her defeat, the corruption affecting the Forest Beacon was removed.",
            "However, the beacon was still damaged. More importantly, the connection to the island remained — a detail that would matter far more than it seemed at the time."
          ]
        }
      ],

      timeline: [
        { date: "APR 06", label: "Event Opens" },
        { date: "", label: "Token System Introduced" },
        { date: "", label: "Killer Bunny Appears" },
        { date: "", label: "Corruption Spreads" },
        { date: "", label: "Forest Beacon Targeted" },
        { date: "", label: "Killer Bunny Becomes The Forsaken Unsealer" },
        { date: "APR 25", label: "Easter Finale", marker: true },
        { date: "", label: "Killer Bunny Defeated" },
        { date: "", label: "Forest Beacon Saved, But Damaged" },
        { date: "", label: "Connection Remains" },
        { date: "APR 29–30", label: "Summoning Tower Appears", marker: true }
      ],

      /* EXACT EASTER TEASER FILES */
      gallery: {
        prefix: "easter-teaser-",
        count: 8
      },

      finale: {
        label: "EASTER FINALE",
        date: "APRIL 25, 2026",
        name: "THE FORSAKEN UNSEALER",

        paragraphs: [
          "The Easter finale was a normal boss fight, and the team's first attempt at a custom boss encounter. It included several abilities and was built in roughly one week.",
          "The boss was the Killer Bunny — the Forsaken Unsealer. The players defeated her. The Forest Beacon stopped being corrupted but remained damaged, and the connection to the island remained."
        ],

        image: "easter-finale.jpg"
      },

      aftermathHeading: "SUMMONING TOWER",

      aftermath: [
        "THE EASTER EDITION ENDED, BUT THE ISLAND WAS NOT RESTORED.",
        "The Forest Beacon had survived, but something had remained connected to the island. Near the end of the Easter period, around April 29–30, a mysterious structure appeared: THE SUMMONING TOWER.",
        "The tower was connected to the summoning of the Crimson Lord. It did not immediately lead to a major event during Easter — instead, it became a setup for what would happen during the Summer Edition. The appearance of the Summoning Tower marked the beginning of what came next."
      ],

      strongLines: []
    },


    /* =====================================================================
       SUMMER EDITION
       ===================================================================== */

    summer: {
      era: "summer",
      tag: "SUMMER 2026 / ARCHIVED RECORD",
      title: "THE SUMMER EDITION",
      subtitle: "THE CRIMSON LORD",
      dates: "JUNE 20 — JULY 09, 2026",

      overview: [
        "The Summer Edition continued the same token system introduced during Easter, with approximately 20 tokens in total. Unlike Easter, there were no minigames used to obtain them — instead, the tokens were hidden around the island, and players had to find them.",
        "Players who had obtained all the tokens and attended the opening were allowed into the finale. Players could also be manually given permission by the project lead. The Summer Edition therefore used the token system in a much more exploration-focused way than Easter."
      ],

      sections: [
        {
          heading: "THE CRIMSON LORD",
          paragraphs: [
            "The villain of the Summer Edition was THE CRIMSON LORD, who had his own fortress inside the Crimson Forest. At first, he did not actively attack players — he remained inside the forest, and instead of directly fighting the players, he slowly spread his corruption outward.",
            "His focus was not primarily player-hunting. His target was the island's Seal System."
          ]
        },

        {
          heading: "THE SEVEN SEALS",
          paragraphs: [
            "The Crimson Lord attacked the seven Seal Statues one by one — the core mechanism of the island's Seal System, not merely decorative structures. As each statue was destroyed, the island's protection grew weaker.",
            "The Mountain Seal was the first to fall. The remaining statues were destroyed gradually throughout the Summer storyline, each destruction slowly approaching the finale. By the end of the Summer Edition, ALL SEVEN SEALS WERE BROKEN, and the Seal System was effectively gone."
          ]
        },

        {
          heading: "THE CRIMSON FOREST",
          paragraphs: [
            "The important locations of the Summer Edition were the Sealkeeper Tower, the Cathedral, the Crimson Forest, the Crimson Blade, the Fountain, and the Volcano — at this point still associated with the Forest Beacon and the former forest area.",
            "The Crimson Forest itself was the Crimson Lord's stronghold, and the source point of the corruption spreading toward the seals."
          ]
        }
      ],

      timeline: [
        { date: "JUN 20", label: "Event Opens" },
        { date: "", label: "Hidden Tokens" },
        { date: "", label: "Crimson Lord Emerges" },
        { date: "", label: "Crimson Forest Corrupted" },
        { date: "", label: "Mountain Seal Destroyed" },
        { date: "", label: "Remaining Seals Destroyed One By One" },
        { date: "", label: "Final Seal Destroyed" },
        { date: "JUL 09", label: "The Game 2026: Summer Finale", marker: true },
        { date: "", label: "Crimson Lord Defeated" },
        { date: "", label: "Death Scene" },
        { date: "", label: "Aftermath" },
        { date: "", label: "Crimson Lord Is Not Dead", marker: true },
        { date: "", label: "All Seals Broken", marker: true },
        { date: "", label: "The Hallow King Awakens", marker: true }
      ],

      /* EXACT SUMMER TEASER FILES */
      gallery: {
        prefix: "summer-teaser-",
        count: 8
      },

      finale: {
        label: "THE GAME 2026: SUMMER FINALE",
        date: "JULY 09, 2026",
        name: "THE CRIMSON LORD",

        paragraphs: [
          "The Summer finale was a custom boss fight against the Crimson Lord. Compared with Easter, it was far more ambitious — significantly more effects, a more elaborate boss encounter, a custom death scene, and a larger cinematic presentation overall.",
          "The Crimson Lord appeared to be defeated. The aftermath revealed otherwise."
        ],

        image: "summer-finale.jpg"
      },

      aftermathHeading: "THE AFTERMATH",

      aftermath: [
        "The Crimson Lord was not truly dead.",
        "The seven seals had all been destroyed. The island's protection was gone. And the destruction of the final seal triggered the awakening of something far older."
      ],

      strongLines: [
        "ALL SEALS ARE BROKEN.",
        "THE HALLOW KING IS AWAKENING."
      ]
    }

  };


  /* =======================================================================
     HELPERS
     ======================================================================= */

  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }


  /* =======================================================================
     TIMELINE
     ======================================================================= */

  function renderTimeline(steps) {
    return (
      '<div class="dossier-timeline">' +

      steps.map(function (s) {
        return (
          '<div class="timeline-step' +
            (s.marker ? " marker" : "") +
          '">' +

            (
              s.date
                ? '<div class="timeline-step-date">' +
                    s.date +
                  '</div>'
                : ""
            ) +

            '<div class="timeline-step-title">' +
              s.label +
            '</div>' +

          '</div>'
        );
      }).join("") +

      '</div>'
    );
  }


  /* =======================================================================
     PHOTO GALLERY
     =======================================================================

     IMPORTANT:
     If prefix = "easter-teaser-"

     The generated files are:

       easter-teaser-1.jpg
       easter-teaser-2.jpg
       easter-teaser-3.jpg
       ...
       easter-teaser-8.jpg

     If prefix = "summer-teaser-"

     The generated files are:

       summer-teaser-1.jpg
       summer-teaser-2.jpg
       ...
       summer-teaser-8.jpg
     ======================================================================= */

  function renderGallery(gallery, eventTitle) {

    var items = [];

    for (var i = 1; i <= gallery.count; i++) {

      /* EXACT FILE NAME */
      var file = gallery.prefix + i + ".jpg";

      /* Convert the prefix into a readable label */
      var label = gallery.prefix
        .replace("-teaser-", "")
        .toUpperCase() +
        " TEASER " +
        i;

      items.push(

        '<div class="gallery-item" ' +

          'data-fallback="' +
            escapeAttr(
              label + " — IMAGE NOT YET ADDED"
            ) +
          '" ' +

          'data-caption="' +
            escapeAttr(
              label + " — " + eventTitle
            ) +
          '">' +

            '<img src="' +
              file +
            '" ' +

              'alt="' +
                escapeAttr(
                  label + " — " + eventTitle
                ) +
              '" ' +

              'loading="lazy">' +

            '<span class="gallery-item-label">' +
              label +
            '</span>' +

        '</div>'
      );
    }

    return (

      '<div class="dossier-gallery-count">' +
        gallery.count +
        ' PHOTOS' +
      '</div>' +

      '<div class="dossier-gallery">' +
        items.join("") +
      '</div>'
    );
  }


  /* =======================================================================
     FINALE
     ======================================================================= */

  function renderFinale(finale) {

    return (

      '<div class="dossier-finale">' +

        '<div class="dossier-finale-label">' +
          finale.label +
        '</div>' +

        '<div class="dossier-finale-date">' +
          finale.date +
        '</div>' +

        '<h2>' +
          finale.name +
        '</h2>' +

        finale.paragraphs.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("") +

        '<div class="dossier-finale-image" ' +

          'data-fallback="FINALE IMAGE — NOT YET ADDED" ' +

          'data-caption="' +
            escapeAttr(finale.label) +
          '">' +

            '<img src="' +
              finale.image +
            '" ' +

              'alt="' +
                escapeAttr(finale.label) +
              '" ' +

              'loading="lazy">' +

            '<span class="dossier-finale-image-label">' +
              'FINALE — ' +
              finale.date +
            '</span>' +

        '</div>' +

      '</div>'
    );
  }


  /* =======================================================================
     AFTERMATH
     ======================================================================= */

  function renderAftermath(ev) {

    var strong = ev.strongLines.map(function (line) {

      return (
        '<span class="aftermath-strong">' +
          line +
        '</span>'
      );

    }).join("");

    return (

      '<div class="dossier-aftermath">' +

        '<div class="dossier-section-label">' +
          ev.aftermathHeading +
        '</div>' +

        ev.aftermath.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("") +

        strong +

      '</div>'
    );
  }


  /* =======================================================================
     FULL DOSSIER
     ======================================================================= */

  function renderDossier(ev) {

    var html = "";


    /* HERO */

    html +=
      '<div class="dossier-hero era-' +
        ev.era +
      '">';

    html +=
      '<span class="dossier-hero-tag">' +
        ev.tag +
      '</span>';

    html +=
      '<h1>' +
        ev.title +
      '</h1>';

    html +=
      '<div class="dossier-hero-subtitle">' +
        ev.subtitle +
      '</div>';

    html +=
      '<div class="dossier-hero-dates">' +
        ev.dates +
      '</div>';

    html +=
      '</div>';


    /* OVERVIEW */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'OVERVIEW' +
      '</div>';

    html +=
      '<div class="dossier-section-label">' +
        'THE TOKEN SYSTEM' +
      '</div>';

    html +=
      ev.overview.map(function (p) {
        return '<p>' + p + '</p>';
      }).join("");

    html +=
      '</div>';


    /* STORY SECTIONS */

    ev.sections.forEach(function (s) {

      html +=
        '<div class="dossier-section">';

      html +=
        '<div class="dossier-section-label">' +
          s.heading +
        '</div>';

      html +=
        s.paragraphs.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("");

      html +=
        '</div>';
    });


    /* TIMELINE */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'EVENT TIMELINE' +
      '</div>';

    html +=
      renderTimeline(ev.timeline);

    html +=
      '</div>';


    /* PHOTO ARCHIVE */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'PHOTO ARCHIVE' +
      '</div>';

    html +=
      renderGallery(
        ev.gallery,
        ev.title
      );

    html +=
      '</div>';


    /* FINALE */

    html +=
      renderFinale(ev.finale);


    /* AFTERMATH */

    html +=
      renderAftermath(ev);


    return html;
  }


  /* =======================================================================
     WIRING
     ======================================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      var viewer =
        document.getElementById(
          "event-archive-viewer"
        );

      var scrollEl =
        viewer
          ? viewer.querySelector(
              ".event-archive-scroll"
            )
          : null;

      var content =
        document.getElementById(
          "dossier-content"
        );

      var backBtn =
        document.getElementById(
          "event-archive-back"
        );

      var lightbox =
        document.getElementById(
          "event-lightbox"
        );

      var lightboxImg =
        document.getElementById(
          "event-lightbox-image"
        );

      var lightboxCaption =
        document.getElementById(
          "event-lightbox-caption"
        );

      var lightboxClose =
        document.getElementById(
          "event-lightbox-close"
        );


      if (!viewer || !content) {
        return;
      }


      /* ===================================================================
         OPEN EVENT
         =================================================================== */

      function openEvent(id) {

        var ev = EVENTS[id];

        if (!ev) {
          return;
        }


        /* Render dossier */

        content.innerHTML =
          renderDossier(ev);


        /* ===============================================================
           BROKEN IMAGE FALLBACK
           =============================================================== */

        content
          .querySelectorAll(
            ".gallery-item img, .dossier-finale-image img"
          )
          .forEach(function (img) {

            img.addEventListener(
              "error",
              function () {

                var wrap =
                  img.closest(
                    ".gallery-item, .dossier-finale-image"
                  );

                if (wrap) {
                  wrap.classList.add(
                    "img-missing"
                  );
                }

              }
            );

          });


        /* ===============================================================
           LIGHTBOX
           =============================================================== */

        content
          .querySelectorAll(
            ".gallery-item, .dossier-finale-image"
          )
          .forEach(function (item) {

            item.addEventListener(
              "click",
              function () {

                if (
                  item.classList.contains(
                    "img-missing"
                  )
                ) {
                  return;
                }

                var img =
                  item.querySelector("img");

                if (!img) {
                  return;
                }

                openLightbox(
                  img.src,
                  item.getAttribute(
                    "data-caption"
                  ) || ""
                );

              }
            );

          });


        /* Open viewer */

        viewer.classList.add("active");

        viewer.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow =
          "hidden";


        if (scrollEl) {
          scrollEl.scrollTop = 0;
        }

      }


      /* ===================================================================
         CLOSE EVENT
         =================================================================== */

      function closeEvent() {

        viewer.classList.remove(
          "active"
        );

        viewer.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow =
          "";

      }


      /* ===================================================================
         OPEN LIGHTBOX
         =================================================================== */

      function openLightbox(
        src,
        caption
      ) {

        if (
          !lightbox ||
          !lightboxImg
        ) {
          return;
        }

        lightboxImg.src =
          src;

        lightboxImg.alt =
          caption;

        if (lightboxCaption) {

          lightboxCaption.textContent =
            caption;

        }

        lightbox.classList.add(
          "active"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

      }


      /* ===================================================================
         CLOSE LIGHTBOX
         =================================================================== */

      function closeLightbox() {

        if (!lightbox) {
          return;
        }

        lightbox.classList.remove(
          "active"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "true"
        );

      }


      /* ===================================================================
         EVENT CARDS
         =================================================================== */

      document
        .querySelectorAll(
          ".prev-event-card"
        )
        .forEach(function (card) {

          card.addEventListener(
            "click",
            function () {

              openEvent(
                card.getAttribute(
                  "data-event"
                )
              );

            }
          );


          card.addEventListener(
            "keydown",
            function (e) {

              if (
                e.key === "Enter" ||
                e.key === " "
              ) {

                e.preventDefault();

                openEvent(
                  card.getAttribute(
                    "data-event"
                  )
                );

              }

            }
          );

        });


      /* ===================================================================
         BACK BUTTON
         =================================================================== */

      if (backBtn) {

        backBtn.addEventListener(
          "click",
          closeEvent
        );

      }


      /* ===================================================================
         BACKDROP CLICK
         =================================================================== */

      viewer.addEventListener(
        "click",
        function (e) {

          if (e.target === viewer) {
            closeEvent();
          }

        }
      );


      /* ===================================================================
         LIGHTBOX CLOSE
         =================================================================== */

      if (lightboxClose) {

        lightboxClose.addEventListener(
          "click",
          closeLightbox
        );

      }


      if (lightbox) {

        lightbox.addEventListener(
          "click",
          function (e) {

            if (e.target === lightbox) {
              closeLightbox();
            }

          }
        );

      }


      /* ===================================================================
         ESCAPE KEY
         =================================================================== */

      document.addEventListener(
        "keydown",
        function (e) {

          if (e.key !== "Escape") {
            return;
          }

          if (
            lightbox &&
            lightbox.classList.contains(
              "active"
            )
          ) {

            closeLightbox();

            return;
          }

          if (
            viewer.classList.contains(
              "active"
            )
          ) {

            closeEvent();

          }

        }
      );

    }
  );

})();

/* =========================================================================
   THE GAME 2026 — CORRUPTION ATMOSPHERE
   Animated crimson particles + spreading corruption veins
   ========================================================================= */

(() => {
    const hero = document.querySelector('#home.page > .hero');

    if (!hero) {
        console.warn('[Corruption] Hero not found.');
        return;
    }

    /* ---------------------------------------------------------------------
       CONTAINER
       --------------------------------------------------------------------- */

    const atmosphere = document.createElement('div');
    atmosphere.className = 'corruption-atmosphere';

    Object.assign(atmosphere.style, {
        position: 'absolute',
        inset: '0',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: '1'
    });

    hero.appendChild(atmosphere);


    /* ---------------------------------------------------------------------
       PARTICLES
       --------------------------------------------------------------------- */

    const particleContainer = document.createElement('div');
    particleContainer.className = 'corruption-particles';

    Object.assign(particleContainer.style, {
        position: 'absolute',
        inset: '0',
        overflow: 'hidden',
        pointerEvents: 'none'
    });

    atmosphere.appendChild(particleContainer);


    const particles = [];

    const PARTICLE_COUNT = 55;

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        const particle = document.createElement('span');
        particle.className = 'corruption-particle';

        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        const duration = 7 + Math.random() * 13;
        const delay = Math.random() * -20;

        Object.assign(particle.style, {
            position: 'absolute',
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'rgba(184, 34, 31, 0.85)',
            boxShadow: `0 0 ${size * 3}px rgba(184, 34, 31, 0.45)`,
            opacity: '0.25',
            animation: `corruptionParticle ${duration}s linear ${delay}s infinite`,
            willChange: 'transform, opacity'
        });

        particleContainer.appendChild(particle);
        particles.push(particle);
    }


    /* ---------------------------------------------------------------------
       CORRUPTION VEINS
       --------------------------------------------------------------------- */

    const veins = document.createElement('div');
    veins.className = 'corruption-veins';

    Object.assign(veins.style, {
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none'
    });

    atmosphere.appendChild(veins);


    /*
       SVG gives us proper organic branching lines without needing
       additional images.
    */

    veins.innerHTML = `
        <svg
            class="corruption-svg"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
        >

            <!-- LEFT SIDE -->
            <path class="corruption-vein"
                d="M0 760
                   C80 720 90 650 155 620
                   C210 590 190 530 250 490
                   C290 460 275 400 330 360"
            />

            <path class="corruption-vein"
                d="M0 620
                   C75 600 110 555 145 515
                   C175 480 205 475 220 420
                   C235 375 280 350 300 300"
            />

            <path class="corruption-vein"
                d="M120 900
                   C160 820 210 790 245 735
                   C280 680 310 665 350 610
                   C380 570 405 560 425 515"
            />

            <!-- RIGHT SIDE -->
            <path class="corruption-vein"
                d="M1600 760
                   C1520 720 1510 650 1445 620
                   C1390 590 1410 530 1350 490
                   C1310 460 1325 400 1270 360"
            />

            <path class="corruption-vein"
                d="M1600 620
                   C1525 600 1490 555 1455 515
                   C1425 480 1395 475 1380 420
                   C1365 375 1320 350 1300 300"
            />

            <path class="corruption-vein"
                d="M1480 900
                   C1440 820 1390 790 1355 735
                   C1320 680 1290 665 1250 610
                   C1220 570 1195 560 1175 515"
            />

            <!-- SMALL BRANCHES -->
            <path class="corruption-vein branch"
                d="M155 620
                   C190 635 210 650 230 680"
            />

            <path class="corruption-vein branch"
                d="M250 490
                   C230 470 215 445 220 420"
            />

            <path class="corruption-vein branch"
                d="M1445 620
                   C1410 635 1390 650 1370 680"
            />

            <path class="corruption-vein branch"
                d="M1350 490
                   C1370 470 1385 445 1380 420"
            />

        </svg>
    `;


    /* ---------------------------------------------------------------------
       ANIMATION CSS
       --------------------------------------------------------------------- */

    if (!document.querySelector('#corruption-atmosphere-style')) {

        const style = document.createElement('style');
        style.id = 'corruption-atmosphere-style';

        style.textContent = `

            @keyframes corruptionParticle {

                0% {
                    transform: translate3d(0, 40px, 0) scale(.7);
                    opacity: 0;
                }

                12% {
                    opacity: .45;
                }

                50% {
                    opacity: .8;
                }

                88% {
                    opacity: .35;
                }

                100% {
                    transform: translate3d(
                        ${Math.random() * 80 - 40}px,
                        -180px,
                        0
                    ) scale(1.15);

                    opacity: 0;
                }
            }

            .corruption-svg {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                overflow: visible;
            }

            .corruption-vein {
                fill: none;
                stroke: rgba(120, 12, 12, .34);
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;

                filter:
                    drop-shadow(
                        0 0 5px rgba(184, 34, 31, .28)
                    );

                stroke-dasharray: 900;
                stroke-dashoffset: 900;

                animation:
                    corruptionVeinGrow
                    14s
                    ease-in-out
                    infinite alternate;
            }

            .corruption-vein.branch {
                stroke-width: 1.5;
                stroke: rgba(150, 18, 18, .28);
            }

            @keyframes corruptionVeinGrow {

                0% {
                    stroke-dashoffset: 900;
                    opacity: .25;
                }

                35% {
                    opacity: .55;
                }

                100% {
                    stroke-dashoffset: 0;
                    opacity: 1;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* ---------------------------------------------------------------------
       CORRUPTION INTENSITY
       ---------------------------------------------------------------------

       Baseline is intentionally NOT zero.
       The island is already corrupted when the event begins.
       --------------------------------------------------------------------- */

    function setIntensity(value) {

        const convergence = Math.max(
            0,
            Math.min(100, Number(value) || 0)
        );

        /*
           Starting intensity:
           0% convergence = 20% visual corruption

           100% convergence = 100% visual corruption
        */

        const intensity =
            0.20 + (convergence / 100) * 0.80;


        /* PARTICLES */

        particleContainer.style.opacity =
            Math.min(1, intensity * 1.15);


        particles.forEach((particle, index) => {

            const base = 0.2 + intensity * 0.55;

            particle.style.opacity =
                Math.min(1, base);

            /*
               Higher convergence makes particles slightly larger
               and more noticeable.
            */

            const size =
                1 +
                Math.random() *
                (1.5 + intensity * 2);

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        });


        /* VEINS */

        const veinOpacity =
            0.25 + intensity * 0.75;

        veins.style.opacity =
            Math.min(1, veinOpacity);


        /*
           At high convergence, push the corruption further toward
           the center of the screen.
        */

        const spread =
            0.20 + intensity * 0.80;

        veins.style.transform =
            `scale(${0.88 + spread * 0.12})`;


        hero.dataset.corruption =
            Math.round(convergence);
    }


    /* ---------------------------------------------------------------------
       PUBLIC TEST API
       --------------------------------------------------------------------- */

    window.CorruptionAtmosphere = {
        set: setIntensity,

        reset() {
            setIntensity(0);
        },

        get() {
            return Number(
                hero.dataset.corruption || 0
            );
        }
    };


    /* ---------------------------------------------------------------------
       CONNECT TO EXISTING TEST SYSTEM
       --------------------------------------------------------------------- */

    /*
       If CorruptionTest already exists, wrap its set() function so
       the atmosphere follows it automatically.
    */

    if (
        window.CorruptionTest &&
        typeof window.CorruptionTest.set === 'function'
    ) {

        const originalSet =
            window.CorruptionTest.set;

        window.CorruptionTest.set = function(value) {

            originalSet.call(
                window.CorruptionTest,
                value
            );

            setIntensity(value);
        };
    }


    /* Initial state */
    setIntensity(0);

    console.log(
        '[Corruption Atmosphere] Active — particles + veins.'
    );

})();

/* =========================================================================
   THE GAME 2026 — INTERACTIVE ISLAND CARTOGRAPHY
   ========================================================================= */

(() => {

    const island = document.getElementById("island");

    if (!island) {
        return;
    }


    /* =====================================================
       LOCATION DATA
       ===================================================== */

    const LOCATIONS = {

        cathedral: {

            code: "LOCATION 001",

            record: "LOC-001",

            title: "CATHEDRAL",

            classification: "STRUCTURE",

            region: "CENTRAL",

            defaultStatus: "COMPROMISED",

            description:
                "The former prison of the Hallow King. The Cathedral was once the central point of the island's sealing system. Its connection to the Hallowed Realm remains active.",

            events: [
                "HALLOWEEN 2025",
                "HALLOWEEN 2026"
            ],

            entities: [
                "HALLOW KING"
            ],

            archive: "cathedral",

            warning:
                "CONNECTION TO HALLOWED REALM DETECTED."

        },


        volcano: {

            code: "LOCATION 002",

            record: "LOC-002",

            title: "VOLCANO",

            classification: "ANOMALOUS REGION",

            region: "WESTERN ISLAND",

            defaultStatus: "UNSTABLE",

            description:
                "A volcanic region associated with the island's later transformation. The area remains unstable and shows signs of increasing anomalous activity.",

            events: [
                "SUMMER 2026",
                "HALLOWEEN 2026"
            ],

            entities: [
                "UNKNOWN"
            ],

            archive: "volcano",

            warning:
                "THERMAL AND ANOMALOUS ACTIVITY DETECTED."

        },


        fountain: {

            code: "LOCATION 003",

            record: "LOC-003",

            title: "FOUNTAIN",

            classification: "CONNECTION POINT",

            region: "CENTRAL",

            defaultStatus: "ACTIVE",

            description:
                "The Fountain is one of the island's strongest known connection points to the Hallowed Realm. During Easter 2026, the Killer Bunny entered the island through it.",

            events: [
                "EASTER 2026",
                "HALLOWEEN 2026"
            ],

            entities: [
                "KILLER BUNNY",
                "HALLOW KING"
            ],

            archive: "fountain",

            warning:
                "HALLOWED REALM CONNECTION DETECTED."

        },


        "crimson-forest": {

            code: "LOCATION 004",

            record: "LOC-004",

            title: "CRIMSON FOREST",

            classification: "CORRUPTED REGION",

            region: "NORTH / EAST",

            defaultStatus: "CORRUPTED",

            description:
                "The forest associated with the Crimson Lord. The region became the center of the Crimson Lord's activity during Summer 2026.",

            events: [
                "SUMMER 2026",
                "THE SEAL SYSTEM",
                "THE AWAKENING"
            ],

            entities: [
                "CRIMSON LORD"
            ],

            archive: "crimson-forest",

            warning:
                "CRIMSON CORRUPTION DETECTED."

        },


        "sealkeeper-tower": {

            code: "LOCATION 005",

            record: "LOC-005",

            title: "SEALKEEPER TOWER",

            classification: "HISTORICAL STRUCTURE",

            region: "EASTERN ISLAND",

            defaultStatus: "UNKNOWN",

            description:
                "The last known location associated with the remaining Sealkeeper. The tower contains records connected to the island's former protection system.",

            events: [
                "SUMMER 2026"
            ],

            entities: [
                "SEALKEEPER"
            ],

            archive: "sealkeeper-tower",

            warning:
                "NO ACTIVE SEAL SYSTEM DETECTED."

        },


        "haunted-house": {

            code: "LOCATION 006",

            record: "LOC-006",

            title: "HAUNTED HOUSE",

            classification: "ESTABLISHED LOCATION",

            region: "WESTERN ISLAND",

            defaultStatus: "UNKNOWN",

            description:
                "An established location on the island. Current records provide insufficient information regarding its role in the Convergence.",

            events: [
                "THE GAME 2026"
            ],

            entities: [
                "UNKNOWN"
            ],

            archive: "haunted-house",

            warning:
                "NO RELIABLE SIGNAL FROM THIS LOCATION."

        }

    };


    /* =====================================================
       DOM
       ===================================================== */

    const markers =
        [...island.querySelectorAll(
            ".tg-island-marker"
        )];

    const locationCards =
        [...island.querySelectorAll(
            ".tg-island-location-card"
        )];


    const condition =
        document.getElementById(
            "tg-island-condition"
        );

    const conditionDetail =
        document.getElementById(
            "tg-island-condition-detail"
        );

    const signal =
        document.getElementById(
            "tg-island-signal"
        );

    const warningText =
        document.getElementById(
            "tg-island-warning-text"
        );

    const convergenceValue =
        document.getElementById(
            "tg-island-convergence-value"
        );

    const miniMeter =
        document.getElementById(
            "tg-island-mini-meter-fill"
        );

    const mapStatus =
        document.getElementById(
            "tg-island-map-status"
        );

    const mapSignal =
        document.getElementById(
            "tg-island-map-signal"
        );

    const logText =
        document.getElementById(
            "tg-island-log-text"
        );


    const dossierCode =
        document.getElementById(
            "tg-island-dossier-code"
        );

    const dossierTitle =
        document.getElementById(
            "tg-island-dossier-title"
        );

    const dossierStatus =
        document.getElementById(
            "tg-island-dossier-status"
        );

    const dossierClass =
        document.getElementById(
            "tg-island-dossier-class"
        );

    const dossierRegion =
        document.getElementById(
            "tg-island-dossier-region"
        );

    const dossierRecord =
        document.getElementById(
            "tg-island-dossier-record"
        );

    const dossierDescription =
        document.getElementById(
            "tg-island-dossier-description"
        );

    const dossierEvents =
        document.getElementById(
            "tg-island-dossier-events"
        );

    const dossierEntities =
        document.getElementById(
            "tg-island-dossier-entities"
        );

    const dossierWarning =
        document.getElementById(
            "tg-island-dossier-warning"
        );

    const archiveButton =
        document.getElementById(
            "tg-island-archive-button"
        );


    /* =====================================================
       MAP
       ===================================================== */

    const viewport =
        document.getElementById(
            "tg-island-map-viewport"
        );

    const stage =
        document.getElementById(
            "tg-island-map-stage"
        );

    const frame =
        document.getElementById(
            "tg-island-map-frame"
        );


    const zoomIn =
        document.getElementById(
            "tg-island-zoom-in"
        );

    const zoomOut =
        document.getElementById(
            "tg-island-zoom-out"
        );

    const resetButton =
        document.getElementById(
            "tg-island-reset"
        );

    const fullscreenButton =
        document.getElementById(
            "tg-island-fullscreen"
        );

    const zoomValue =
        document.getElementById(
            "tg-island-zoom-value"
        );


    let currentLocation =
        "cathedral";


    let zoom =
        1;

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 2.8;
    const ZOOM_STEP = .2;


    let panX = 0;
    let panY = 0;

    let dragging = false;

    let dragStartX = 0;
    let dragStartY = 0;

    let startingPanX = 0;
    let startingPanY = 0;


    /* =====================================================
       LOCATION STATUS
       ===================================================== */

    function getLocationStatus(
        location,
        percentage
    ) {

        if (!location) {
            return "UNKNOWN";
        }


        if (
            location === "cathedral"
            && percentage >= 75
        ) {
            return "CRITICAL";
        }


        if (
            location === "fountain"
            && percentage >= 75
        ) {
            return "OVERLOADED";
        }


        if (
            location === "crimson-forest"
            && percentage >= 50
        ) {
            return "CRITICAL";
        }


        if (
            location === "sealkeeper-tower"
            && percentage >= 65
        ) {
            return "SIGNAL LOST";
        }


        if (
            location === "haunted-house"
            && percentage >= 80
        ) {
            return "SIGNAL LOST";
        }


        if (
            location === "volcano"
            && percentage >= 50
        ) {
            return "CRITICAL";
        }


        return LOCATIONS[location]
            .defaultStatus;

    }


    /* =====================================================
       SELECT LOCATION
       ===================================================== */

    function selectLocation(
        id,
        focusMap = true
    ) {

        const data =
            LOCATIONS[id];

        if (!data) {
            return;
        }


        currentLocation =
            id;


        markers.forEach(
            marker => {

                marker.classList.toggle(
                    "selected",
                    marker.dataset.location === id
                );

            }
        );


        locationCards.forEach(
            card => {

                card.classList.toggle(
                    "active",
                    card.dataset.location === id
                );

            }
        );


        if (dossierCode) {
            dossierCode.textContent =
                data.code;
        }


        if (dossierTitle) {
            dossierTitle.textContent =
                data.title;
        }


        if (dossierClass) {
            dossierClass.textContent =
                data.classification;
        }


        if (dossierRegion) {
            dossierRegion.textContent =
                data.region;
        }


        if (dossierRecord) {
            dossierRecord.textContent =
                data.record;
        }


        if (dossierDescription) {
            dossierDescription.textContent =
                data.description;
        }


        if (dossierEvents) {

            dossierEvents.innerHTML =
                data.events
                    .map(
                        event =>
                            `<li>${event}</li>`
                    )
                    .join("");

        }


        if (dossierEntities) {

            dossierEntities.innerHTML =
                data.entities
                    .map(
                        entity =>
                            `<li>${entity}</li>`
                    )
                    .join("");

        }


        if (dossierWarning) {
            dossierWarning.textContent =
                data.warning;
        }


        const percentage =
            getConvergencePercentage();


        if (dossierStatus) {
            dossierStatus.textContent =
                getLocationStatus(
                    id,
                    percentage
                );
        }


        if (
            focusMap &&
            window.innerWidth > 800
        ) {

            focusMarker(id);

        }

    }


    /* =====================================================
       FOCUS MARKER
       ===================================================== */

    function focusMarker(id) {

        const marker =
            markers.find(
                item =>
                    item.dataset.location === id
            );

        if (!marker) {
            return;
        }


        const left =
            parseFloat(
                marker.style.left
            );

        const top =
            parseFloat(
                marker.style.top
            );


        if (
            Number.isNaN(left) ||
            Number.isNaN(top)
        ) {
            return;
        }


        const targetX =
            50 - left;

        const targetY =
            50 - top;


        zoom =
            Math.max(
                1.15,
                zoom
            );


        panX =
            targetX *
            zoom *
            1.35;

        panY =
            targetY *
            zoom *
            1.35;


        clampPan();

        applyMapTransform();

    }


    /* =====================================================
       MAP TRANSFORM
       ===================================================== */

    function applyMapTransform() {

        if (!stage) {
            return;
        }


        stage.style.transform =
            `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;


        if (zoomValue) {

            zoomValue.textContent =
                `${Math.round(zoom * 100)}%`;

        }

    }


    function clampPan() {

        const rect =
            viewport
                ? viewport.getBoundingClientRect()
                : null;

        if (!rect) {
            return;
        }


        if (zoom <= 1) {

            panX = 0;
            panY = 0;

            return;

        }


        const maxX =
            rect.width *
            (zoom - 1) *
            .5;

        const maxY =
            rect.height *
            (zoom - 1) *
            .5;


        panX =
            Math.max(
                -maxX,
                Math.min(
                    maxX,
                    panX
                )
            );


        panY =
            Math.max(
                -maxY,
                Math.min(
                    maxY,
                    panY
                )
            );

    }


    function setZoom(
        newZoom
    ) {

        zoom =
            Math.max(
                MIN_ZOOM,
                Math.min(
                    MAX_ZOOM,
                    newZoom
                )
            );


        if (zoom === 1) {

            panX = 0;
            panY = 0;

        }


        clampPan();
        applyMapTransform();

    }


    function resetMap() {

        zoom = 1;

        panX = 0;
        panY = 0;

        applyMapTransform();

    }


    /* =====================================================
       BUTTON CONTROLS
       ===================================================== */

    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            () => {

                setZoom(
                    zoom + ZOOM_STEP
                );

            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            () => {

                setZoom(
                    zoom - ZOOM_STEP
                );

            }
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetMap
        );

    }


    /* =====================================================
       WHEEL ZOOM
       ===================================================== */

    if (viewport) {

        viewport.addEventListener(
            "wheel",
            event => {

                event.preventDefault();

                const direction =
                    event.deltaY > 0
                        ? -ZOOM_STEP
                        : ZOOM_STEP;


                setZoom(
                    zoom + direction
                );

            },
            {
                passive: false
            }
        );

    }


    /* =====================================================
       DRAGGING
       ===================================================== */

    if (viewport) {

        viewport.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.target.closest(
                        ".tg-island-marker"
                    )
                ) {
                    return;
                }


                if (zoom <= 1) {
                    return;
                }


                dragging = true;

                viewport.classList.add(
                    "is-dragging"
                );

                stage.classList.add(
                    "is-dragging"
                );


                dragStartX =
                    event.clientX;

                dragStartY =
                    event.clientY;

                startingPanX =
                    panX;

                startingPanY =
                    panY;


                viewport.setPointerCapture(
                    event.pointerId
                );

            }
        );


        viewport.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }


                panX =
                    startingPanX +
                    (
                        event.clientX -
                        dragStartX
                    );

                panY =
                    startingPanY +
                    (
                        event.clientY -
                        dragStartY
                    );


                clampPan();
                applyMapTransform();

            }
        );


        const stopDragging =
            event => {

                if (!dragging) {
                    return;
                }


                dragging = false;

                viewport.classList.remove(
                    "is-dragging"
                );

                stage.classList.remove(
                    "is-dragging"
                );


                try {

                    viewport.releasePointerCapture(
                        event.pointerId
                    );

                }
                catch (_) {}

            };


        viewport.addEventListener(
            "pointerup",
            stopDragging
        );

        viewport.addEventListener(
            "pointercancel",
            stopDragging
        );

    }


    /* =====================================================
       MARKER CLICKS
       ===================================================== */

    markers.forEach(
        marker => {

            marker.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    selectLocation(
                        marker.dataset.location,
                        false
                    );

                }
            );

        }
    );


    /* =====================================================
       LOCATION CARD CLICKS
       ===================================================== */

    locationCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    selectLocation(
                        card.dataset.location,
                        true
                    );

                }
            );

        }
    );


    /* =====================================================
       ARCHIVE BUTTON
       ===================================================== */

    if (archiveButton) {

        archiveButton.addEventListener(
            "click",
            () => {

                const data =
                    LOCATIONS[currentLocation];

                if (
                    !data ||
                    !data.archive
                ) {
                    return;
                }


                /*
                 * Your existing archive system already
                 * has clickable .archive-file elements.
                 * We simply trigger the correct one.
                 */

                const archiveFile =
                    document.querySelector(
                        `.archive-file[data-archive="${data.archive}"]`
                    );


                if (archiveFile) {

                    /*
                     * Navigate to the archive page
                     * using your existing page system.
                     */

                    const archivePageButton =
                        document.querySelector(
                            '[data-page="archive"]'
                        );


                    if (archivePageButton) {
                        archivePageButton.click();
                    }


                    setTimeout(
                        () => {

                            archiveFile.click();

                        },
                        180
                    );

                    return;

                }


                /*
                 * Fallback if the archive record
                 * does not exist.
                 */

                console.warn(
                    "Island archive record not found:",
                    data.archive
                );

            }
        );

    }     

    selectLocation("cathedral", false);
    applyMapTransform();

})();

/* =========================================================================
   THE GAME 2026 — CONVERGENCE SYSTEM
   V1.1.0 — PHASE 2
   DATE-DRIVEN + VISUAL + ATMOSPHERIC PROGRESSION
   ========================================================================= */

(() => {

    "use strict";


    /* =====================================================
       EVENT DATES
       ===================================================== */

    const convergenceStart =
        new Date("2026-10-03T00:00:00");

    const convergenceEnd =
        new Date("2026-10-31T23:59:59");


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const levelElement =
        document.getElementById("convergence-level");

    const stateElement =
        document.getElementById("convergence-state");

    const descriptionElement =
        document.getElementById("convergence-description");

    const fillElement =
        document.getElementById("convergence-fill");

    const stages =
        document.querySelectorAll(".convergence-stage");

    const convergencePage =
        document.querySelector(".convergence-page");


    /* =====================================================
       WORLD STATUS
       ===================================================== */

    const islandStabilityElement =
        document.getElementById("island-stability");

    const islandStabilityBarElement =
        document.getElementById("island-stability-bar");

    const realmInfluenceElement =
        document.getElementById("realm-influence");

    const realmInfluenceBarElement =
        document.getElementById("realm-influence-bar");

    const realmConvergenceElement =
        document.getElementById("realm-convergence");

    const realmConvergenceBarElement =
        document.getElementById("realm-convergence-bar");


    /* =====================================================
       ATMOSPHERIC CSS
       ===================================================== */

    const style =
        document.createElement("style");

    style.id =
        "convergence-phase-2-style";

    style.textContent = `

        .convergence-page {
            position: relative;
            overflow: hidden;
        }


        .convergence-atmosphere {
            position: absolute;
            inset: 0;

            pointer-events: none;

            z-index: 0;

            opacity: 0;

            transition:
                opacity 1s ease;

            transform-origin: center;
        }


        .convergence-atmosphere::before {
            content: "";

            position: absolute;

            inset: -20%;

            background:
                radial-gradient(
                    circle at 50% 20%,
                    rgba(120, 0, 0, .16),
                    transparent 45%
                );

            opacity: 0;

            transition:
                opacity 1s ease;
        }


        .convergence-atmosphere::after {
            content: "";

            position: absolute;

            inset: 0;

            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 3px,
                    rgba(255,255,255,.015) 4px
                );

            opacity: 0;

            transition:
                opacity 1s ease;
        }


        .convergence-page >
        *:not(.convergence-atmosphere) {
            position: relative;
            z-index: 1;
        }


        /* =================================================
           DISTURBANCE
           ================================================= */

        .convergence-page[data-convergence="disturbance"]
        .convergence-atmosphere {
            opacity: .35;
        }


        .convergence-page[data-convergence="disturbance"]
        .convergence-atmosphere::before {
            opacity: .45;
        }


        /* =================================================
           BREACH
           ================================================= */

        .convergence-page[data-convergence="breach"]
        .convergence-atmosphere {
            opacity: .60;

            animation:
                convergence-breathe
                4s
                ease-in-out
                infinite;
        }


        .convergence-page[data-convergence="breach"]
        .convergence-atmosphere::before {
            opacity: .70;
        }


        .convergence-page[data-convergence="breach"]
        .convergence-atmosphere::after {
            opacity: .35;
        }


        /* =================================================
           COLLAPSE
           ================================================= */

        .convergence-page[data-convergence="collapse"]
        .convergence-atmosphere {
            opacity: .80;

            animation:
                convergence-breathe
                2.5s
                ease-in-out
                infinite;
        }


        .convergence-page[data-convergence="collapse"]
        .convergence-atmosphere::before {
            opacity: 1;

            animation:
                convergence-pulse
                2s
                ease-in-out
                infinite;
        }


        .convergence-page[data-convergence="collapse"]
        .convergence-atmosphere::after {
            opacity: .55;
        }


        /* =================================================
           COMPLETE
           ================================================= */

        .convergence-page[data-convergence="complete"]
        .convergence-atmosphere {
            opacity: 1;

            animation:
                convergence-breathe
                1.5s
                ease-in-out
                infinite;
        }


        .convergence-page[data-convergence="complete"]
        .convergence-atmosphere::before {
            opacity: 1;

            animation:
                convergence-pulse
                .8s
                ease-in-out
                infinite;
        }


        .convergence-page[data-convergence="complete"]
        .convergence-atmosphere::after {
            opacity: .8;
        }


        /* =================================================
           BREATHING
           ================================================= */

        @keyframes convergence-breathe {

            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.025);
            }

        }


        /* =================================================
           PULSE
           ================================================= */

        @keyframes convergence-pulse {

            0%,
            100% {
                opacity: .45;
            }

            50% {
                opacity: 1;
            }

        }


        /* =================================================
           GLITCH
           ================================================= */

        .convergence-glitch {
            animation:
                convergence-glitch-animation
                .25s
                steps(2, end);
        }


        @keyframes convergence-glitch-animation {

            0% {
                transform: translate(0);
            }

            25% {
                transform: translate(2px, -1px);
            }

            50% {
                transform: translate(-2px, 1px);
            }

            75% {
                transform: translate(1px, 2px);
            }

            100% {
                transform: translate(0);
            }

        }

    `;


    /*
     * Prevent this script from inserting duplicate CSS
     * if the JS gets loaded twice.
     */

    const oldStyle =
        document.getElementById(
            "convergence-phase-2-style"
        );

    if (oldStyle) {

        oldStyle.remove();

    }

    document.head.appendChild(style);


    /* =====================================================
       CREATE ATMOSPHERE
       ===================================================== */

    let atmosphere = null;

    if (convergencePage) {

        atmosphere =
            convergencePage.querySelector(
                ".convergence-atmosphere"
            );

        if (!atmosphere) {

            atmosphere =
                document.createElement("div");

            atmosphere.className =
                "convergence-atmosphere";

            convergencePage.prepend(
                atmosphere
            );

        }

    }


    /* =====================================================
       CALCULATE CONVERGENCE
       ===================================================== */

    function calculateConvergence() {

        const now =
            new Date();


        /*
         * Before October 3:
         * Convergence has not started.
         */

        if (now < convergenceStart) {

            return 0;

        }


        /*
         * From October 31 23:59:59 onward:
         * Convergence is complete.
         */

        if (now >= convergenceEnd) {

            return 100;

        }


        const totalTime =
            convergenceEnd.getTime() -
            convergenceStart.getTime();

        const elapsedTime =
            now.getTime() -
            convergenceStart.getTime();


        const percentage =
            (elapsedTime / totalTime) * 100;


        return Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );

    }


    /* =====================================================
       CONVERGENCE STATE
       ===================================================== */

    function getConvergenceState(level) {

        if (level >= 100) {

            return {

                name:
                    "CONVERGENCE",

                description:
                    "THE BOUNDARY BETWEEN WORLDS HAS COLLAPSED.",

                stage:
                    5

            };

        }


        if (level >= 75) {

            return {

                name:
                    "COLLAPSE",

                description:
                    "SEPARATION BETWEEN THE TWO WORLDS IS FAILING.",

                stage:
                    4

            };

        }


        if (level >= 50) {

            return {

                name:
                    "BREACH",

                description:
                    "THE HALLOWED REALM IS INCREASINGLY AFFECTING THE ISLAND.",

                stage:
                    3

            };

        }


        if (level >= 25) {

            return {

                name:
                    "DISTURBANCE",

                description:
                    "UNUSUAL CONVERGENCE ACTIVITY HAS BEEN DETECTED.",

                stage:
                    2

            };

        }


        return {

            name:
                "PRE-CONVERGENCE",

            description:
                "THE CONVERGENCE HAS NOT BEGUN. THE ISLAND IS ALREADY UNDER THE CONTROL OF THE HALLOW KING.",

            stage:
                1

        };

    }


    /* =====================================================
       VISUAL PROGRESSION
       ===================================================== */

    function updateVisualProgression(level) {

        if (!convergencePage) {

            return;

        }


        let visualState =
            "low";


        if (level >= 100) {

            visualState =
                "complete";

        }

        else if (level >= 75) {

            visualState =
                "collapse";

        }

        else if (level >= 50) {

            visualState =
                "breach";

        }

        else if (level >= 25) {

            visualState =
                "disturbance";

        }


        convergencePage.dataset.convergence =
            visualState;

    }


    /* =====================================================
       WORLD STATUS
       ===================================================== */

    function updateWorldStatus(level) {

        /*
         * Island stability:
         *
         * Starts at 15%.
         * Drops toward 0%.
         */

        const islandStability =
            Math.max(
                0,
                15 - (level * 0.15)
            );


        if (islandStabilityElement) {

            islandStabilityElement.textContent =
                "CRITICAL";

        }


        if (islandStabilityBarElement) {

            islandStabilityBarElement.style.width =
                `${islandStability}%`;

        }


        /*
         * Hallowed Realm influence:
         *
         * Starts at 80%.
         * Reaches 100%.
         */

        const realmInfluence =
            Math.min(
                100,
                80 + (level * 0.20)
            );


        if (realmInfluenceElement) {

            if (realmInfluence >= 95) {

                realmInfluenceElement.textContent =
                    "EXTREME";

            }

            else if (realmInfluence >= 90) {

                realmInfluenceElement.textContent =
                    "SEVERE";

            }

            else {

                realmInfluenceElement.textContent =
                    "HIGH";

            }

        }


        if (realmInfluenceBarElement) {

            realmInfluenceBarElement.style.width =
                `${realmInfluence}%`;

        }


        /*
         * Actual convergence.
         */

        if (realmConvergenceElement) {

            realmConvergenceElement.textContent =
                `${Math.round(level)}%`;

        }


        if (realmConvergenceBarElement) {

            realmConvergenceBarElement.style.width =
                `${level}%`;

        }

    }


    /* =====================================================
       STAGES
       ===================================================== */

    function updateStages(state) {

        if (!stages || stages.length === 0) {

            return;

        }


        stages.forEach(
            (stage, index) => {

                const stageNumber =
                    index + 1;


                stage.classList.remove(
                    "active"
                );


                const status =
                    stage.querySelector(
                        ".stage-heading span"
                    );


                if (
                    stageNumber <
                    state.stage
                ) {

                    if (status) {

                        status.textContent =
                            "COMPLETED";

                    }

                }

                else if (
                    stageNumber ===
                    state.stage
                ) {

                    stage.classList.add(
                        "active"
                    );


                    if (status) {

                        status.textContent =
                            "CURRENT";

                    }

                }

                else {

                    if (status) {

                        status.textContent =
                            "PENDING";

                    }

                }

            }
        );

    }


    /* =====================================================
       RANDOM GLITCHES
       ===================================================== */

    let lastGlitchLevel =
        -1;


    function updateGlitch(level) {

        if (!convergencePage) {

            return;

        }


        /*
         * No glitches below 50%.
         */

        if (level < 50) {

            return;

        }


        const currentLevel =
            Math.floor(level);


        /*
         * Only roll once per percentage.
         */

        if (
            currentLevel ===
            lastGlitchLevel
        ) {

            return;

        }


        lastGlitchLevel =
            currentLevel;


        let chance =
            0;


        if (level >= 75) {

            chance =
                0.08;

        }

        else if (level >= 50) {

            chance =
                0.035;

        }


        if (
            Math.random() <
            chance
        ) {

            convergencePage.classList.add(
                "convergence-glitch"
            );


            window.setTimeout(
                () => {

                    convergencePage.classList.remove(
                        "convergence-glitch"
                    );

                },
                250
            );

        }

    }


    /* =====================================================
       MAIN UPDATE
       ===================================================== */

    function updateConvergence() {

        const level =
            calculateConvergence();


        const state =
            getConvergenceState(
                level
            );


        /*
         * Update visual atmosphere.
         */

        updateVisualProgression(
            level
        );


        /*
         * Update glitch effects.
         */

        updateGlitch(
            level
        );


        /*
         * Main convergence display.
         */

        if (levelElement) {

            levelElement.textContent =
                Math.round(level);

        }


        if (stateElement) {

            stateElement.textContent =
                state.name;

        }


        if (descriptionElement) {

            descriptionElement.textContent =
                state.description;

        }


        if (fillElement) {

            fillElement.style.width =
                `${level}%`;

        }


        /*
         * Stage progression.
         */

        updateStages(
            state
        );


        /*
         * World status.
         */

        updateWorldStatus(
            level
        );

    }


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.getConvergenceLevel =
        function () {

            return calculateConvergence();

        };


    window.getConvergenceState =
        function () {

            const level =
                calculateConvergence();

            return getConvergenceState(
                level
            );

        };


    /* =====================================================
       INITIAL UPDATE
       ===================================================== */

    updateConvergence();


    /* =====================================================
       LIVE UPDATE
       ===================================================== */

    window.setInterval(
        updateConvergence,
        1000
    );


})();

/* =========================================================
   THE GAME 2026
   ISLAND EXPLORER — PHASE 3
   LOCATION SCANNER MINIGAME
   ========================================================= */

(function () {

    "use strict";

    /* =====================================================
       LOCATION DATA
       ===================================================== */

    const LOCATIONS = {

        cathedral: {
            id: "001",
            title: "CATHEDRAL",
            image: "cathedral.jpg",
            description:
                "The Cathedral is the prison where the Hallow King was once held. It remains one of the most important structures on the island.",
            note:
                "The altar is connected to the Hallowed Realm. The Cathedral remains a critical point in the island's recorded history."
        },

        volcano: {
            id: "002",
            title: "VOLCANO",
            image: "volcano.jpg",
            description:
                "The Volcano replaced the former Forest Beacon during Summer 2026 after the island's seal system was heavily damaged.",
            note:
                "The former Forest Beacon no longer exists in its original form. The Mountain Seal was also destroyed during the Summer events."
        },

        fountain: {
            id: "003",
            title: "FOUNTAIN",
            image: "fountain.jpg",
            description:
                "The Fountain has the strongest known connection between the island and the Hallowed Realm.",
            note:
                "The Fountain was the entry point used by the Killer Bunny during Easter 2026."
        },

        "crimson-forest": {
            id: "004",
            title: "CRIMSON FOREST",
            image: "crimson-forest.jpg",
            description:
                "The Crimson Forest became the territory of the Crimson Lord during Summer 2026.",
            note:
                "The Crimson Lord's presence in the forest played a major role in the destruction of the island's seal system."
        },

        "sealkeeper-tower": {
            id: "005",
            title: "SEALKEEPER TOWER",
            image: "sealkeeper-tower.jpg",
            description:
                "The Sealkeeper Tower is connected to the ancient Sealkeeper order and the final remaining Sealkeeper.",
            note:
                "Seven Sealkeepers were involved in the creation of the island's seal system roughly one hundred years ago. Only the last Sealkeeper remains."
        },

        "haunted-house": {
            id: "006",
            title: "HAUNTED HOUSE",
            image: "haunted-house.jpg",
            description:
                "The Haunted House was one of the locations investigated during Halloween 2026.",
            note:
                "Records surrounding the location remain incomplete. Further investigation may reveal information not currently available in the archive."
        },

        "sealkeeper-fortress": {
            id: "007",
            title: "THE FORTRESS OF THE SEALKEEPER",
            image: "location-07.jpg",
            description:
                "A fortified location associated with the last remaining Sealkeeper.",
            note:
                "The fortress is believed to have been used as a place of protection while the island's situation continued to deteriorate."
        }

    };


    /* =====================================================
       WAIT FOR PAGE
       ===================================================== */

    function initIslandExplorer() {

        const island =
            document.getElementById("island");

        if (!island) {
            return;
        }

        if (
            island.dataset.phase3Scanner === "active"
        ) {
            return;
        }

        island.dataset.phase3Scanner = "active";


        /* =================================================
           STORAGE
           ================================================= */

        const STORAGE_KEY =
            "thegame2026_island_discoveries_v2";

        let discovered = [];

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (saved) {

                const parsed =
                    JSON.parse(saved);

                if (Array.isArray(parsed)) {

                    discovered =
                        parsed.filter(function (id) {

                            return Object.prototype.hasOwnProperty.call(
                                LOCATIONS,
                                id
                            );

                        });

                }

            }

        } catch (error) {

            discovered = [];

        }


        function saveDiscoveries() {

            try {

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(discovered)
                );

            } catch (error) {

                console.warn(
                    "[Island Scanner] Could not save discoveries."
                );

            }

        }


        /* =================================================
           ADD SCANNER STYLES
           ================================================= */

        if (
            !document.getElementById(
                "island-scanner-styles"
            )
        ) {

            const style =
                document.createElement("style");

            style.id =
                "island-scanner-styles";

            style.textContent = `

                #island .island-scanner {
                    margin-top: 28px;
                    margin-bottom: 38px;
                    padding: 22px;
                    border: 1px solid var(--c-line-strong);
                    background: var(--c-panel);
                    border-radius: var(--r-sm);
                }

                #island .island-scanner-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                #island .island-scanner-header span {
                    display: block;
                    margin-bottom: 7px;
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: .16em;
                    color: var(--c-text-faint);
                }

                #island .island-scanner-header h2 {
                    margin: 0;
                    font-size: clamp(20px, 3vw, 32px);
                    letter-spacing: .04em;
                }

                #island .island-scanner-status {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: .12em;
                    color: var(--c-text-dim);
                    white-space: nowrap;
                }

                #island .island-scanner-console {
                    padding: 20px;
                    border: 1px solid var(--c-line);
                    background: var(--c-panel-2);
                    border-radius: var(--r-xs);
                }

                #island .island-scanner-message {
                    margin-bottom: 18px;
                    font-family: var(--font-mono);
                    font-size: 10px;
                    line-height: 1.7;
                    color: var(--c-text-dim);
                }

                #island .island-scanner-bar {
                    position: relative;
                    height: 34px;
                    overflow: hidden;
                    border: 1px solid var(--c-line-strong);
                    background: rgba(0,0,0,.28);
                    border-radius: var(--r-xs);
                }

                #island .island-scanner-target {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 18%;
                    background: rgba(255,255,255,.08);
                    border-left: 1px solid var(--c-white);
                    border-right: 1px solid var(--c-white);
                }

                #island .island-scanner-cursor {
                    position: absolute;
                    top: 2px;
                    bottom: 2px;
                    width: 3px;
                    background: var(--c-white);
                    box-shadow: 0 0 12px rgba(255,255,255,.55);
                    transform: translateX(0);
                }

                #island .island-scanner-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin-top: 16px;
                }

                #island .island-scanner-round {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: .12em;
                    color: var(--c-text-faint);
                }

                #island .island-scanner-button {
                    min-width: 170px;
                    padding: 11px 16px;
                    border: 1px solid var(--c-line-strong);
                    border-radius: var(--r-xs);
                    background: transparent;
                    color: var(--c-white);
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: .13em;
                    cursor: pointer;
                    transition:
                        background var(--t),
                        color var(--t),
                        border-color var(--t),
                        transform var(--t);
                }

                #island .island-scanner-button:hover:not(:disabled) {
                    background: var(--c-white);
                    color: #000;
                    border-color: var(--c-white);
                    transform: translateY(-1px);
                }

                #island .island-scanner-button:disabled {
                    opacity: .35;
                    cursor: default;
                }

                #island .island-scanner-result {
                    margin-top: 15px;
                    min-height: 18px;
                    font-family: var(--font-mono);
                    font-size: 9px;
                    letter-spacing: .09em;
                    color: var(--c-text-dim);
                }

                #island .island-scanner-result.success {
                    color: var(--c-white);
                }

                #island .island-scanner-result.failure {
                    color: var(--c-text-faint);
                }

                #island .island-location-hidden {
                    display: none !important;
                }

                #island .island-location-discovered {
                    display: block !important;
                }

                #island .island-discovery-badge {
                    display: inline-block;
                    margin-top: 8px;
                    padding: 4px 7px;
                    border: 1px solid var(--c-line);
                    border-radius: var(--r-xs);
                    font-family: var(--font-mono);
                    font-size: 7px;
                    letter-spacing: .12em;
                    color: var(--c-text-faint);
                }

                @media (max-width: 700px) {

                    #island .island-scanner {
                        padding: 15px;
                    }

                    #island .island-scanner-header {
                        display: block;
                    }

                    #island .island-scanner-status {
                        margin-top: 10px;
                    }

                    #island .island-scanner-controls {
                        display: block;
                    }

                    #island .island-scanner-button {
                        width: 100%;
                        margin-top: 12px;
                    }

                }

            `;

            document.head.appendChild(style);

        }


        /* =================================================
           FIND LOCATION GRID
           ================================================= */

        const grid =
            document.getElementById(
                "island-explorer-grid"
            );

        if (!grid) {
            console.warn(
                "[Island Scanner] Island grid not found."
            );
            return;
        }


        const cards =
            grid.querySelectorAll(
                ".island-explorer-location"
            );


        /* =================================================
           CREATE SCANNER
           ================================================= */

        const scanner =
            document.createElement("div");

        scanner.className =
            "island-scanner";

        scanner.innerHTML = `

            <div class="island-scanner-header">

                <div>
                    <span>FIELD EQUIPMENT / SIGNAL ANALYSIS</span>
                    <h2>ISLAND SCANNER</h2>
                </div>

                <div
                    class="island-scanner-status"
                    id="island-scanner-status"
                >
                    SYSTEM READY
                </div>

            </div>

            <div class="island-scanner-console">

                <div
                    class="island-scanner-message"
                    id="island-scanner-message"
                >
                    Scan the island for unknown locations.
                    Align the signal inside the target zone
                    to lock onto a location.
                </div>

                <div
                    class="island-scanner-bar"
                    id="island-scanner-bar"
                >

                    <div
                        class="island-scanner-target"
                        id="island-scanner-target"
                    ></div>

                    <div
                        class="island-scanner-cursor"
                        id="island-scanner-cursor"
                    ></div>

                </div>

                <div class="island-scanner-controls">

                    <span
                        class="island-scanner-round"
                        id="island-scanner-round"
                    >
                        SCAN OFFLINE
                    </span>

                    <button
                        type="button"
                        class="island-scanner-button"
                        id="island-scanner-button"
                    >
                        START SCAN
                    </button>

                </div>

                <div
                    class="island-scanner-result"
                    id="island-scanner-result"
                ></div>

            </div>

        `;


        const spots =
            island.querySelector(
                ".island-spots"
            );

        if (spots) {

            spots.parentNode.insertBefore(
                scanner,
                spots
            );

        } else {

            island.appendChild(
                scanner
            );

        }


        /* =================================================
           SCANNER ELEMENTS
           ================================================= */

        const scannerButton =
            document.getElementById(
                "island-scanner-button"
            );

        const scannerStatus =
            document.getElementById(
                "island-scanner-status"
            );

        const scannerMessage =
            document.getElementById(
                "island-scanner-message"
            );

        const scannerRound =
            document.getElementById(
                "island-scanner-round"
            );

        const scannerResult =
            document.getElementById(
                "island-scanner-result"
            );

        const scannerBar =
            document.getElementById(
                "island-scanner-bar"
            );

        const scannerTarget =
            document.getElementById(
                "island-scanner-target"
            );

        const scannerCursor =
            document.getElementById(
                "island-scanner-cursor"
            );


        /* =================================================
           UI COUNTERS
           ================================================= */

        const discoveredCount =
            document.getElementById(
                "island-discovered-count"
            );

        const explorerState =
            document.getElementById(
                "island-explorer-state"
            );


        /* =================================================
           RECORD ELEMENTS
           ================================================= */

        const record =
            document.getElementById(
                "island-location-record"
            );

        const closeButton =
            document.getElementById(
                "island-record-close"
            );

        const recordLabel =
            document.getElementById(
                "island-record-label"
            );

        const recordTitle =
            document.getElementById(
                "island-record-title"
            );

        const recordImage =
            document.getElementById(
                "island-record-image"
            );

        const recordStatus =
            document.getElementById(
                "island-record-status"
            );

        const recordDescription =
            document.getElementById(
                "island-record-description"
            );

        const recordNote =
            document.getElementById(
                "island-record-note"
            );

        const recordId =
            document.getElementById(
                "island-record-id"
            );


        /* =================================================
           UPDATE LOCATION CARDS
           ================================================= */

        function updateCards() {

            cards.forEach(function (card) {

                const id =
                    card.dataset.location;

                const found =
                    discovered.includes(id);

                if (found) {

                    card.classList.remove(
                        "island-location-hidden"
                    );

                    card.classList.add(
                        "island-location-discovered"
                    );

                    card.style.display = "";

                    if (
                        !card.querySelector(
                            ".island-discovery-badge"
                        )
                    ) {

                        const badge =
                            document.createElement("span");

                        badge.className =
                            "island-discovery-badge";

                        badge.textContent =
                            "LOCATION DISCOVERED";

                        const info =
                            card.querySelector(
                                ".island-spot-info"
                            );

                        if (info) {
                            info.appendChild(badge);
                        }

                    }

                } else {

                    card.classList.remove(
                        "island-location-discovered"
                    );

                    card.classList.add(
                        "island-location-hidden"
                    );

                    card.style.display =
                        "none";

                }

            });

        }


        /* =================================================
           UPDATE COUNTER
           ================================================= */

        function updateCounter() {

            if (discoveredCount) {

                discoveredCount.textContent =
                    `${discovered.length} / ${cards.length}`;

            }

            if (explorerState) {

                if (discovered.length === 0) {

                    explorerState.textContent =
                        "NO LOCATIONS DISCOVERED";

                } else if (
                    discovered.length >= cards.length
                ) {

                    explorerState.textContent =
                        "COMPLETE";

                } else {

                    explorerState.textContent =
                        "ACTIVE";

                }

            }

            if (discovered.length >= cards.length) {

                scannerStatus.textContent =
                    "ALL LOCATIONS MAPPED";

                scannerMessage.textContent =
                    "The island has been completely mapped. No unknown signals remain.";

                scannerButton.disabled = true;

                scannerButton.textContent =
                    "MAP COMPLETE";

            }

        }


        /* =================================================
           OPEN RECORD
           ================================================= */

        function openRecord(id) {

            const location =
                LOCATIONS[id];

            if (
                !location ||
                !record
            ) {
                return;
            }

            if (recordLabel) {

                recordLabel.textContent =
                    `LOCATION RECORD / ${location.id}`;

            }

            if (recordTitle) {

                recordTitle.textContent =
                    location.title;

            }

            if (recordImage) {

                recordImage.src =
                    location.image;

                recordImage.alt =
                    location.title;

            }

            if (recordStatus) {

                recordStatus.textContent =
                    "ARCHIVED";

            }

            if (recordDescription) {

                recordDescription.textContent =
                    location.description;

            }

            if (recordNote) {

                recordNote.textContent =
                    location.note;

            }

            if (recordId) {

                recordId.textContent =
                    location.id;

            }

            record.classList.add(
                "island-record-open"
            );

            record.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        /* =================================================
           CLOSE RECORD
           ================================================= */

        function closeRecord() {

            if (!record) {
                return;
            }

            record.classList.remove(
                "island-record-open"
            );

            record.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeRecord
            );

        }


        if (record) {

            record.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === record
                    ) {
                        closeRecord();
                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    record &&
                    record.classList.contains(
                        "island-record-open"
                    )
                ) {

                    closeRecord();

                }

            }
        );


        /* =================================================
           CARD CLICK EVENTS
           ================================================= */

        cards.forEach(function (card) {

            const button =
                card.querySelector(
                    ".island-location-button"
                );

            if (!button) {
                return;
            }

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const id =
                        card.dataset.location;

                    if (
                        discovered.includes(id)
                    ) {

                        openRecord(id);

                    }

                }
            );

        });


        /* =================================================
           SCANNER GAME
           ================================================= */

        let scanning = false;

        let animationFrame = null;

        let currentRound = 0;

        let successfulRounds = 0;

        let targetLeft = 0;

        let cursorPosition = 0;

        let cursorDirection = 1;

        const TOTAL_ROUNDS = 5;

        const REQUIRED_SUCCESSES = 3;


        function randomTarget() {

            targetLeft =
                8 +
                Math.random() * 74;

            scannerTarget.style.left =
                targetLeft + "%";

        }


        function resetScannerPosition() {

            cursorPosition = 0;

            cursorDirection = 1;

            scannerCursor.style.left =
                "0%";

        }


        function animateScanner() {

            if (!scanning) {
                return;
            }

            cursorPosition +=
                0.55 * cursorDirection;

            if (cursorPosition >= 98) {

                cursorPosition = 98;
                cursorDirection = -1;

            }

            if (cursorPosition <= 0) {

                cursorPosition = 0;
                cursorDirection = 1;

            }

            scannerCursor.style.left =
                cursorPosition + "%";

            animationFrame =
                requestAnimationFrame(
                    animateScanner
                );

        }


        function startRound() {

            currentRound++;

            randomTarget();

            resetScannerPosition();

            scannerRound.textContent =
                `ROUND ${currentRound} / ${TOTAL_ROUNDS} — LOCKS ${successfulRounds} / ${REQUIRED_SUCCESSES}`;

            scannerResult.textContent =
                "";

            scannerResult.className =
                "island-scanner-result";

            scannerButton.textContent =
                "ALIGN SIGNAL";

            scannerButton.disabled =
                false;

            scanning = true;

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame =
                requestAnimationFrame(
                    animateScanner
                );

        }


        function finishScan() {

            scanning = false;

            cancelAnimationFrame(
                animationFrame
            );

            scannerButton.disabled =
                true;

            scannerRound.textContent =
                "ANALYZING SIGNAL...";

            setTimeout(function () {

                if (
                    successfulRounds >=
                    REQUIRED_SUCCESSES
                ) {

                    discoverRandomLocation();

                } else {

                    scannerStatus.textContent =
                        "SIGNAL LOST";

                    scannerMessage.textContent =
                        "The signal could not be stabilized. Another scan is required.";

                    scannerResult.textContent =
                        `SCAN FAILED — ${successfulRounds}/${REQUIRED_SUCCESSES} LOCKS`;

                    scannerResult.className =
                        "island-scanner-result failure";

                    scannerButton.disabled =
                        false;

                    scannerButton.textContent =
                        "TRY AGAIN";

                    scannerRound.textContent =
                        "SCAN FAILED";

                }

            }, 700);

        }


        function alignSignal() {

            if (!scanning) {
                return;
            }

            scanning = false;

            cancelAnimationFrame(
                animationFrame
            );

            const targetStart =
                targetLeft;

            const targetEnd =
                targetLeft + 18;

            const hit =
                cursorPosition >= targetStart &&
                cursorPosition <= targetEnd;

            if (hit) {

                successfulRounds++;

                scannerResult.textContent =
                    "SIGNAL LOCKED";

                scannerResult.className =
                    "island-scanner-result success";

            } else {

                scannerResult.textContent =
                    "SIGNAL MISSED";

                scannerResult.className =
                    "island-scanner-result failure";

            }

            if (
                currentRound >= TOTAL_ROUNDS
            ) {

                finishScan();

            } else {

                scannerButton.disabled =
                    true;

                setTimeout(function () {

                    startRound();

                }, 650);

            }

        }


        /* =================================================
           DISCOVER RANDOM LOCATION
           ================================================= */

        function discoverRandomLocation() {

            const undiscovered =
                Object.keys(LOCATIONS)
                    .filter(function (id) {

                        return !discovered.includes(id);

                    });

            if (
                undiscovered.length === 0
            ) {

                updateCounter();

                return;

            }

            const id =
                undiscovered[
                    Math.floor(
                        Math.random() *
                        undiscovered.length
                    )
                ];

            discovered.push(id);

            saveDiscoveries();

            updateCards();

            updateCounter();

            const location =
                LOCATIONS[id];

            scannerStatus.textContent =
                "LOCATION FOUND";

            scannerMessage.textContent =
                `Unknown structure detected. Location ${location.id} has been added to the archive.`;

            scannerResult.textContent =
                `DISCOVERED — ${location.title}`;

            scannerResult.className =
                "island-scanner-result success";

            scannerRound.textContent =
                `LOCATION ${location.id} RECOVERED`;

            scannerButton.disabled =
                discovered.length >= cards.length;

            scannerButton.textContent =
                discovered.length >= cards.length
                    ? "MAP COMPLETE"
                    : "SCAN AGAIN";

            /* Scroll newly discovered card into view */

            const newCard =
                grid.querySelector(
                    `[data-location="${id}"]`
                );

            if (newCard) {

                setTimeout(function () {

                    newCard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 400);

            }

        }


        /* =================================================
           START SCAN
           ================================================= */

        scannerButton.addEventListener(
            "click",
            function () {

                if (scanning) {

                    alignSignal();

                    return;

                }

                if (
                    discovered.length >=
                    cards.length
                ) {

                    return;

                }

                currentRound = 0;

                successfulRounds = 0;

                scannerStatus.textContent =
                    "SCANNING ISLAND";

                scannerMessage.textContent =
                    "Signal detected. Align the moving marker with the highlighted zone.";

                scannerButton.disabled =
                    false;

                startRound();

            }
        );


        /* =================================================
           KEYBOARD SUPPORT
           ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.code !== "Space"
                ) {
                    return;
                }

                if (!scanning) {
                    return;
                }

                event.preventDefault();

                alignSignal();

            }
        );


        /* =================================================
           INITIAL STATE
           ================================================= */

        updateCards();

        updateCounter();

        scannerStatus.textContent =
            discovered.length === cards.length
                ? "ALL LOCATIONS MAPPED"
                : "SYSTEM READY";

        console.log(
            "[Island Scanner] Phase 3 location scanner active."
        );

    }


    /* =====================================================
       INITIALIZE SAFELY
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initIslandExplorer,
            { once: true }
        );

    } else {

        initIslandExplorer();

    }

})();

/* =========================================================
   THE GAME 2026
   PHASE 7 — THE SEALED ARCHIVE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
       ===================================================== */

    const STORAGE_KEY =
        "thegame2026_phase7_secret_v3";

    const SECRET_CODE =
        "071904";


    /* =====================================================
       STATE
       ===================================================== */

    let state = {
        unlocked: false,
        recordsOpened: []
    };


    try {

        const saved =
            JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            );

        if (saved) {

            state = {
                ...state,
                ...saved
            };

        }

    } catch (error) {

        console.warn(
            "Phase 7 data could not be loaded."
        );

    }


    function saveState() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

        } catch (error) {

            console.warn(
                "Phase 7 data could not be saved."
            );

        }

    }


    /* =====================================================
       SECRET ARCHIVE RECORDS
       ===================================================== */

    const records = [

        {
            id: "001",

            title: "THE SEALKEEPERS",

            status: "CONFIRMED",

            text:
                "Seven Sealkeepers gathered on the island to perform an ancient spell designed to contain the Hallow King. They were not simply guarding an existing system; they were the ones who created it. The success of the ritual depended on all of them completing the casting together.",

            note:
                "The original identities of the Sealkeepers have been lost from the surviving records. Their role in the creation of the seal system is confirmed."
        },


        {
            id: "002",

            title: "THE CASTING",

            status: "ARCHIVED",

            text:
                "The ritual began with the seven Sealkeepers positioned around the place where the prison would be formed. As the spell progressed, the island itself began to change around them. The structure that would become the Cathedral was created during the casting rather than constructed beforehand.",

            note:
                "The Cathedral and the seal system are believed to have been created as part of the same spell."
        },


        {
            id: "003",

            title: "THE ATTACK",

            status: "CRITICAL",

            text:
                "The Hallow King discovered what the Sealkeepers were attempting and attacked before the spell could be completed. The attack broke the formation and killed six of the seven Sealkeepers. The final Sealkeeper remained at the ritual site and continued the casting despite the attack.",

            note:
                "This is the last surviving account describing the Sealkeepers during the original casting."
        },


        {
            id: "004",

            title: "THE FINAL WORD",

            status: "CONFIRMED",

            text:
                "With the other Sealkeepers dead, the final Sealkeeper continued the spell alone. The ritual had already reached its final stage, but it still required the last part of the casting to be completed. He finished the spell, sealing the Hallow King within the newly formed Cathedral.",

            note:
                "The completion of the spell is the reason the final Sealkeeper survived in the surviving historical record."
        },


        {
            id: "005",

            title: "THE CATHEDRAL",

            status: "SEALED",

            text:
                "The Cathedral was not built as an ordinary structure. It emerged as the spell was completed, becoming the prison that held the Hallow King. The seals formed around the Cathedral as part of the same magic that created it, binding the prison to the island.",

            note:
                "The Cathedral should therefore be understood as part of the original sealing ritual itself."
        },


        {
            id: "006",

            title: "THE LAST SEALKEEPER",

            status: "RESTRICTED",

            text:
                "Only one Sealkeeper survived the casting. He was the one who completed the spell after the Hallow King killed the others. From that point onward, he became known as the Last Sealkeeper, carrying the responsibility of guarding the prison and preserving the knowledge of what had happened.",

            note:
                "The title 'Last Sealkeeper' refers to the survivor of the original casting, not to a separate order created afterward."
        }

    ];


    /* =====================================================
       STYLES
       ===================================================== */

    function addStyles() {

        if (
            document.getElementById(
                "phase7-secret-style"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "phase7-secret-style";


        style.textContent = `

        /* =================================================
           HIDDEN REFERENCE
           ================================================= */

        #phase7-secret-code {

            position: fixed;

            left: 14px;

            bottom: 10px;

            z-index: 9990;

            font-family:
                "Courier New",
                monospace;

            font-size: 8px;

            letter-spacing: 1.5px;

            color:
                rgba(255,255,255,.17);

            cursor: pointer;

            user-select: none;

            transition:
                color .2s ease;

        }


        #phase7-secret-code:hover {

            color:
                rgba(255,255,255,.48);

        }


        /* =================================================
           ACCESS OVERLAY
           ================================================= */

        #phase7-access {

            position: fixed;

            inset: 0;

            z-index: 100000;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(0,0,0,.88);

            backdrop-filter:
                blur(7px);

        }


        #phase7-access.active {

            display: flex;

        }


        .phase7-access-box {

            width:
                min(430px, 100%);

            background:
                #080a0d;

            border:
                1px solid rgba(255,255,255,.14);

            padding:
                30px;

            box-shadow:
                0 25px 80px rgba(0,0,0,.7);

            font-family:
                "Courier New",
                monospace;

        }


        .phase7-access-top {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                center;

            margin-bottom:
                25px;

            font-size:
                8px;

            letter-spacing:
                2px;

            color:
                rgba(255,255,255,.25);

        }


        .phase7-access-title {

            margin:
                0 0 10px;

            font-size:
                25px;

            letter-spacing:
                4px;

            color:
                white;

        }


        .phase7-access-text {

            margin:
                0 0 24px;

            font-size:
                10px;

            line-height:
                1.8;

            color:
                rgba(255,255,255,.4);

        }


        .phase7-access-input-row {

            display:
                flex;

            gap:
                8px;

        }


        #phase7-input {

            flex:
                1;

            min-width:
                0;

            background:
                rgba(255,255,255,.035);

            border:
                1px solid rgba(255,255,255,.14);

            outline:
                none;

            color:
                white;

            padding:
                12px;

            font-family:
                "Courier New",
                monospace;

            font-size:
                12px;

            letter-spacing:
                3px;

        }


        #phase7-input:focus {

            border-color:
                rgba(255,255,255,.35);

        }


        #phase7-submit {

            background:
                rgba(255,255,255,.06);

            border:
                1px solid rgba(255,255,255,.14);

            color:
                white;

            padding:
                0 15px;

            cursor:
                pointer;

            font-family:
                "Courier New",
                monospace;

            font-size:
                8px;

            letter-spacing:
                1px;

        }


        #phase7-submit:hover {

            background:
                rgba(255,255,255,.12);

        }


        #phase7-access-status {

            min-height:
                16px;

            margin-top:
                12px;

            font-size:
                8px;

            letter-spacing:
                1.5px;

            color:
                rgba(255,255,255,.3);

        }


        .phase7-close-access {

            margin-top:
                22px;

            padding:
                0;

            border:
                none;

            background:
                none;

            color:
                rgba(255,255,255,.25);

            cursor:
                pointer;

            font-family:
                "Courier New",
                monospace;

            font-size:
                8px;

            letter-spacing:
                1px;

        }


        .phase7-close-access:hover {

            color:
                white;

        }


        /* =================================================
           SECRET ARCHIVE
           ================================================= */

        #phase7-archive {

            position:
                fixed;

            inset:
                0;

            z-index:
                100001;

            display:
                none;

            overflow-y:
                auto;

            background:
                #06080b;

            color:
                white;

            font-family:
                "Courier New",
                monospace;

        }


        #phase7-archive.active {

            display:
                block;

        }


        .phase7-inner {

            width:
                min(950px, calc(100% - 35px));

            margin:
                0 auto;

            padding:
                50px 0 70px;

        }


        /* =================================================
           HEADER
           ================================================= */

        .phase7-header {

            border-bottom:
                1px solid rgba(255,255,255,.1);

            padding-bottom:
                25px;

            margin-bottom:
                25px;

        }


        .phase7-header-top {

            display:
                flex;

            justify-content:
                space-between;

            flex-wrap:
                wrap;

            gap:
                10px;

            font-size:
                8px;

            letter-spacing:
                2px;

            color:
                rgba(255,255,255,.25);

        }


        .phase7-title {

            margin:
                20px 0 8px;

            font-size:
                clamp(32px, 7vw, 65px);

            letter-spacing:
                7px;

            line-height:
                1;

        }


        .phase7-subtitle {

            font-size:
                10px;

            letter-spacing:
                1px;

            color:
                rgba(255,255,255,.35);

        }


        /* =================================================
           SEALKEEPER OVERVIEW
           ================================================= */

        .phase7-sealkeeper-panel {

            border:
                1px solid rgba(255,255,255,.08);

            padding:
                24px;

            margin-bottom:
                25px;

            background:
                rgba(255,255,255,.018);

        }


        .phase7-panel-label {

            font-size:
                8px;

            letter-spacing:
                2px;

            color:
                rgba(255,255,255,.25);

            margin-bottom:
                18px;

        }


        .phase7-sealkeeper-line {

            display:
                flex;

            align-items:
                center;

            gap:
                9px;

            flex-wrap:
                wrap;

        }


        .phase7-seal {

            width:
                40px;

            height:
                40px;

            border:
                1px solid rgba(255,255,255,.17);

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            font-size:
                9px;

            color:
                rgba(255,255,255,.55);

        }


        .phase7-seal.active {

            border-color:
                rgba(255,255,255,.42);

            color:
                white;

        }


        .phase7-sealkeeper-note {

            margin-top:
                18px;

            font-size:
                9px;

            line-height:
                1.9;

            color:
                rgba(255,255,255,.38);

        }


        /* =================================================
           RECORD GRID
           ================================================= */

        .phase7-records {

            display:
                grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap:
                12px;

        }


        .phase7-record {

            position:
                relative;

            min-height:
                230px;

            padding:
                22px;

            border:
                1px solid rgba(255,255,255,.08);

            background:
                rgba(255,255,255,.018);

            cursor:
                pointer;

            transition:
                border-color .2s ease,
                background .2s ease,
                transform .2s ease;

        }


        .phase7-record:hover {

            border-color:
                rgba(255,255,255,.25);

            background:
                rgba(255,255,255,.035);

            transform:
                translateY(-2px);

        }


        .phase7-record-number {

            font-size:
                8px;

            letter-spacing:
                2px;

            color:
                rgba(255,255,255,.22);

            margin-bottom:
                24px;

        }


        .phase7-record-status {

            position:
                absolute;

            top:
                22px;

            right:
                22px;

            font-size:
                7px;

            letter-spacing:
                1px;

            color:
                rgba(255,255,255,.22);

        }


        .phase7-record-title {

            font-size:
                13px;

            letter-spacing:
                2px;

            margin-bottom:
                16px;

        }


        .phase7-record-text {

            font-size:
                10px;

            line-height:
                1.85;

            color:
                rgba(255,255,255,.42);

            padding-bottom:
                25px;

        }


        .phase7-record-open {

            position:
                absolute;

            left:
                22px;

            bottom:
                18px;

            font-size:
                7px;

            letter-spacing:
                1.5px;

            color:
                rgba(255,255,255,.2);

        }


        /* =================================================
           RECORD VIEWER
           ================================================= */

        #phase7-record-view {

            position:
                fixed;

            inset:
                0;

            z-index:
                100002;

            display:
                none;

            align-items:
                center;

            justify-content:
                center;

            padding:
                20px;

            background:
                rgba(0,0,0,.91);

        }


        #phase7-record-view.active {

            display:
                flex;

        }


        .phase7-record-window {

            width:
                min(680px, 100%);

            max-height:
                calc(100vh - 40px);

            overflow-y:
                auto;

            background:
                #080a0d;

            border:
                1px solid rgba(255,255,255,.14);

            padding:
                32px;

        }


        .phase7-view-top {

            display:
                flex;

            justify-content:
                space-between;

            gap:
                15px;

            font-size:
                8px;

            letter-spacing:
                2px;

            color:
                rgba(255,255,255,.25);

            margin-bottom:
                28px;

        }


        .phase7-view-title {

            margin:
                0 0 28px;

            font-size:
                28px;

            letter-spacing:
                4px;

        }


        .phase7-view-main {

            border-left:
                1px solid rgba(255,255,255,.18);

            padding-left:
                20px;

            font-size:
                12px;

            line-height:
                2;

            color:
                rgba(255,255,255,.68);

        }


        .phase7-view-note {

            margin-top:
                30px;

            padding-top:
                20px;

            border-top:
                1px solid rgba(255,255,255,.08);

            font-size:
                9px;

            line-height:
                1.8;

            color:
                rgba(255,255,255,.3);

        }


        .phase7-view-close {

            margin-top:
                28px;

            border:
                1px solid rgba(255,255,255,.12);

            background:
                transparent;

            color:
                rgba(255,255,255,.4);

            padding:
                10px 14px;

            cursor:
                pointer;

            font-family:
                "Courier New",
                monospace;

            font-size:
                8px;

            letter-spacing:
                1px;

        }


        .phase7-view-close:hover {

            color:
                white;

        }


        /* =================================================
           MOBILE
           ================================================= */

        @media (max-width: 650px) {

            .phase7-records {

                grid-template-columns:
                    1fr;

            }


            .phase7-access-input-row {

                flex-direction:
                    column;

            }


            #phase7-submit {

                min-height:
                    40px;

            }


            .phase7-sealkeeper-line {

                justify-content:
                    center;

            }


            .phase7-record {

                min-height:
                    250px;

            }

        }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       CREATE HIDDEN REFERENCE
       ===================================================== */

    function createHiddenCode() {

        if (
            document.getElementById(
                "phase7-secret-code"
            )
        ) {
            return;
        }


        const code =
            document.createElement(
                "div"
            );


        code.id =
            "phase7-secret-code";


        code.textContent =
            "REF // 07-19-04";


        code.title =
            "reference";


        document.body.appendChild(
            code
        );


        code.addEventListener(
            "click",
            openAccess
        );

    }


    /* =====================================================
       ACCESS WINDOW
       ===================================================== */

    function createAccessWindow() {

        if (
            document.getElementById(
                "phase7-access"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "phase7-access";


        overlay.innerHTML = `

            <div
                class="phase7-access-box">


                <div
                    class="phase7-access-top">

                    <span>
                        UNREGISTERED NODE
                    </span>

                    <span>
                        07
                    </span>

                </div>


                <h2
                    class="phase7-access-title">

                    SEALED RECORD

                </h2>


                <p
                    class="phase7-access-text">

                    This reference is not present
                    in the public archive.
                    <br><br>
                    Enter the recovered reference.

                </p>


                <div
                    class="phase7-access-input-row">


                    <input
                        id="phase7-input"
                        type="text"
                        maxlength="12"
                        autocomplete="off"
                        spellcheck="false"
                        placeholder="REFERENCE"
                    >


                    <button
                        id="phase7-submit"
                        type="button">

                        VERIFY

                    </button>


                </div>


                <div
                    id="phase7-access-status">
                </div>


                <button
                    id="phase7-close-access"
                    class="phase7-close-access"
                    type="button">

                    CLOSE

                </button>


            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "phase7-submit"
            )
            .addEventListener(
                "click",
                verifyCode
            );


        document
            .getElementById(
                "phase7-input"
            )
            .addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        verifyCode();

                    }

                }
            );


        document
            .getElementById(
                "phase7-close-access"
            )
            .addEventListener(
                "click",
                closeAccess
            );


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    closeAccess();

                }

            }
        );

    }


    function openAccess() {

        createAccessWindow();


        const overlay =
            document.getElementById(
                "phase7-access"
            );


        overlay.classList.add(
            "active"
        );


        const input =
            document.getElementById(
                "phase7-input"
            );


        const status =
            document.getElementById(
                "phase7-access-status"
            );


        input.value =
            "";

        status.textContent =
            "";


        setTimeout(
            function () {

                input.focus();

            },
            50
        );

    }


    function closeAccess() {

        const overlay =
            document.getElementById(
                "phase7-access"
            );


        if (!overlay) {
            return;
        }


        overlay.classList.remove(
            "active"
        );

    }


    /* =====================================================
       VERIFY CODE
       ===================================================== */

    function verifyCode() {

        const input =
            document.getElementById(
                "phase7-input"
            );


        const status =
            document.getElementById(
                "phase7-access-status"
            );


        const entered =
            input.value
                .replace(
                    /[^0-9]/g,
                    ""
                );


        if (
            entered === SECRET_CODE
        ) {

            state.unlocked =
                true;


            saveState();


            status.textContent =
                "ACCESS GRANTED";


            setTimeout(
                function () {

                    closeAccess();

                    openArchive();

                },
                550
            );


        } else {

            status.textContent =
                "REFERENCE NOT RECOGNIZED";


            input.value =
                "";

            input.focus();

        }

    }


    /* =====================================================
       CREATE ARCHIVE
       ===================================================== */

    function createArchive() {

        if (
            document.getElementById(
                "phase7-archive"
            )
        ) {
            return;
        }


        const archive =
            document.createElement(
                "div"
            );


        archive.id =
            "phase7-archive";


        archive.innerHTML = `

            <div
                class="phase7-inner">


                <!-- =====================================
                     HEADER
                     ===================================== -->

                <header
                    class="phase7-header">


                    <div
                        class="phase7-header-top">

                        <span>
                            ARCHIVE / UNREGISTERED
                        </span>


                        <span>
                            RECORD 07-19-04
                        </span>

                    </div>


                    <h1
                        class="phase7-title">

                        THE SEALED FILE

                    </h1>


                    <div
                        class="phase7-subtitle">

                        RECOVERED HISTORICAL RECORDS.

                    </div>


                </header>


                <!-- =====================================
                     SEALKEEPERS
                     ===================================== -->

                <section
                    class="phase7-sealkeeper-panel">


                    <div
                        class="phase7-panel-label">

                        THE SEALKEEPERS

                    </div>


                    <div
                        class="phase7-sealkeeper-line">


                        <div
                            class="phase7-seal active">
                            01
                        </div>


                        <div
                            class="phase7-seal active">
                            02
                        </div>


                        <div
                            class="phase7-seal active">
                            03
                        </div>


                        <div
                            class="phase7-seal active">
                            04
                        </div>


                        <div
                            class="phase7-seal active">
                            05
                        </div>


                        <div
                            class="phase7-seal active">
                            06
                        </div>


                        <div
                            class="phase7-seal active">
                            07
                        </div>


                    </div>


                    <div
                        class="phase7-sealkeeper-note">

                        SEVEN SEALKEEPERS PERFORMED
                        THE ORIGINAL CASTING.
                        THE HALLOW KING ATTACKED
                        DURING THE RITUAL.
                        SIX WERE KILLED.
                        ONE FINISHED THE SPELL.

                    </div>


                </section>


                <!-- =====================================
                     RECORDS
                     ===================================== -->

                <section
                    class="phase7-records"
                    id="phase7-records">

                </section>


                <!-- =====================================
                     FOOTER
                     ===================================== -->

                <footer
                    style="
                        margin-top:45px;
                        padding-top:20px;
                        border-top:1px solid rgba(255,255,255,.08);
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:15px;
                        flex-wrap:wrap;
                    ">


                    <span
                        style="
                            font-size:8px;
                            letter-spacing:1.5px;
                            color:rgba(255,255,255,.2);
                        ">

                        RECORD STATUS //
                        PARTIALLY RECOVERED

                    </span>


                    <button
                        id="phase7-close-archive"
                        type="button"
                        style="
                            border:1px solid rgba(255,255,255,.12);
                            background:transparent;
                            color:rgba(255,255,255,.4);
                            padding:10px 14px;
                            cursor:pointer;
                            font-family:'Courier New',monospace;
                            font-size:8px;
                            letter-spacing:1px;
                        ">

                        CLOSE FILE

                    </button>


                </footer>


            </div>

        `;


        document.body.appendChild(
            archive
        );


        document
            .getElementById(
                "phase7-close-archive"
            )
            .addEventListener(
                "click",
                closeArchive
            );


        renderRecords();

    }


    /* =====================================================
       RENDER RECORDS
       ===================================================== */

    function renderRecords() {

        const container =
            document.getElementById(
                "phase7-records"
            );


        if (!container) {
            return;
        }


        container.innerHTML =
            "";


        records.forEach(
            function (record) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "phase7-record";


                card.innerHTML = `

                    <div
                        class="phase7-record-number">

                        RECORD ${record.id}

                    </div>


                    <div
                        class="phase7-record-status">

                        ${record.status}

                    </div>


                    <div
                        class="phase7-record-title">

                        ${record.title}

                    </div>


                    <div
                        class="phase7-record-text">

                        ${record.text}

                    </div>


                    <div
                        class="phase7-record-open">

                        OPEN RECORD →

                    </div>

                `;


                card.addEventListener(
                    "click",
                    function () {

                        openRecord(
                            record
                        );

                    }
                );


                container.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       RECORD VIEWER
       ===================================================== */

    function createRecordViewer() {

        if (
            document.getElementById(
                "phase7-record-view"
            )
        ) {
            return;
        }


        const viewer =
            document.createElement(
                "div"
            );


        viewer.id =
            "phase7-record-view";


        viewer.innerHTML = `

            <div
                class="phase7-record-window">


                <div
                    class="phase7-view-top">

                    <span
                        id="phase7-view-number">
                    </span>


                    <span
                        id="phase7-view-status">
                    </span>

                </div>


                <h2
                    class="phase7-view-title"
                    id="phase7-view-title">
                </h2>


                <div
                    class="phase7-view-main"
                    id="phase7-view-main">
                </div>


                <div
                    class="phase7-view-note"
                    id="phase7-view-note">
                </div>


                <button
                    class="phase7-view-close"
                    id="phase7-view-close"
                    type="button">

                    RETURN

                </button>


            </div>

        `;


        document.body.appendChild(
            viewer
        );


        document
            .getElementById(
                "phase7-view-close"
            )
            .addEventListener(
                "click",
                closeRecord
            );


        viewer.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === viewer
                ) {

                    closeRecord();

                }

            }
        );

    }


    function openRecord(
        record
    ) {

        createRecordViewer();


        const viewer =
            document.getElementById(
                "phase7-record-view"
            );


        document
            .getElementById(
                "phase7-view-number"
            )
            .textContent =
            "RECORD " +
            record.id;


        document
            .getElementById(
                "phase7-view-status"
            )
            .textContent =
            record.status;


        document
            .getElementById(
                "phase7-view-title"
            )
            .textContent =
            record.title;


        document
            .getElementById(
                "phase7-view-main"
            )
            .textContent =
            record.text;


        document
            .getElementById(
                "phase7-view-note"
            )
            .textContent =
            "ARCHIVE NOTE // " +
            record.note;


        viewer.classList.add(
            "active"
        );


        if (
            !state.recordsOpened.includes(
                record.id
            )
        ) {

            state.recordsOpened.push(
                record.id
            );

            saveState();

        }

    }


    function closeRecord() {

        const viewer =
            document.getElementById(
                "phase7-record-view"
            );


        if (!viewer) {
            return;
        }


        viewer.classList.remove(
            "active"
        );

    }


    /* =====================================================
       ARCHIVE OPEN / CLOSE
       ===================================================== */

    function openArchive() {

        if (!state.unlocked) {

            openAccess();

            return;

        }


        createArchive();


        document
            .getElementById(
                "phase7-archive"
            )
            .classList.add(
                "active"
            );


        document.body.style.overflow =
            "hidden";

    }


    function closeArchive() {

        const archive =
            document.getElementById(
                "phase7-archive"
            );


        if (!archive) {
            return;
        }


        archive.classList.remove(
            "active"
        );


        closeRecord();


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAccess();

                closeRecord();

                closeArchive();

            }

        }
    );


    /* =====================================================
       DEBUG API
       ===================================================== */

    window.TheGamePhase7 = {

        open:
            openArchive,

        access:
            openAccess,

        reset:
            function () {

                localStorage.removeItem(
                    STORAGE_KEY
                );

                location.reload();

            },

        state:
            function () {

                return {
                    ...state
                };

            }

    };


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initPhase7() {

        if (
            document.documentElement
                .dataset
                .phase7SecretInitialized ===
            "true"
        ) {
            return;
        }


        document.documentElement
            .dataset
            .phase7SecretInitialized =
            "true";


        addStyles();

        createHiddenCode();

        createAccessWindow();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPhase7
        );

    } else {

        initPhase7();

    }

})();

/* =========================================================
   THE GAME 2026
   PHASE 8 — UI GLITCH SYSTEM
   REDUCED-FLASH / ACCESSIBILITY VERSION
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
       ===================================================== */

    const GLITCH_INTERVAL = 30000;
    const GLITCH_DURATION = 1000;


    /* =====================================================
       STYLE
       ===================================================== */

    function injectStyles() {

        if (document.getElementById("phase8-glitch-style")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "phase8-glitch-style";

        style.textContent = `

        /* =================================================
           GLITCH OVERLAY
           ================================================= */

        #phase8-glitch-overlay {

            position: fixed;
            inset: 0;

            z-index: 999999;

            pointer-events: none;

            opacity: 0;

            overflow: hidden;

        }


        #phase8-glitch-overlay.active {

            opacity: 1;

        }


        /* =================================================
           DARK INTERFERENCE
           ================================================= */

        #phase8-interference {

            position: absolute;
            inset: 0;

            background:
                repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 6px,
                    rgba(255,255,255,.025) 7px,
                    transparent 9px
                );

            opacity: .75;

        }


        /* =================================================
           HORIZONTAL TEARS
           ================================================= */

        .phase8-tear {

            position: absolute;

            left: -10%;

            width: 120%;

            height: 14px;

            background:
                rgba(255,255,255,.08);

            transform: translateX(0);

        }


        .phase8-tear:nth-child(1) {
            top: 17%;
        }

        .phase8-tear:nth-child(2) {
            top: 34%;
        }

        .phase8-tear:nth-child(3) {
            top: 57%;
        }

        .phase8-tear:nth-child(4) {
            top: 76%;
        }


        /* =================================================
           DISTORTION BLOCKS
           ================================================= */

        .phase8-block {

            position: absolute;

            background:
                rgba(255,255,255,.06);

            border-top:
                1px solid rgba(255,255,255,.12);

            border-bottom:
                1px solid rgba(255,255,255,.08);

        }


        /* =================================================
           ERROR MESSAGE
           ================================================= */

        #phase8-error {

            position: absolute;

            left: 50%;
            top: 50%;

            transform:
                translate(-50%, -50%);

            font-family:
                "Courier New",
                monospace;

            font-size:
                clamp(13px, 2vw, 22px);

            font-weight:
                bold;

            letter-spacing:
                5px;

            color:
                rgba(255,255,255,.72);

            text-align:
                center;

            white-space:
                nowrap;

            opacity: .85;

            text-shadow:
                2px 0 rgba(255,255,255,.15),
                -2px 0 rgba(255,255,255,.10);

        }


        #phase8-error small {

            display: block;

            margin-top: 12px;

            font-size: 8px;

            letter-spacing: 3px;

            font-weight: normal;

            color:
                rgba(255,255,255,.4);

        }


        /* =================================================
           GLITCH MOTION
           ================================================= */

        #phase8-glitch-overlay.active
        .phase8-tear:nth-child(1) {

            animation:
                phase8TearOne
                900ms
                ease-out;

        }


        #phase8-glitch-overlay.active
        .phase8-tear:nth-child(2) {

            animation:
                phase8TearTwo
                900ms
                ease-out;

        }


        #phase8-glitch-overlay.active
        .phase8-tear:nth-child(3) {

            animation:
                phase8TearThree
                900ms
                ease-out;

        }


        #phase8-glitch-overlay.active
        .phase8-tear:nth-child(4) {

            animation:
                phase8TearFour
                900ms
                ease-out;

        }


        @keyframes phase8TearOne {

            0% {
                transform: translateX(0);
            }

            18% {
                transform: translateX(-70px);
            }

            32% {
                transform: translateX(45px);
            }

            48% {
                transform: translateX(-25px);
            }

            70% {
                transform: translateX(15px);
            }

            100% {
                transform: translateX(0);
            }

        }


        @keyframes phase8TearTwo {

            0% {
                transform: translateX(0);
            }

            22% {
                transform: translateX(55px);
            }

            38% {
                transform: translateX(-60px);
            }

            57% {
                transform: translateX(30px);
            }

            78% {
                transform: translateX(-12px);
            }

            100% {
                transform: translateX(0);
            }

        }


        @keyframes phase8TearThree {

            0% {
                transform: translateX(0);
            }

            15% {
                transform: translateX(-45px);
            }

            35% {
                transform: translateX(65px);
            }

            55% {
                transform: translateX(-35px);
            }

            75% {
                transform: translateX(18px);
            }

            100% {
                transform: translateX(0);
            }

        }


        @keyframes phase8TearFour {

            0% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(60px);
            }

            42% {
                transform: translateX(-45px);
            }

            64% {
                transform: translateX(25px);
            }

            82% {
                transform: translateX(-10px);
            }

            100% {
                transform: translateX(0);
            }

        }


        /* =================================================
           ERROR MOTION
           ================================================= */

        #phase8-glitch-overlay.active
        #phase8-error {

            animation:
                phase8Error
                900ms
                ease-out;

        }


        @keyframes phase8Error {

            0% {
                opacity: .2;
                transform:
                    translate(-50%, -50%)
                    translateX(0);
            }

            20% {
                opacity: .85;
                transform:
                    translate(-50%, -50%)
                    translateX(-8px);
            }

            40% {
                opacity: .7;
                transform:
                    translate(-50%, -50%)
                    translateX(10px);
            }

            60% {
                opacity: .8;
                transform:
                    translate(-50%, -50%)
                    translateX(-5px);
            }

            80% {
                opacity: .65;
                transform:
                    translate(-50%, -50%)
                    translateX(3px);
            }

            100% {
                opacity: .85;
                transform:
                    translate(-50%, -50%)
                    translateX(0);
            }

        }


        /* =================================================
           SCREEN MOVEMENT
           ================================================= */

        body.phase8-distorted {

            animation:
                phase8Body
                900ms
                ease-out;

        }


        @keyframes phase8Body {

            0% {
                transform: translateX(0);
            }

            18% {
                transform: translateX(-5px);
            }

            32% {
                transform: translateX(6px);
            }

            47% {
                transform: translateX(-4px);
            }

            65% {
                transform: translateX(3px);
            }

            82% {
                transform: translateX(-2px);
            }

            100% {
                transform: translateX(0);
            }

        }


        /* =================================================
           TEXT GLITCH
           ================================================= */

        .phase8-corrupted-text {

            animation:
                phase8Text
                800ms
                ease-out;

        }


        @keyframes phase8Text {

            0% {
                opacity: 1;
                transform: translateX(0);
            }

            25% {
                opacity: .45;
                transform: translateX(-4px);
            }

            50% {
                opacity: .8;
                transform: translateX(5px);
            }

            75% {
                opacity: .55;
                transform: translateX(-3px);
            }

            100% {
                opacity: 1;
                transform: translateX(0);
            }

        }


        /* =================================================
           REDUCED MOTION SUPPORT
           ================================================= */

        @media (prefers-reduced-motion: reduce) {

            #phase8-glitch-overlay,
            #phase8-glitch-overlay * {

                animation: none !important;

            }

            #phase8-glitch-overlay {

                display: none !important;

            }

            body.phase8-distorted {

                animation: none !important;

            }

        }

        `;

        document.head.appendChild(style);

    }


    /* =====================================================
       CREATE OVERLAY
       ===================================================== */

    function createOverlay() {

        if (
            document.getElementById(
                "phase8-glitch-overlay"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement("div");


        overlay.id =
            "phase8-glitch-overlay";


        overlay.innerHTML = `

            <div id="phase8-interference"></div>

            <div class="phase8-tear"></div>
            <div class="phase8-tear"></div>
            <div class="phase8-tear"></div>
            <div class="phase8-tear"></div>


            <div
                class="phase8-block"
                style="
                    left: 7%;
                    top: 25%;
                    width: 21%;
                    height: 24px;
                ">
            </div>


            <div
                class="phase8-block"
                style="
                    left: 58%;
                    top: 44%;
                    width: 28%;
                    height: 18px;
                ">
            </div>


            <div
                class="phase8-block"
                style="
                    left: 22%;
                    top: 70%;
                    width: 17%;
                    height: 30px;
                ">
            </div>


            <div
                class="phase8-block"
                style="
                    left: 73%;
                    top: 19%;
                    width: 12%;
                    height: 16px;
                ">
            </div>


            <div id="phase8-error">

                SYSTEM ERROR

                <small>
                    SIGNAL CONNECTION LOST //
                    ATTEMPTING RECOVERY
                </small>

            </div>

        `;


        document.body.appendChild(
            overlay
        );

    }


    /* =====================================================
       TEXT CORRUPTION
       ===================================================== */

    function glitchText() {

        const elements =
            Array.from(
                document.querySelectorAll(
                    "h1, h2, h3, p, span, small"
                )
            ).filter(function (element) {

                if (
                    !element.textContent.trim()
                ) {
                    return false;
                }


                if (
                    element.closest(
                        "#phase7-archive"
                    )
                ) {
                    return false;
                }


                if (
                    element.closest(
                        "#phase7-access"
                    )
                ) {
                    return false;
                }


                if (
                    element.closest(
                        "#phase7-record-view"
                    )
                ) {
                    return false;
                }


                return true;

            });


        if (!elements.length) {
            return;
        }


        const element =
            elements[
                Math.floor(
                    Math.random() *
                    elements.length
                )
            ];


        const original =
            element.textContent;


        const corruptions = [

            "SIGNAL LOST",
            "ERROR",
            "NULL",
            "//////",
            "UNKNOWN",
            "DATA CORRUPTED",
            "CONNECTION LOST",
            "???"

        ];


        const replacement =
            corruptions[
                Math.floor(
                    Math.random() *
                    corruptions.length
                )
            ];


        element.textContent =
            replacement;


        element.classList.add(
            "phase8-corrupted-text"
        );


        setTimeout(
            function () {

                element.textContent =
                    original;


                element.classList.remove(
                    "phase8-corrupted-text"
                );

            },
            800
        );

    }


    /* =====================================================
       TRIGGER
       ===================================================== */

    let glitchRunning =
        false;


    function triggerGlitch() {

        if (glitchRunning) {
            return;
        }


        const overlay =
            document.getElementById(
                "phase8-glitch-overlay"
            );


        if (!overlay) {
            return;
        }


        glitchRunning =
            true;


        overlay.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "phase8-distorted"
        );


        void overlay.offsetWidth;


        overlay.classList.add(
            "active"
        );


        document.body.classList.add(
            "phase8-distorted"
        );


        glitchText();


        const error =
            document.getElementById(
                "phase8-error"
            );


        if (error) {

            const messages = [

                [
                    "SYSTEM ERROR",
                    "SIGNAL CONNECTION LOST // ATTEMPTING RECOVERY"
                ],

                [
                    "SIGNAL LOST",
                    "UNKNOWN SOURCE // CONNECTION INTERRUPTED"
                ],

                [
                    "DATA CORRUPTED",
                    "ARCHIVE STREAM // RECOVERY IN PROGRESS"
                ],

                [
                    "CONNECTION ERROR",
                    "UNREGISTERED SIGNAL // TRACE FAILED"
                ]

            ];


            const selected =
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ];


            error.innerHTML = `

                ${selected[0]}

                <small>
                    ${selected[1]}
                </small>

            `;

        }


        setTimeout(
            function () {

                overlay.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "phase8-distorted"
                );


                glitchRunning =
                    false;

            },
            GLITCH_DURATION
        );

    }


    /* =====================================================
       DEBUG API
       ===================================================== */

    window.TheGamePhase8 = {

        trigger:
            triggerGlitch,

        status:
            function () {

                return {

                    system:
                        "PHASE 8 — REDUCED-FLASH UI GLITCH",

                    interval:
                        "10 seconds",

                    duration:
                        GLITCH_DURATION,

                    active:
                        glitchRunning

                };

            }

    };


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initPhase8() {

        if (
            document.documentElement.dataset
                .phase8GlitchInitialized ===
            "true"
        ) {
            return;
        }


        document.documentElement.dataset
            .phase8GlitchInitialized =
            "true";


        injectStyles();

        createOverlay();


        setInterval(
            triggerGlitch,
            GLITCH_INTERVAL
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPhase8
        );

    } else {

        initPhase8();

    }

})();

/* =========================================================
   THE GAME 2026
   PHASE 6 — HIDDEN MINIGAMES
   VERSION 4
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       STORAGE
       ===================================================== */

    const STORAGE_KEY =
        "thegame2026_phase6_minigames_v4";


    const defaultState = {

        signal: false,

        memory: false,

        intruder: false,

        reaction: false,

        cipher: false

    };


    let state;

    try {

        state = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || defaultState;

    }
    catch {

        state = {
            ...defaultState
        };

    }


    function saveState() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );

    }


    /* =====================================================
       LORE REWARDS
       ===================================================== */

    const rewards = {

        signal: {

            title:
                "RECOVERED TRANSMISSION",

            text:
                "A transmission was recovered from the island network. " +
                "Its origin is unknown. The signal contains a reference " +
                "to an old record marked with the number seven.",

            clue:
                "REFERENCE // 07"

        },


        memory: {

            title:
                "MEMORY FRAGMENT",

            text:
                "The memory shows seven Sealkeepers gathered together. " +
                "The spell was being cast when the Hallow King attacked. " +
                "The memory ends before the final moments.",

            clue:
                "INCIDENT // 19"

        },


        intruder: {

            title:
                "CORRUPTED RECORD",

            text:
                "The corrupted section describes the attack during the " +
                "casting. Six Sealkeepers were lost. One continued the spell.",

            clue:
                "ENTRY // 04"

        },


        reaction: {

            title:
                "LAST ENTRY",

            text:
                "The final surviving record states that the seventh " +
                "Sealkeeper completed the spell after the others were killed. " +
                "The record was later removed from the public archive.",

            clue:
                "REFERENCE // 07-19-04"

        },


        cipher: {

            title:
                "SEALED REFERENCE",

            text:
                "The message has been decoded. It does not identify a location. " +
                "Instead, it identifies a record that was deliberately hidden " +
                "from the normal archive.",

            clue:
                "SEALED RECORD // 07-19-04"

        }

    };


    /* =====================================================
       CSS
       ===================================================== */

    if (!document.getElementById(
        "phase6-v4-style"
    )) {

        const style =
            document.createElement("style");

        style.id =
            "phase6-v4-style";


        style.textContent = `

        /* ================================================
           DISCOVERY MARKERS
           ================================================ */

        .phase6-v4-clue {

            position: relative;

            cursor: pointer !important;

            transition:
                opacity .2s ease,
                text-shadow .2s ease;

        }


        .phase6-v4-clue:hover {

            text-shadow:
                0 0 8px
                rgba(255,255,255,.55);

        }


        .phase6-v4-clue::after {

            content: " ◇";

            opacity: .28;

            font-size: .8em;

            transition:
                opacity .2s ease;

        }


        .phase6-v4-clue:hover::after {

            opacity: .85;

        }


        /* ================================================
           OVERLAY
           ================================================ */

        #phase6-v4-overlay {

            position: fixed;

            inset: 0;

            z-index: 999997;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 20px;

            box-sizing: border-box;

            background:
                rgba(0,0,0,.94);

        }


        #phase6-v4-panel {

            width:
                min(720px, 94vw);

            max-height:
                90vh;

            overflow-y:
                auto;

            box-sizing:
                border-box;

            padding:
                32px;

            background:
                #080808;

            border:
                1px solid
                rgba(255,255,255,.18);

            box-shadow:
                0 25px 90px
                rgba(0,0,0,.85);

        }


        #phase6-v4-header {

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                flex-start;

            gap:
                20px;

            margin-bottom:
                28px;

        }


        #phase6-v4-label {

            font-size:
                9px;

            letter-spacing:
                3px;

            opacity:
                .4;

        }


        #phase6-v4-title {

            margin:
                7px 0 0;

            font-size:
                28px;

            letter-spacing:
                2px;

        }


        #phase6-v4-close {

            padding:
                9px 14px;

            border:
                1px solid
                rgba(255,255,255,.2);

            background:
                transparent;

            color:
                inherit;

            cursor:
                pointer;

            font:
                inherit;

            font-size:
                9px;

            letter-spacing:
                2px;

        }


        .phase6-v4-text {

            font-size:
                13px;

            line-height:
                1.75;

            opacity:
                .7;

        }


        .phase6-v4-button {

            margin-top:
                20px;

            padding:
                12px 18px;

            border:
                0;

            background:
                #fff;

            color:
                #000;

            cursor:
                pointer;

            font:
                inherit;

            font-size:
                10px;

            font-weight:
                700;

            letter-spacing:
                1px;

        }


        .phase6-v4-status {

            min-height:
                20px;

            margin-top:
                15px;

            font-size:
                10px;

            letter-spacing:
                1.5px;

            opacity:
                .6;

        }


        /* ================================================
           SIGNAL
           ================================================ */

        .phase6-v4-track {

            position:
                relative;

            height:
                55px;

            margin-top:
                25px;

            border:
                1px solid
                rgba(255,255,255,.18);

            overflow:
                hidden;

        }


        .phase6-v4-target {

            position:
                absolute;

            top:
                0;

            bottom:
                0;

            width:
                22%;

            background:
                rgba(255,255,255,.16);

        }


        .phase6-v4-cursor {

            position:
                absolute;

            top:
                0;

            bottom:
                0;

            width:
                4px;

            background:
                #fff;

        }


        /* ================================================
           MEMORY
           ================================================ */

        .phase6-v4-memory {

            display:
                grid;

            grid-template-columns:
                repeat(4, 58px);

            gap:
                8px;

            justify-content:
                center;

            margin-top:
                25px;

        }


        .phase6-v4-memory button {

            width:
                58px;

            height:
                58px;

            border:
                1px solid
                rgba(255,255,255,.18);

            background:
                #101010;

            cursor:
                pointer;

        }


        .phase6-v4-memory button.active {

            background:
                #fff;

        }


        /* ================================================
           INTRUDER
           ================================================ */

        .phase6-v4-intruder {

            display:
                grid;

            grid-template-columns:
                repeat(5, 52px);

            gap:
                7px;

            justify-content:
                center;

            margin-top:
                25px;

        }


        .phase6-v4-intruder button {

            width:
                52px;

            height:
                52px;

            border:
                1px solid
                rgba(255,255,255,.18);

            background:
                #101010;

            color:
                rgba(255,255,255,.55);

            cursor:
                pointer;

            font-size:
                16px;

        }


        .phase6-v4-intruder button:hover {

            border-color:
                rgba(255,255,255,.7);

        }


        /* ================================================
           REACTION
           ================================================ */

        .phase6-v4-reaction {

            display:
                block;

            width:
                160px;

            height:
                160px;

            margin:
                28px auto;

            border-radius:
                50%;

            border:
                2px solid
                rgba(255,255,255,.2);

            background:
                #101010;

            color:
                #fff;

            cursor:
                pointer;

        }


        .phase6-v4-reaction.ready {

            background:
                #fff;

            color:
                #000;

            transform:
                scale(1.05);

        }


        /* ================================================
           CIPHER
           ================================================ */

        .phase6-v4-code {

            margin-top:
                25px;

            padding:
                22px;

            border:
                1px solid
                rgba(255,255,255,.16);

            text-align:
                center;

            font-size:
                23px;

            letter-spacing:
                5px;

        }


        .phase6-v4-input {

            width:
                100%;

            box-sizing:
                border-box;

            margin-top:
                15px;

            padding:
                13px;

            background:
                #050505;

            border:
                1px solid
                rgba(255,255,255,.2);

            color:
                #fff;

            outline:
                none;

            font:
                inherit;

        }


        /* ================================================
           LORE REWARD
           ================================================ */

        .phase6-v4-reward {

            margin-top:
                25px;

            padding:
                20px;

            border:
                1px solid
                rgba(255,255,255,.13);

            background:
                rgba(255,255,255,.025);

        }


        .phase6-v4-reward small {

            display:
                block;

            margin-bottom:
                10px;

            font-size:
                9px;

            letter-spacing:
                2px;

            opacity:
                .4;

        }


        .phase6-v4-reward p {

            margin:
                0;

            font-size:
                13px;

            line-height:
                1.7;

            opacity:
                .72;

        }


        .phase6-v4-clue-text {

            margin-top:
                16px;

            font-size:
                10px;

            letter-spacing:
                2px;

            opacity:
                .55;

        }


        @media (max-width: 600px) {

            .phase6-v4-memory {

                grid-template-columns:
                    repeat(4, 48px);

            }

            .phase6-v4-memory button {

                width:
                    48px;

                height:
                    48px;

            }

            .phase6-v4-intruder {

                grid-template-columns:
                    repeat(5, 42px);

            }

            .phase6-v4-intruder button {

                width:
                    42px;

                height:
                    42px;

            }

        }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       OVERLAY
       ===================================================== */

    function createOverlay() {

        let overlay =
            document.getElementById(
                "phase6-v4-overlay"
            );


        if (overlay) {
            return overlay;
        }


        overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "phase6-v4-overlay";


        overlay.innerHTML = `

            <div id="phase6-v4-panel">

                <div id="phase6-v4-header">

                    <div>

                        <div id="phase6-v4-label">
                            UNIDENTIFIED SYSTEM / 06
                        </div>

                        <h2 id="phase6-v4-title">
                            SYSTEM
                        </h2>

                    </div>

                    <button id="phase6-v4-close">
                        CLOSE
                    </button>

                </div>

                <div id="phase6-v4-content">
                </div>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "phase6-v4-close"
            )
            .addEventListener(
                "click",
                closeGame
            );


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    closeGame();

                }

            }
        );


        return overlay;

    }


    function closeGame() {

        const overlay =
            document.getElementById(
                "phase6-v4-overlay"
            );


        if (overlay) {

            overlay.style.display =
                "none";

        }

    }


    /* =====================================================
       REWARD
       ===================================================== */

    function showReward(
        content,
        game
    ) {

        const reward =
            rewards[game];


        content.innerHTML = `

            <div class="phase6-v4-reward">

                <small>
                    ${reward.title}
                </small>

                <p>
                    ${reward.text}
                </p>

                <div class="phase6-v4-clue-text">
                    ${reward.clue}
                </div>

            </div>

        `;

    }


    /* =====================================================
       GAME 1
       SIGNAL LOCK
       ===================================================== */

    function gameSignal(content) {

        let position = 0;

        let direction = 1;

        let successes = 0;

        let finished = false;


        let target =
            Math.floor(
                Math.random() * 50
            ) + 20;


        content.innerHTML = `

            <p class="phase6-v4-text">

                A signal is moving through the
                island network.

                <br><br>

                Lock the signal when it enters
                the highlighted zone.

                <br><br>

                You need <strong>3 locks</strong>.

            </p>


            <div class="phase6-v4-track">

                <div
                    class="phase6-v4-target">
                </div>

                <div
                    class="phase6-v4-cursor">
                </div>

            </div>


            <button class="phase6-v4-button">
                LOCK SIGNAL
            </button>


            <div class="phase6-v4-status">
                LOCKS: 0 / 3
            </div>

        `;


        const targetElement =
            content.querySelector(
                ".phase6-v4-target"
            );


        const cursor =
            content.querySelector(
                ".phase6-v4-cursor"
            );


        const button =
            content.querySelector(
                ".phase6-v4-button"
            );


        const status =
            content.querySelector(
                ".phase6-v4-status"
            );


        function moveTarget() {

            target =
                Math.floor(
                    Math.random() * 55
                ) + 15;


            targetElement.style.left =
                target + "%";

        }


        moveTarget();


        const interval =
            setInterval(
                function () {

                    position +=
                        direction * 2;


                    if (
                        position >= 96
                    ) {

                        direction = -1;

                    }


                    if (
                        position <= 0
                    ) {

                        direction = 1;

                    }


                    cursor.style.left =
                        position + "%";

                },
                25
            );


        button.addEventListener(
            "click",
            function () {

                if (finished) return;


                if (
                    position >=
                        target - 4 &&
                    position <=
                        target + 24
                ) {

                    successes++;


                    status.textContent =
                        `LOCKS: ${successes} / 3`;


                    if (
                        successes >= 3
                    ) {

                        finished = true;


                        clearInterval(
                            interval
                        );


                        state.signal =
                            true;


                        saveState();


                        showReward(
                            content,
                            "signal"
                        );


                        button.disabled =
                            true;

                    }
                    else {

                        moveTarget();

                    }

                }
                else {

                    status.textContent =
                        `MISSED — LOCKS: ${successes} / 3`;

                }

            }
        );

    }


    /* =====================================================
       GAME 2
       MEMORY FRAGMENT
       ===================================================== */

    function gameMemory(content) {

        const sequence = [];


        while (
            sequence.length < 4
        ) {

            const value =
                Math.floor(
                    Math.random() * 16
                );


            if (
                !sequence.includes(
                    value
                )
            ) {

                sequence.push(
                    value
                );

            }

        }


        let playerIndex = 0;

        let watching = true;


        content.innerHTML = `

            <p class="phase6-v4-text">

                A damaged memory contains four
                important moments.

                <br><br>

                Watch the sequence and reproduce it.

            </p>


            <div
                class="phase6-v4-memory">
            </div>


            <div
                class="phase6-v4-status">
                WATCH...
            </div>

        `;


        const grid =
            content.querySelector(
                ".phase6-v4-memory"
            );


        const status =
            content.querySelector(
                ".phase6-v4-status"
            );


        const cells = [];


        for (
            let i = 0;
            i < 16;
            i++
        ) {

            const cell =
                document.createElement(
                    "button"
                );


            grid.appendChild(
                cell
            );


            cells.push(
                cell
            );


            cell.addEventListener(
                "click",
                function () {

                    if (
                        watching
                    ) return;


                    if (
                        i ===
                        sequence[playerIndex]
                    ) {

                        playerIndex++;


                        if (
                            playerIndex ===
                            sequence.length
                        ) {

                            state.memory =
                                true;


                            saveState();


                            showReward(
                                content,
                                "memory"
                            );

                        }

                    }
                    else {

                        playerIndex = 0;


                        status.textContent =
                            "WRONG — SEQUENCE RESET";

                    }

                }
            );

        }


        let index = 0;


        const interval =
            setInterval(
                function () {

                    cells.forEach(
                        function (cell) {

                            cell.classList.remove(
                                "active"
                            );

                        }
                    );


                    if (
                        index >=
                        sequence.length
                    ) {

                        clearInterval(
                            interval
                        );


                        watching = false;


                        status.textContent =
                            "YOUR TURN";


                        return;

                    }


                    const cell =
                        cells[
                            sequence[index]
                        ];


                    cell.classList.add(
                        "active"
                    );


                    setTimeout(
                        function () {

                            cell.classList.remove(
                                "active"
                            );

                        },
                        500
                    );


                    index++;

                },
                800
            );

    }


    /* =====================================================
       GAME 3
       THE INTRUDER
       ===================================================== */

    function gameIntruder(content) {

        const correct =
            Math.floor(
                Math.random() * 25
            );


        content.innerHTML = `

            <p class="phase6-v4-text">

                One signal in this grid is corrupted.

                <br><br>

                Find the one that doesn't belong.

            </p>


            <div
                class="phase6-v4-intruder">
            </div>


            <div
                class="phase6-v4-status">
                ANOMALY SEARCH ACTIVE
            </div>

        `;


        const grid =
            content.querySelector(
                ".phase6-v4-intruder"
            );


        const status =
            content.querySelector(
                ".phase6-v4-status"
            );


        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const button =
                document.createElement(
                    "button"
                );


            /*
             * Normal nodes use dots.
             * The corrupted node uses a different
             * symbol and slightly different opacity.
             */

            button.textContent =
                i === correct
                    ? "◇"
                    : "•";


            button.style.opacity =
                i === correct
                    ? ".75"
                    : ".42";


            grid.appendChild(
                button
            );


            button.addEventListener(
                "click",
                function () {

                    if (
                        i === correct
                    ) {

                        state.intruder =
                            true;


                        saveState();


                        showReward(
                            content,
                            "intruder"
                        );

                    }
                    else {

                        status.textContent =
                            "NORMAL SIGNAL";

                    }

                }
            );

        }

    }


    /* =====================================================
       GAME 4
       LAST ENTRY
       ===================================================== */

    function gameReaction(content) {

        let stage = 1;

        let ready = false;

        let finished = false;

        let timer;


        content.innerHTML = `

            <p class="phase6-v4-text">

                The final record survived in two pieces.

                <br><br>

                Activate both pieces in the correct
                order.

            </p>


            <button
                class="phase6-v4-reaction">
                WAIT
            </button>


            <div
                class="phase6-v4-status">
                PIECE 1 / 2 — WAIT
            </div>

        `;


        const button =
            content.querySelector(
                ".phase6-v4-reaction"
            );


        const status =
            content.querySelector(
                ".phase6-v4-status"
            );


        function arm() {

            ready = false;


            button.classList.remove(
                "ready"
            );


            button.textContent =
                "WAIT";


            const delay =
                Math.floor(
                    Math.random() * 1300
                ) + 1000;


            timer =
                setTimeout(
                    function () {

                        ready = true;


                        button.classList.add(
                            "ready"
                        );


                        button.textContent =
                            "CLICK";


                        status.textContent =
                            `PIECE ${stage} / 2 — NOW`;

                    },
                    delay
                );

        }


        arm();


        button.addEventListener(
            "click",
            function () {

                if (
                    finished
                ) return;


                if (
                    !ready
                ) {

                    clearTimeout(
                        timer
                    );


                    status.textContent =
                        "TOO EARLY — WAIT AGAIN";


                    setTimeout(
                        arm,
                        500
                    );


                    return;

                }


                if (
                    stage === 1
                ) {

                    stage = 2;


                    status.textContent =
                        "PIECE 1 RECOVERED — PIECE 2";


                    arm();


                    return;

                }


                finished = true;


                state.reaction =
                    true;


                saveState();


                showReward(
                    content,
                    "reaction"
                );


                button.disabled =
                    true;

            }
        );

    }


    /* =====================================================
       GAME 5
       SEALED MESSAGE
       ===================================================== */

    function gameCipher(content) {

        content.innerHTML = `

            <p class="phase6-v4-text">

                The final fragment is encrypted.

                <br><br>

                Each letter has been moved
                <strong>one place forward</strong>
                in the alphabet.

                <br><br>

                Move every letter one place back.

            </p>


            <div class="phase6-v4-code">
                TFBMFE
            </div>


            <input
                class="phase6-v4-input"
                placeholder="ENTER THE DECODED WORD"
                autocomplete="off"
            />


            <button
                class="phase6-v4-button">
                DECODE
            </button>


            <div
                class="phase6-v4-status">
            </div>

        `;


        const input =
            content.querySelector(
                ".phase6-v4-input"
            );


        const button =
            content.querySelector(
                ".phase6-v4-button"
            );


        const status =
            content.querySelector(
                ".phase6-v4-status"
            );


        button.addEventListener(
            "click",
            function () {

                const answer =
                    input.value
                        .trim()
                        .toUpperCase();


                if (
                    answer ===
                    "SEALED"
                ) {

                    state.cipher =
                        true;


                    saveState();


                    showReward(
                        content,
                        "cipher"
                    );


                    button.disabled =
                        true;


                    input.disabled =
                        true;

                }
                else {

                    status.textContent =
                        "INCORRECT — TRY AGAIN";

                }

            }
        );

    }


    /* =====================================================
       OPEN GAME
       ===================================================== */

    function openGame(id) {

        const overlay =
            createOverlay();


        const title =
            document.getElementById(
                "phase6-v4-title"
            );


        const content =
            document.getElementById(
                "phase6-v4-content"
            );


        overlay.style.display =
            "flex";


        content.innerHTML =
            "";


        if (
            id === "signal"
        ) {

            title.textContent =
                "SIGNAL LOCK";

            gameSignal(
                content
            );

        }


        if (
            id === "memory"
        ) {

            title.textContent =
                "MEMORY FRAGMENT";

            gameMemory(
                content
            );

        }


        if (
            id === "intruder"
        ) {

            title.textContent =
                "THE INTRUDER";

            gameIntruder(
                content
            );

        }


        if (
            id === "reaction"
        ) {

            title.textContent =
                "LAST ENTRY";

            gameReaction(
                content
            );

        }


        if (
            id === "cipher"
        ) {

            title.textContent =
                "SEALED MESSAGE";

            gameCipher(
                content
            );

        }

    }


    /* =====================================================
       DISCOVERY SYSTEM
       ===================================================== */

    function makeDiscovery(
        element,
        game
    ) {

        if (!element) return;


        if (
            element.dataset.phase6V4
        ) return;


        /*
         * IMPORTANT:
         *
         * We only mark specific existing
         * website elements.
         *
         * Archive elements are never selected.
         */

        element.dataset.phase6V4 =
            game;


        element.classList.add(
            "phase6-v4-clue"
        );


        element.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openGame(
                    game
                );

            }
        );

    }


    /* =====================================================
       TEXT FINDER
       ===================================================== */

    function findText(
        text
    ) {

        const elements =
            document.querySelectorAll(
                "span, small, p, h1, h2, h3, strong"
            );


        for (
            const element of elements
        ) {

            if (
                element.children.length === 0 &&
                element.textContent
                    .trim()
                    .toUpperCase() ===
                text.toUpperCase()
            ) {

                return element;

            }

        }


        return null;

    }


    /* =====================================================
       GAME LOCATIONS
       =====================================================

       These are spread around the site.

       NONE use the Sealed Archive.
       ===================================================== */


    /*
     * 01 — CONVERGENCE
     */

    makeDiscovery(
        document.getElementById(
            "convergence-page-value"
        ) ||
        document.getElementById(
            "meter-value"
        ),
        "signal"
    );


    /*
     * 02 — STORY
     *
     * Uses the STORY page heading if available.
     */

    makeDiscovery(
        findText("STORY"),
        "memory"
    );


    /*
     * 03 — COUNTDOWN
     */

    makeDiscovery(
        document.getElementById(
            "home-countdown"
        ),
        "intruder"
    );


    /*
     * 04 — CHARACTERS
     */

    makeDiscovery(
        findText("CHARACTERS"),
        "reaction"
    );


    /*
     * 05 — ISLAND
     *
     * Uses the Island explorer heading.
     */

    makeDiscovery(
        findText("ISLAND EXPLORER"),
        "cipher"
    );


    /* =====================================================
       FALLBACK DISCOVERY
       =====================================================

       If one of the normal elements doesn't exist,
       use another existing non-Archive element.

       This prevents a game from disappearing because
       the site's HTML changes slightly.
       ===================================================== */

    const usedGames = new Set();


    document
        .querySelectorAll(
            ".phase6-v4-clue"
        )
        .forEach(
            element => {

                if (
                    element.dataset.phase6V4
                ) {

                    usedGames.add(
                        element.dataset.phase6V4
                    );

                }

            }
        );


    const fallbackTargets = [

        {
            game: "signal",
            selector:
                "#meter-fill"
        },

        {
            game: "memory",
            selector:
                "#system-log-text"
        },

        {
            game: "intruder",
            selector:
                "#status"
        },

        {
            game: "reaction",
            selector:
                ".section-header h1"
        },

        {
            game: "cipher",
            selector:
                "#island-discovered-count"
        }

    ];


    fallbackTargets.forEach(
        function (item) {

            if (
                usedGames.has(
                    item.game
                )
            ) {
                return;
            }


            const element =
                document.querySelector(
                    item.selector
                );


            if (
                element &&
                !element.closest(
                    "#island-location-record"
                )
            ) {

                makeDiscovery(
                    element,
                    item.game
                );

            }

        }
    );


    /* =====================================================
       DEBUG API
       ===================================================== */

    window.TheGamePhase6 = {

        open: function (id) {

            const valid = [

                "signal",

                "memory",

                "intruder",

                "reaction",

                "cipher"

            ];


            if (
                valid.includes(id)
            ) {

                openGame(id);

            }

        },


        state: function () {

            return {
                ...state
            };

        },


        reset: function () {

            state = {
                ...defaultState
            };


            saveState();


            console.log(
                "[PHASE 6] Progress reset."
            );

        }

    };


    console.log(
        "[PHASE 6] Hidden Minigames v4 loaded."
    );


})();