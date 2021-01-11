export class L5R4EdActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["l5r4ed", "sheet", "actor"],
      template: "systems/l5r4ed/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description",
        },
      ],
    });
  }

  getData() {
    const sheetData = super.getData();

    this._prepareItems(sheetData);

    return sheetData;
  }

  _updateObject(event, formData) {
    return this.object.update(formData);
  }

  _prepareItems(sheetData) {
    for (let item of sheetData.items) {
      if (item.type === "weapon") {
        item.isWeapon = true;
        item.isEquipment = true;
      } else if (item.type === "feat") {
        item.isFeat = true;
      } else {
        item.isEquipment = true;
      }
    }
  }

  activateListeners(html) {
    super.activateListeners(html);

    if (!this.options.editable) return;

    html.find(".rollable[data-action]").click(this._onSheetAction.bind(this));
  }

  _onSheetAction(event) {
    event.preventDefault();
    const button = event.currentTarget;

    switch (button.dataset.action) {
      case "rollEarth":
        return this.actor.rollEarth();
    }
  }
}
