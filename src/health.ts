type HealthType = "armour" | "flesh";

const MAX_ARMOUR_HEALTH = [
  {level: 0, value: 10},
  {level: 1, value: 20},
  {level: 2, value: 50},
];
const MAX_FLESH_HEALTH = 50;

export class PlayerHealth {
  armourLevel: number;
  remainingHealth : {
    armour: number,
    flesh: number
  };
  isHealing : {
    status: boolean,
    healTarget? : HealthType
  };

  constructor(armourLevel: number) {
    this.armourLevel = armourLevel;
    this.remainingHealth = {
      armour: this.getMaxArmourValue(armourLevel),
      flesh: MAX_FLESH_HEALTH
    }
  }

  heal(healthType: HealthType): boolean {
    let isHealed = false;
    switch (healthType) {
      case "armour":
        const maxArmourValue = this.getMaxArmourValue(this.armourLevel);
        if (this.remainingHealth.armour < maxArmourValue) {
          this.remainingHealth.armour = maxArmourValue;
          isHealed = true;
        }
        break;
      case "flesh":
        if (this.remainingHealth.flesh < MAX_FLESH_HEALTH) {
          this.remainingHealth.flesh = MAX_FLESH_HEALTH;
          isHealed = true;
        }
        break;
    }
    return isHealed;
  }

  private getMaxArmourValue(armourLevel): number {
    const armour = MAX_ARMOUR_HEALTH.find(e => e.level === armourLevel);
    if (armour == undefined) return 0
    return armour.value;
  }
}