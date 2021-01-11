export class L5R4EdActor extends Actor {
  static async create(data, options = {}) {
    if (!Object.keys(data).includes("types")) data.type = "character";
    await super.create(data, options);
  }

  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const isCharacter = actorData.type === "character";

    if (isCharacter) {
      data.earth.value =
        data.earth.stamina < data.earth.willpower
          ? data.earth.stamina
          : data.earth.willpower;

      data.fire.value =
        data.fire.agility < data.fire.intelligence
          ? data.fire.agility
          : data.fire.intelligence;

      data.water.value =
        data.water.strength < data.water.perception
          ? data.water.strength
          : data.water.perception;

      data.air.value =
        data.air.reflex < data.air.awareness
          ? data.air.reflex
          : data.air.awareness;

      data.void.value =
        data.void.value < data.void.max ? data.void.max : data.void.current;
    }
  }

  async rollEarth() {
    ChatMessage.create({
      content:
        "/r " + this.data.data.earth.value + "k" + this.data.data.earth.value,
    });
    console.log("Earth Value:" + this.data.data.earth.value);
  }
}
