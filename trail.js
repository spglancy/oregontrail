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
        let event = events[Math.floor(Math.random() * 11)];
        caravan.notify(event.text, event.notification);
        if(event.type == 'STAT-CHANGE'){
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
        } else if(event.type == 'SHOP'){
            caravan.pause();
            const item1 = document.getElementById("item1");
            const item2 = document.getElementById("item2");
            const item3 = document.getElementById("item3");
            const item4 = document.getElementById("item4");
            const shop = document.getElementById("event-area");
            shop.style.display = "flex";
            item1.innerHTML = `${event.products[1].qty} ${event.products[1].item} for ${event.products[1].price}$`;
            item2.innerHTML = `${event.products[2].qty} ${event.products[2].item} for ${event.products[2].price}$`;
            item3.innerHTML = `${event.products[3].qty} ${event.products[3].item} for ${event.products[3].price}$`;
            item4.innerHTML = `${event.products[0].qty} ${event.products[0].item} for ${event.products[0].price}$`;
            document.getElementById("leave").addEventListener("click", function(){
                caravan.pause();
                shop.style.display = "none";
            });
            item1.addEventListener("click", function(){
                caravan.event.products[1].item += event.products[1].qty;
            });
            //unhide the html
        } else if(event.type == 'ATTACK'){

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
},
    {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      {item: 'food', qty: 20, price: 50},
      {item: 'oxen', qty: 1, price: 200},
      {item: 'firepower', qty: 2, price: 50},
      {item: 'crew', qty: 5, price: 80}
    ]
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      {item: 'food', qty: 30, price: 50},
      {item: 'oxen', qty: 1, price: 200},
      {item: 'firepower', qty: 2, price: 20},
      {item: 'crew', qty: 10, price: 80}
    ]
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Smugglers sell various goods',
    products: [
      {item: 'food', qty: 20, price: 60},
      {item: 'oxen', qty: 1, price: 300},
      {item: 'firepower', qty: 2, price: 80},
      {item: 'crew', qty: 5, price: 60}
    ]
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Bandits are attacking you'
  }];
