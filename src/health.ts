type HealthType = "armour" | "flesh";

const MAX_ARMOUR_HEALTH = [
  {level: 0, value: 10},
  {level: 1, value: 20},
  {level: 2, value: 50},
];
const MAX_FLESH_HEALTH = 51;

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

  receiveDamage(damage: number): boolean {
    let isAlive = true;
    // TODO: Consider armour health
    const newHealth = this.remainingHealth.flesh - damage;
    if (newHealth <= 0) {
      isAlive = false
    } else {
      this.remainingHealth.flesh = newHealth;
    }
    return isAlive;
  }

  setArmour(armourLevel: number): boolean {
    let isArmourSet = false;
    if (armourLevel > this.armourLevel) {
      this.armourLevel = armourLevel;
      this.remainingHealth.armour = this.getMaxArmourValue(armourLevel);
      isArmourSet = true;
    }
    return isArmourSet;
  }

  getMaxArmourValue(armourLevel: number): number {
    const armour = MAX_ARMOUR_HEALTH.find(e => e.level === armourLevel);
    if (armour == undefined) return 0
    return armour.value;
  }

  getMaxFleshValue(): number {
    return MAX_FLESH_HEALTH;
  }
}