type HealthType = "armour" | "flesh";

const MAX_ARMOUR_HEALTH = [
  {level: 0, value: 0},
  {level: 1, value: 20},
  {level: 2, value: 50},
]

export class PlayerHealth {
  armourLevel: number;
  remainingHealth : {
    healthType: HealthType,
    value: number
  };
  isHealing : {
    status: boolean,
    healTarget : HealthType
  };

  constructor(remainingHealth: number) {
    this.armourLevel = 0;
    this.remainingHealth = {
      healthType : "flesh",
      value: remainingHealth
    }
  }

  healed(healthType: HealthType): boolean {
    let isHealed = false;
    switch (healthType) {
      case "armour":
        break;
      case "flesh":
        break;
    }
    return isHealed;
  }
}