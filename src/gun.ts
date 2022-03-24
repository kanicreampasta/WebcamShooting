type GunRate = {
    type: 'semi',
    minInterval: number
} | {
    type: 'auto',
    rate: number
};

export class Gun {
    remainingBulletsInMagazine: number;
    outOfMagazine: number;
    isReloading = false;

    constructor(private magazineSize: number, public rate: GunRate, public reloadTime: number) {
        this.remainingBulletsInMagazine = magazineSize;
    }

    completeReload() {
        if (this.outOfMagazine < this.magazineSize) {
            this.remainingBulletsInMagazine = this.outOfMagazine;
        } else {
            this.remainingBulletsInMagazine = this.magazineSize;
        }
        this.outOfMagazine = Math.max(0, this.outOfMagazine - this.remainingBulletsInMagazine);
    }

    setTotalBullets(n: number) {
        this.outOfMagazine = n;
    }

    shootNow(): boolean {
        if (this.remainingBulletsInMagazine <= 0) {
            return false;
        }
        this.remainingBulletsInMagazine -= 1;
        return true;
    }
}