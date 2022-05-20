const MAX_HEALTH = 51;

export class PlayerHealth {
  remainingHealth: number;
  isHealing: {
    status: boolean,
  };

  constructor() {
    this.remainingHealth = MAX_HEALTH
  }

  heal(healAmount: number): boolean {
    let isHealed = false;
    if (this.remainingHealth < MAX_HEALTH) {
      this.remainingHealth = Math.min(this.remainingHealth + healAmount, MAX_HEALTH)
      isHealed = true;
    }
    return isHealed;
  }

  damage(damageAmount: number): boolean {
    const newHealth = this.remainingHealth - damageAmount;
    this.remainingHealth = newHealth;
    return newHealth > 0;
  }

  getMaxHealthValue(): number {
    return MAX_HEALTH;
  }
}