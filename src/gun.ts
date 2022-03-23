export class Gun {
    private remainingBulletsInMagazine: number;
    private totalBullets: number;

    constructor(private magazineSize: number) {
        this.remainingBulletsInMagazine = magazineSize;
    }

    reload() {
        if (this.totalBullets < this.magazineSize) {
            this.remainingBulletsInMagazine = this.totalBullets;
        } else {
            this.remainingBulletsInMagazine = this.magazineSize;
        }
    }

    setTotalBullets(n: number) {
        this.totalBullets = n;
    }

    shoot(): boolean {
        if (this.remainingBulletsInMagazine <= 0) {
            return false;
        }
        this.remainingBulletsInMagazine -= 1;
        this.totalBullets -= 1;
        return true;
    }
}