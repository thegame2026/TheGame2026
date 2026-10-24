/* ==================================================
   THE GAME 2026 — CONVERGENCE SYSTEM
   Live progression + cinematic finale + test mode
================================================== */

(() => {
  "use strict";

  // Set to false before production deployment.
  const TEST_MODE = false;

  const CONFIG = {
    startDate: new Date("2026-10-15T20:00:00+02:00"),
    finaleDate: new Date("2026-11-01T19:00:00+01:00"),
    startPercent: 42,
    messageInterval: 30000,
    particleInterval: 900,
    completedKey: "tg26-convergence-completed-v1"
  };

  const QUESTS = [
    { id: "Q1", title: "THE SILENT ARRIVAL", date: "2026-10-03T14:00:00+02:00" },
    { id: "Q2", title: "WATCHER'S TOWER", date: "2026-10-03T14:00:00+02:00" },
    { id: "Q3", title: "BROKEN SEALS", date: "2026-10-04T14:00:00+02:00" },
    { id: "Q4", title: "ECHOES BENEATH THE VOLCANO", date: "2026-10-06T14:00:00+02:00" },
    { id: "Q5", title: "THE LAST SEALKEEPER", date: "2026-10-10T14:00:00+02:00" },
    { id: "Q6", title: "BEYOND THE VEIL", date: "2026-10-14T14:00:00+02:00" },
    { id: "Q7", title: "THE LOST CREW", date: "2026-10-18T14:00:00+02:00" },
    { id: "Q8", title: "THE RESCUE", date: "2026-10-22T14:00:00+02:00" },
    { id: "Q9", title: "THE LAST CHANCE", date: "2026-10-27T14:00:00+01:00" },
    { id: "Q10", title: "HALLOWED CONVERGENCE", date: "2026-11-01T19:00:00+01:00" }
  ].map(quest => ({ ...quest, date: new Date(quest.date) }));

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
    flashOverlay: $("flashOverlay"),
    takeover: $("convergenceTakeover"),
    testControls: $("testControls"),
    systemLabel: $("systemLabel"),
    topDate: $("topDate"),
    lastSync: $("lastSync"),
    takeoverKicker: $("takeoverKicker")
  };

  let currentStageIndex = -1;
  let currentMessage = "";
  let nextMessageAt = 0;
  let lastMilestone = -1;
  let testProgress = null;
  let takeoverStarted = false;
  let takeoverTimers = [];

  function calculateProgress(now = Date.now()) {
    const start = CONFIG.startDate.getTime();
    const finale = CONFIG.finaleDate.getTime();

    if (now >= finale) return 100;
    if (now <= start) return CONFIG.startPercent;

    const fraction = (now - start) / (finale - start);

    return Math.min(
      100,
      Math.max(
        CONFIG.startPercent,
        CONFIG.startPercent + fraction * (100 - CONFIG.startPercent)
      )
    );
  }

  function getStageIndex(percentage) {
    const index = STAGES.findIndex(stage => percentage <= stage.max);
    return index < 0 ? STAGES.length - 1 : index;
  }

  function getStage(percentage) {
    return STAGES[getStageIndex(percentage)];
  }

  function chooseMessage(stageIndex) {
    const messages = STAGES[stageIndex].messages;
    const choices = messages.filter(message => message !== currentMessage);
    const available = choices.length ? choices : messages;

    return available[Math.floor(Math.random() * available.length)];
  }

  function updateSignal(percentage, stageIndex, force = false) {
    const now = Date.now();
    const stage = STAGES[stageIndex];
    const stageChanged = stageIndex !== currentStageIndex;

    if (force || stageChanged || !currentMessage || now >= nextMessageAt) {
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
        percentage >= 100 ? "ORIGIN: HALLOWED REALM" : "ORIGIN: CONVERGENCE";
    }

    if (elements.signalAuth) {
      elements.signalAuth.textContent =
        percentage >= 100 ? "AUTHORITY: HALLOW KING" : "SIGNAL: DETECTED";
    }

    if (stageChanged && stageIndex > 0 && !takeoverStarted) {
      showAnomaly(currentMessage);
    }
  }

  function updateMeter(percentage) {
    const safePercentage = Math.max(0, Math.min(100, percentage));
    const rounded = Math.floor(safePercentage);
    const stageIndex = getStageIndex(safePercentage);
    const stage = STAGES[stageIndex];

    if (elements.percentage) {
      elements.percentage.textContent = String(rounded).padStart(2, "0");
    }

    if (elements.meterFill) {
      elements.meterFill.style.width = `${safePercentage}%`;
      document.documentElement.style.setProperty(
        "--meter-progress",
        `${safePercentage}%`
      );
    }

    if (elements.meterTrack) {
      elements.meterTrack.setAttribute("aria-valuenow", String(rounded));
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
        `${safePercentage}%`
      );
    }

    updateSignal(safePercentage, stageIndex);
    updateStageEffects(stageIndex, safePercentage);

    return stageIndex;
  }

  function updateStageEffects(stageIndex, percentage) {
    const milestone = Math.floor(percentage / 10) * 10;

    if (milestone !== lastMilestone) {
      lastMilestone = milestone;

      if (milestone >= 50 && milestone < 100) {
        triggerFlash();
      }
    }

    document.body.dataset.convergenceStage = String(stageIndex);

    document.body.classList.toggle(
      "convergence-approaching",
      percentage >= 70 && percentage < 100
    );

    document.body.classList.toggle(
      "convergence-critical",
      percentage >= 90 && percentage < 100
    );

    if (elements.convergencePanel) {
      elements.convergencePanel.classList.toggle(
        "is-critical",
        percentage >= 85 && percentage < 100
      );

      elements.convergencePanel.classList.toggle(
        "is-complete",
        percentage >= 100
      );
    }

    document.documentElement.style.setProperty(
      "--intensity",
      String(Math.min(1, 0.12 + percentage / 120))
    );
  }

  function triggerFlash(finale = false) {
    if (!elements.flashOverlay) return;

    elements.flashOverlay.classList.remove("flash", "active");

    // Restart the animation.
    void elements.flashOverlay.offsetWidth;

    elements.flashOverlay.classList.add(finale ? "active" : "flash");

    window.setTimeout(() => {
      elements.flashOverlay?.classList.remove("flash", "active");
    }, finale ? 1000 : 600);
  }

  function showAnomaly(message) {
    if (!elements.anomalyNotice || takeoverStarted) return;

    const label = $("anomalyLabel");
    const timestamp = $("anomalyTimestamp");
    const text = $("anomalyText");

    if (label) label.textContent = "REALITY ANOMALY";

    if (timestamp) {
      timestamp.textContent = new Date().toLocaleTimeString("en-GB");
    }

    if (text) text.textContent = message;

    elements.anomalyNotice.classList.add("is-visible");

    window.setTimeout(() => {
      elements.anomalyNotice?.classList.remove("is-visible");
    }, 4500);
  }

  function updateCountdown() {
    const remaining = Math.max(
      0,
      CONFIG.finaleDate.getTime() - Date.now()
    );

    const totalSeconds = Math.floor(remaining / 1000);

    if (elements.days) {
      elements.days.textContent = String(
        Math.floor(totalSeconds / 86400)
      ).padStart(2, "0");
    }

    if (elements.hours) {
      elements.hours.textContent = String(
        Math.floor((totalSeconds % 86400) / 3600)
      ).padStart(2, "0");
    }

    if (elements.minutes) {
      elements.minutes.textContent = String(
        Math.floor((totalSeconds % 3600) / 60)
      ).padStart(2, "0");
    }

    if (elements.seconds) {
      elements.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
    }

    if (elements.countdownTitle) {
      elements.countdownTitle.textContent = remaining > 0
        ? "TIME UNTIL HALLOWED CONVERGENCE"
        : "HALLOWED CONVERGENCE COMPLETE";
    }
  }

  function renderQuests() {
    if (!elements.questGrid) return;

    const now = Date.now();

    elements.questGrid.innerHTML = QUESTS.map(quest => {
      const released = now >= quest.date.getTime();
      const isFinale = quest.id === "Q10";

      const status = released
        ? (isFinale ? "FINALE REACHED" : "RELEASED")
        : "UPCOMING";

      const className = released ? "is-released" : "is-upcoming";

      const dateLabel = quest.date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      });

      return `
        <article class="quest-card ${className}">
          <div class="quest-top">
            <span class="quest-number">${quest.id}</span>
            <span class="quest-status">${status}</span>
          </div>
          <h3 class="quest-name">${quest.title}</h3>
          <div class="quest-date">${dateLabel}</div>
        </article>
      `;
    }).join("");
  }

  function createParticle() {
    if (!elements.particleField) return;
    if (elements.particleField.childElementCount >= 45) return;

    const particle = document.createElement("span");
    particle.className = "particle";

    const size = 2 + Math.random() * 3;
    const duration = 5 + Math.random() * 8;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--delay", `${Math.random() * -duration}s`);
    particle.style.setProperty("--drift", `${Math.random() * 60 - 30}px`);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    elements.particleField.appendChild(particle);

    window.setTimeout(() => particle.remove(), duration * 1000);
  }

  function clearTakeoverTimers() {
    takeoverTimers.forEach(timer => window.clearTimeout(timer));
    takeoverTimers = [];
  }

  function revealTakeover({ persist = false, test = false } = {}) {
    if (takeoverStarted) return;

    takeoverStarted = true;
    clearTakeoverTimers();

    if (persist && !test) {
      try {
        localStorage.setItem(CONFIG.completedKey, "1");
      } catch (_) {}
    }

    document.body.classList.remove("convergence-approaching");
    document.body.classList.add("convergence-critical", "convergence-ended");

    if (elements.systemLabel) {
      elements.systemLabel.textContent = "SIGNAL LOST";
    }

    if (elements.takeoverKicker) {
      elements.takeoverKicker.textContent = test
        ? "THE GAME 2026 // TEST TRANSMISSION // 100%"
        : "THE GAME 2026 // REALITY INTEGRITY: 0%";
    }

    if (elements.takeover) {
      elements.takeover.hidden = false;
      elements.takeover.classList.add("is-visible", "is-glitching");
    }

    triggerFlash(true);

    // Multiple flashes make the moment feel like a system-wide failure.
    takeoverTimers.push(
      window.setTimeout(() => triggerFlash(true), 240)
    );

    takeoverTimers.push(
      window.setTimeout(() => triggerFlash(true), 520)
    );

    takeoverTimers.push(
      window.setTimeout(() => {
        elements.takeover?.classList.remove("is-glitching");
      }, 1900)
    );

    if (persist && !test) {
      try {
        localStorage.setItem(CONFIG.completedKey, "1");
      } catch (_) {}
    }
  }

  function startConvergenceEvent({ test = false } = {}) {
    if (takeoverStarted) return;

    if (test) {
      testProgress = 100;
    }

    document.body.classList.add(
      "convergence-approaching",
      "convergence-critical"
    );

    if (elements.systemLabel) {
      elements.systemLabel.textContent = "CRITICAL FAILURE";
    }

    if (elements.eventMessage) {
      elements.eventMessage.textContent = "WORLD BOUNDARIES COLLAPSING.";
    }

    if (elements.meterStateChip) {
      elements.meterStateChip.textContent = "REALITY FAILURE";
    }

    if (elements.meterReadout) {
      elements.meterReadout.textContent = "BOUNDARY INTEGRITY: 0";
    }

    triggerFlash(true);

    // First the interface corrupts. Then the takeover replaces it.
    takeoverTimers.push(
      window.setTimeout(() => {
        document.body.classList.add(
          "effect-shift",
          "effect-glitch",
          "effect-flicker"
        );
      }, 100)
    );

    takeoverTimers.push(
      window.setTimeout(() => {
        document.body.classList.remove(
          "effect-shift",
          "effect-glitch",
          "effect-flicker"
        );

        revealTakeover({ persist: !test, test });
      }, 1150)
    );
  }

  function updateProgression() {
    if (takeoverStarted) return;

    const actual = calculateProgress();
    const percentage = testProgress === null ? actual : testProgress;

    updateMeter(percentage);

    if (percentage >= 100) {
      startConvergenceEvent({ test: testProgress !== null });
    }

    updateCountdown();

    if (elements.lastSync) {
      elements.lastSync.textContent = new Date().toLocaleTimeString("en-GB");
    }

    if (elements.topDate) {
      elements.topDate.textContent = new Date().toLocaleDateString("en-GB");
    }
  }

  function resetTest() {
    clearTakeoverTimers();

    takeoverStarted = false;
    testProgress = null;

    document.body.classList.remove(
      "convergence-ended",
      "convergence-critical",
      "convergence-approaching",
      "effect-shift",
      "effect-glitch",
      "effect-flicker"
    );

    if (elements.takeover) {
      elements.takeover.classList.remove("is-visible", "is-glitching");
      elements.takeover.hidden = true;
    }

    if (elements.flashOverlay) {
      elements.flashOverlay.classList.remove("active", "flash");
    }

    if (elements.systemLabel) {
      elements.systemLabel.textContent = "SYSTEM ONLINE";
    }

    currentStageIndex = -1;
    currentMessage = "";
    nextMessageAt = 0;
    lastMilestone = -1;

    updateProgression();
  }

  function setTestProgress(value) {
    if (!TEST_MODE) return;

    clearTakeoverTimers();
    takeoverStarted = false;
    testProgress = Math.max(0, Math.min(100, Number(value) || 0));

    if (elements.takeover) {
      elements.takeover.classList.remove("is-visible", "is-glitching");
      elements.takeover.hidden = true;
    }

    document.body.classList.remove(
      "convergence-ended",
      "effect-shift",
      "effect-glitch",
      "effect-flicker"
    );

    if (elements.flashOverlay) {
      elements.flashOverlay.classList.remove("active", "flash");
    }

    updateProgression();
  }

  function initialize() {
    renderQuests();

    if (elements.testControls) {
      elements.testControls.hidden = !TEST_MODE;
    }

    $("testApproachButton")?.addEventListener("click", () => {
      setTestProgress(92);
    });

    $("testTriggerButton")?.addEventListener("click", () => {
      setTestProgress(100);
    });

    $("testResetButton")?.addEventListener("click", resetTest);

    $("takeoverResetButton")?.addEventListener("click", resetTest);

    let alreadyCompleted = false;

    try {
      alreadyCompleted =
        localStorage.getItem(CONFIG.completedKey) === "1";
    } catch (_) {}

    if (alreadyCompleted && Date.now() >= CONFIG.finaleDate.getTime()) {
      takeoverStarted = true;
      document.body.classList.add("convergence-ended");

      if (elements.systemLabel) {
        elements.systemLabel.textContent = "SIGNAL LOST";
      }

      if (elements.takeover) {
        elements.takeover.hidden = false;
        elements.takeover.classList.add("is-visible");
      }
    } else {
      updateProgression();
    }

    window.setInterval(updateProgression, 1000);
    window.setInterval(renderQuests, 60000);
    window.setInterval(createParticle, CONFIG.particleInterval);
  }

  // Console controls for rapid testing.
  window.TheGame2026 = {
    getConvergence: () => calculateProgress(),
    getStage: () => getStage(calculateProgress()),
    getNextMilestone: () =>
      Math.min(100, Math.ceil((calculateProgress() + 0.001) / 10) * 10),

    refresh: () => {
      updateProgression();
      renderQuests();
    },

    testApproach: () => setTestProgress(92),

    testConvergence: () => {
      if (TEST_MODE) setTestProgress(100);
    },

    resetTest,

    setTestProgress: value => setTestProgress(value),

    isTestMode: () => TEST_MODE
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})()