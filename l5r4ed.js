import { preloadTemplates } from "./modules/preloadTemplates.js";
import { L5R4EdActorSheet } from "./modules/actors/actor-sheet.js";
import { L5R4EdActor } from "./modules/actors/actor.js";

Hooks.once("init", async function () {
  console.log("l5r4ed | Initializing l5r4ed");

  CONFIG.Actor.entityClass = L5R4EdActor;
  CONFIG.Actor.sheetClasses = L5R4EdActorSheet;

  await preloadTemplates();

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("l5r4ed", L5R4EdActorSheet, {
    types: ["character"],
    makeDefault: true,
  });

  Handlebars.registerHelper("localizeRing", function (ringName) {
    const key = "L5R4ED.Rings." + ringName;
    return game.i18n.localize(key);
  });

  Handlebars.registerHelper("localizeRingTip", function (ringName) {
    const key = "L5R4ED.Rings." + ringName + "Tip";
    return game.i18n.localize(key);
  });
});

Hooks.once("setup", function () {});

Hooks.once("ready", function () {});
