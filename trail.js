class Trail {
    constructor() {
        this.oxCapacity = 20;
        this.personCapacity = 2;
        this.foodWeight = 0.6;
        this.weaponWeight = 5;
        this.gameSpeed = 800;
        this.dayPerStep = 0.2;
        this.foodPerPerson = 0.02;
        this.fullSpeed = 5;
        this.slowSpeed = 3;
        this.winDistance = 1000;
        this.eventProb = 0.15;
        this.enemyAttack = 5;
        this.enemyGoldAvg= 50;
    }

    notify(message, type) {
      console.log(message + ' - ' + type);
    }

    refresh() {
        console.log(caravan);
    }
}
