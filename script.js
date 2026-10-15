/* ==================================================
   THE GAME 2026
   CONVERGENCE SYSTEM
   Automatic progression toward November 1, 19:00 CET
================================================== */

(() => {
    "use strict";

    /* ==================================================
       CONFIGURATION
    ================================================== */

    const CONFIG = {
        startDate: new Date("2026-10-15T20:00:00+02:00"),
        finaleDate: new Date("2026-11-01T19:00:00+01:00"),
        startPercent: 42,
        messageInterval: 30000,
        particleInterval: 900
    };

    /* ==================================================
       QUEST SCHEDULE
    ================================================== */

    const QUESTS = [
        {
            id: "Q1",
            title: "THE SILENT ARRIVAL",
            date: new Date("2026-10-03T14:00:00+02:00")
        },
        {
            id: "Q2",
            title: "WATCHER'S TOWER",
            date: new Date("2026-10-03T14:00:00+02:00")
        },
        {
            id: "Q3",
            title: "BROKEN SEALS",
            date: new Date("2026-10-04T14:00:00+02:00")
        },
        {
            id: "Q4",
            title: "ECHOES BENEATH THE VOLCANO",
            date: new Date("2026-10-06T14:00:00+02:00")
        },
        {
            id: "Q5",
            title: "THE LAST SEALKEEPER",
            date: new Date("2026-10-10T14:00:00+02:00")
        },
        {
            id: "Q6",
            title: "BEYOND THE VEIL",
            date: new Date("2026-10-14T14:00:00+02:00")
        },
        {
            id: "Q7",
            title: "THE LOST CREW",
            date: new Date("2026-10-18T14:00:00+02:00")
        },
        {
            id: "Q8",
            title: "THE RESCUE",
            date: new Date("2026-10-22T14:00:00+02:00")
        },
        {
            id: "Q9",
            title: "THE LAST CHANCE",
            date: new Date("2026-10-27T14:00:00+01:00")
        },
        {
            id: "Q10",
            title: "HALLOWED CONVERGENCE",
            date: new Date("2026-11-01T19:00:00+01:00")
        }
    ];

    /* ==================================================
       CONVERGENCE STAGES

       The percentage measures the expansion of the
       Hallow King's dominion. It does NOT measure
       the condition of the seals or his presence.
    ================================================== */

    const STAGES = [
        {
            max: 24,
            name: "UNSTABLE SIGNAL",
            status: "DOMINION DEVELOPING",
            messages: [
                "The island is changing.",
                "His presence grows stronger.",
                "The Hallowed Realm is spreading.",
                "Something ancient has awakened.",
                "The first signs of his dominion are appearing.",
                "The island's boundaries are becoming unstable.",
                "An unfamiliar influence spreads across the land."
            ]
        },
        {
            max: 39,
            name: "EXPANDING INFLUENCE",
            status: "DOMINION EXPANDING",
            messages: [
                "The Hallow King's influence is growing.",
                "The boundary between worlds is disappearing.",
                "His dominion extends beyond its former boundaries.",
                "The island is no longer what it was.",
                "The Hallowed Realm is claiming new ground.",
                "More of the island falls under his influence.",
                "The Convergence continues to advance."
            ]
        },
        {
            max: 54,
            name: "CONVERGENCE ACTIVE",
            status: "DOMINION SPREADING",
            messages: [
                "THE CONVERGENCE CONTINUES.",
                "His dominion spreads across the island.",
                "The boundaries of his kingdom are expanding.",
                "The island is slowly becoming his own.",
                "The Hallowed Realm extends its reach.",
                "His influence grows with every passing moment.",
                "The island is becoming his kingdom.",
                "The Convergence is changing everything."
            ]
        },
        {
            max: 69,
            name: "DOMINION EXPANDING",
            status: "TERRITORY CLAIMED",
            messages: [
                "MORE OF THE ISLAND FALLS UNDER HIS INFLUENCE.",
                "The Hallowed Realm continues to spread.",
                "His territory grows beyond its former boundaries.",
                "The island is losing its connection to the normal world.",
                "THE KINGDOM EXPANDS.",
                "His influence reaches further than ever before.",
                "The Hallowed Realm is claiming everything around it.",
                "The island's transformation continues."
            ]
        },
        {
            max: 84,
            name: "HALLOWED TAKEOVER",
            status: "DOMINION ADVANCING",
            messages: [
                "THE HALLOWED REALM IS CONSUMING OUR WORLD.",
                "His dominion now reaches almost everywhere.",
                "The normal world is fading beneath his influence.",
                "The island is becoming an extension of his realm.",
                "HIS KINGDOM KNOWS NO BOUNDARIES.",
                "The Convergence has reached an unprecedented scale.",
                "His domain continues to replace the familiar world.",
                "The island is becoming part of something greater."
            ]
        },
        {
            max: 99,
            name: "FINAL CONVERGENCE",
            status: "DOMINION NEAR COMPLETE",
            messages: [
                "THE TWO WORLDS ARE NEARLY ONE.",
                "His dominion is almost complete.",
                "There is almost nothing left beyond his reach.",
                "THE FINAL STAGE APPROACHES.",
                "His victory draws closer with every passing second.",
                "The boundaries between the worlds are almost gone.",
                "The Hallowed Realm is close to consuming the island.",
                "THE KINGDOM IS ALMOST COMPLETE."
            ]
        },
        {
            max: 100,
            name: "HALLOWED CONVERGENCE",
            status: "CONVERGENCE COMPLETE",
            messages: [
                "CONVERGENCE COMPLETE.",
                "THE HALLOW KING HAS WON.",
                "THE TWO WORLDS ARE ONE.",
                "THE ISLAND IS HIS.",
                "HIS DOMINION IS COMPLETE."
            ]
        }
    ];

    /* ==================================================
       DOM REFERENCES
    ================================================== */

    const $ = id => document.getElementById(id);

    const elements = {
        percentage: $("percentage"),
        meterFill: $("meterFill"),
        meterTrack: $("meterTrack"),
        meterStateChip: $("meterStateChip"),
        meterReadout: $("meterReadout"),
        convergencePanel: $("convergencePanel"),

        signalStatus: $("signalStatus"),
        eventMessage: $("eventMessage"),
        signalOrigin: $("signalOrigin"),
        signalAuth: $("signalAuth"),

        days: $("days"),
        hours: $("hours"),
        minutes: $("minutes"),
        seconds: $("seconds"),
        countdownTitle: $("countdownTitle"),

        questGrid: $("questGrid"),
        anomalyNotice: $("anomalyNotice"),

        particleField: $("particleField"),
        flashOverlay: $("flashOverlay")
    };

    /* ==================================================
       STATE
    ================================================== */

    let currentStageIndex = -1;
    let currentMessage = "";
    let nextMessageAt = 0;
    let lastMilestone = -1;
    let previousPercentage = -1;

    /* ==================================================
       PROGRESSION CALCULATION
    ================================================== */

    function calculateProgress(now = Date.now()) {
        const start = CONFIG.startDate.getTime();
        const finale = CONFIG.finaleDate.getTime();

        if (now >= finale) {
            return 100;
        }

        if (now <= start) {
            return CONFIG.startPercent;
        }

        const elapsed = now - start;
        const duration = finale - start;
        const fraction = elapsed / duration;

        return Math.min(
            100,
            Math.max(
                CONFIG.startPercent,
                CONFIG.startPercent + fraction * (100 - CONFIG.startPercent)
            )
        );
    }

    function getStageIndex(percentage) {
        return STAGES.findIndex(stage => percentage <= stage.max);
    }

    function getStage(percentage) {
        return STAGES[getStageIndex(percentage)];
    }

    /* ==================================================
       METER DISPLAY
    ================================================== */

    function updateMeter(percentage) {
        const rounded = Math.floor(percentage);
        const stageIndex = getStageIndex(percentage);
        const stage = STAGES[stageIndex];

        if (elements.percentage) {
            elements.percentage.textContent = `${rounded}%`;
        }

        if (elements.meterFill) {
            elements.meterFill.style.width = `${percentage}%`;
        }

        if (elements.meterTrack) {
            elements.meterTrack.setAttribute("aria-valuenow", String(rounded));
            elements.meterTrack.setAttribute("aria-valuemin", "0");
            elements.meterTrack.setAttribute("aria-valuemax", "100");
        }

        if (elements.meterStateChip) {
            elements.meterStateChip.textContent = stage.name;
        }

        if (elements.meterReadout) {
            elements.meterReadout.textContent = stage.status;
        }

        if (elements.convergencePanel) {
            elements.convergencePanel.dataset.stage = String(stageIndex);
            elements.convergencePanel.style.setProperty(
                "--convergence-progress",
                `${percentage}%`
            );
        }

        if (elements.meterFill) {
            elements.meterFill.dataset.stage = String(stageIndex);
        }

        updateSignal(percentage, stageIndex);
        updateStageEffects(stageIndex, percentage);

        return stageIndex;
    }

    /* ==================================================
       MESSAGE ROTATION
    ================================================== */

    function chooseMessage(stageIndex) {
        const messages = STAGES[stageIndex].messages;

        if (messages.length === 1) {
            return messages[0];
        }

        const choices = messages.filter(message => message !== currentMessage);

        return choices[Math.floor(Math.random() * choices.length)];
    }

    function updateSignal(percentage, stageIndex, force = false) {
        const now = Date.now();
        const stage = STAGES[stageIndex];
        const stageChanged = stageIndex !== currentStageIndex;

        if (
            force ||
            stageChanged ||
            !currentMessage ||
            now >= nextMessageAt
        ) {
            currentMessage = chooseMessage(stageIndex);
            nextMessageAt = now + CONFIG.messageInterval;
        }

        currentStageIndex = stageIndex;

        if (elements.signalStatus) {
            elements.signalStatus.textContent = stage.status;
        }

        if (elements.eventMessage) {
            elements.eventMessage.textContent = currentMessage;
        }

        if (elements.signalOrigin) {
            elements.signalOrigin.textContent =
                percentage >= 100
                    ? "ORIGIN: HALLOWED REALM"
                    : "ORIGIN: CONVERGENCE";
        }

        if (elements.signalAuth) {
            elements.signalAuth.textContent =
                percentage >= 100
                    ? "AUTHORITY: HALLOW KING"
                    : "SIGNAL: DETECTED";
        }

        if (stageChanged && currentStageIndex > 0) {
            showAnomaly(currentMessage);
        }
    }

    /* ==================================================
       MILESTONES AND VISUAL EFFECTS
    ================================================== */

    function updateStageEffects(stageIndex, percentage) {
        const milestone = Math.floor(percentage / 10) * 10;

        if (milestone !== lastMilestone) {
            lastMilestone = milestone;

            if (milestone >= 50 && milestone < 100) {
                triggerFlash();
            }
        }

        if (elements.convergencePanel) {
            elements.convergencePanel.classList.toggle(
                "convergence-critical",
                percentage >= 85
            );

            elements.convergencePanel.classList.toggle(
                "convergence-complete",
                percentage >= 100
            );
        }

        document.body.dataset.convergenceStage = String(stageIndex);
    }

    function triggerFlash() {
        if (!elements.flashOverlay) return;

        elements.flashOverlay.classList.remove("active");

        // Restart the CSS animation without requiring a page reload.
        void elements.flashOverlay.offsetWidth;

        elements.flashOverlay.classList.add("active");

        window.setTimeout(() => {
            elements.flashOverlay?.classList.remove("active");
        }, 900);
    }

    function showAnomaly(message) {
        if (!elements.anomalyNotice) return;

        elements.anomalyNotice.textContent = message;
        elements.anomalyNotice.classList.add("active");

        window.setTimeout(() => {
            elements.anomalyNotice?.classList.remove("active");
        }, 4500);
    }

    /* ==================================================
       FINALE COUNTDOWN
    ================================================== */

    function updateCountdown() {
        const now = Date.now();
        const finale = CONFIG.finaleDate.getTime();
        const remaining = Math.max(0, finale - now);

        const totalSeconds = Math.floor(remaining / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (elements.days) {
            elements.days.textContent = String(days).padStart(2, "0");
        }

        if (elements.hours) {
            elements.hours.textContent = String(hours).padStart(2, "0");
        }

        if (elements.minutes) {
            elements.minutes.textContent = String(minutes).padStart(2, "0");
        }

        if (elements.seconds) {
            elements.seconds.textContent = String(seconds).padStart(2, "0");
        }

        if (elements.countdownTitle) {
            elements.countdownTitle.textContent =
                remaining > 0
                    ? "TIME UNTIL HALLOWED CONVERGENCE"
                    : "HALLOWED CONVERGENCE COMPLETE";
        }
    }

    /* ==================================================
       QUEST LOG
    ================================================== */

    function renderQuests() {
        if (!elements.questGrid) return;

        const now = Date.now();

        elements.questGrid.innerHTML = QUESTS.map(quest => {
            const released = now >= quest.date.getTime();
            const isFinale = quest.id === "Q10";

            let status = "UPCOMING";
            let className = "quest-upcoming";

            if (released) {
                status = isFinale ? "FINALE REACHED" : "RELEASED";
                className = "quest-released";
            }

            const dateLabel = quest.date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short"
            });

            return `
                <article class="quest-card ${className}">
                    <div class="quest-card-header">
                        <span class="quest-id">${quest.id}</span>
                        <span class="quest-status">${status}</span>
                    </div>
                    <h3 class="quest-title">${quest.title}</h3>
                    <div class="quest-date">${dateLabel}</div>
                </article>
            `;
        }).join("");
    }

    /* ==================================================
       AMBIENT PARTICLES
    ================================================== */

    function createParticle() {
        if (!elements.particleField) return;

        // Prevent the effect from becoming unnecessarily expensive.
        if (elements.particleField.childElementCount >= 45) {
            return;
        }

        const particle = document.createElement("span");
        particle.className = "convergence-particle";

        const size = 2 + Math.random() * 4;
        const duration = 5 + Math.random() * 8;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = String(0.2 + Math.random() * 0.6);

        elements.particleField.appendChild(particle);

        window.setTimeout(() => particle.remove(), duration * 1000);
    }

    /* ==================================================
       MAIN UPDATE LOOP
    ================================================== */

    function updateProgression() {
        const percentage = calculateProgress();
        const stageIndex = getStageIndex(percentage);

        updateMeter(percentage);

        if (percentage >= 100 && previousPercentage < 100) {
            currentMessage = "THE HALLOW KING HAS WON.";

            if (elements.eventMessage) {
                elements.eventMessage.textContent = currentMessage;
            }

            if (elements.signalStatus) {
                elements.signalStatus.textContent = "CONVERGENCE COMPLETE";
            }

            if (elements.signalOrigin) {
                elements.signalOrigin.textContent = "ORIGIN: HALLOWED REALM";
            }

            if (elements.signalAuth) {
                elements.signalAuth.textContent = "AUTHORITY: HALLOW KING";
            }

            triggerFlash();
            showAnomaly("CONVERGENCE COMPLETE. THE HALLOW KING HAS WON.");
        } else if (percentage < 100) {
            // Normal stage-based message rotation.
            updateSignal(percentage, stageIndex);
        }

        previousPercentage = percentage;

        updateCountdown();
    }

    /* ==================================================
       OPTIONAL DEBUG CONTROLS
       Available in the browser console.
       Normal progression remains time-based.
    ================================================== */

    window.TheGame2026 = {
        getConvergence() {
            return calculateProgress();
        },

        getStage() {
            return getStage(calculateProgress());
        },

        getNextMilestone() {
            const percentage = calculateProgress();
            const next = Math.ceil((percentage + 0.001) / 10) * 10;

            return Math.min(100, next);
        },

        refresh() {
            updateProgression();
            renderQuests();
        }
    };

    /* ==================================================
       INITIALIZATION
    ================================================== */

    function initialize() {
        renderQuests();
        updateProgression();

        window.setInterval(updateProgression, 1000);
        window.setInterval(renderQuests, 60000);
        window.setInterval(createParticle, CONFIG.particleInterval);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();