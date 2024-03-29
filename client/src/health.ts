const MAX_HEALTH = 51;

export class PlayerHealth {
  remainingHealth: number;
  isHealing: {
    status: boolean;
  } = {
    status: false,
  };

  constructor() {
    this.remainingHealth = MAX_HEALTH;
  }

  heal(healAmount: number): boolean {
    let isHealed = false;
    if (this.remainingHealth < MAX_HEALTH) {
      this.remainingHealth = Math.min(
        this.remainingHealth + healAmount,
        MAX_HEALTH
      );
      isHealed = true;
    }
    return isHealed;
  }

  damage(damageAmount: number): boolean {
    let isAlive = true;
    const newHealth = this.remainingHealth - damageAmount;
    if (newHealth <= 0) {
      isAlive = false;
      this.remainingHealth = 0;
    } else {
      this.remainingHealth = newHealth;
    }
    return isAlive;
  }

  getMaxHealthValue(): number {
    return MAX_HEALTH;
  }

  isDead(): boolean {
    return this.remainingHealth <= 0;
  }
}
