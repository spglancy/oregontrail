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

    randomEvent(){
        let event = events[Math.floor(Math.random() * 8)];
        caravan.notify(event.text, event.notification);
        if(event.stat == 'crew'){
            caravan.crew += event.value;
        }
        if(event.stat == 'money'){
            caravan.money += event.value;
        }
        if(event.stat == 'food'){
            caravan.food += event.value;
        }
        if(event.stat == 'oxen'){
            caravan.oxen += event.value;
        }
    }
    refresh() {
        console.log(caravan);
    }
}
var events = [{
type: 'STAT-CHANGE',
notification: 'negative',
stat: 'crew',
value: -3,
text: 'Food intoxication. Casualties: 3'
},
{
type: 'STAT-CHANGE',
notification: 'negative',
stat: 'crew',
value: -4,
text: 'Flu outbreak. Casualties: 4'
},
{
type: 'STAT-CHANGE',
notification: 'negative',
stat: 'food',
value: -10,
text: 'Worm infestation. Food lost: 10'
},
{
type: 'STAT-CHANGE',
notification: 'negative',
stat: 'money',
value: -50,
text: 'Pick pockets steal $50'
},
{
type: 'STAT-CHANGE',
notification: 'negative',
stat: 'oxen',
value: -1,
text: 'Ox flu outbreak. Casualties: 1'
},
{
type: 'STAT-CHANGE',
notification: 'positive',
stat: 'food',
value: 20,
text: 'Found wild berries. Food added: 20'
},
{
type: 'STAT-CHANGE',
notification: 'positive',
stat: 'food',
value: 20,
text: 'Found wild berries. Food added: 20'
},
{
type: 'STAT-CHANGE',
notification: 'positive',
stat: 'oxen',
value: 1,
text: 'Found wild oxen. New oxen: 1'
}];
