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
        const event = events[Math.floor(Math.random() * 14)];
        // const event = events[12];
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
            const leave = document.getElementById("leave");
            const shop = document.getElementById("shop");
            shop.style.display = "flex";
            item1.innerHTML = `${event.products[0].qty} ${event.products[0].item} for ${event.products[0].price}$`;
            item2.innerHTML = `${event.products[1].qty} ${event.products[1].item} for ${event.products[1].price}$`;
            item3.innerHTML = `${event.products[2].qty} ${event.products[2].item} for ${event.products[2].price}$`;
            item4.innerHTML = `${event.products[3].qty} ${event.products[3].item} for ${event.products[3].price}$`;
            let resume = function(){
                caravan.pause();
                shop.style.display = "none";
                caravan.step();
                var new_element1 = item1.cloneNode(true);
                var new_element2 = item2.cloneNode(true);
                var new_element3 = item3.cloneNode(true);
                var new_element4 = item4.cloneNode(true);
                var new_element5 = leave.cloneNode(true);
                item1.parentNode.replaceChild(new_element1, item1);
                item2.parentNode.replaceChild(new_element2, item2);
                item3.parentNode.replaceChild(new_element3, item3);
                item4.parentNode.replaceChild(new_element4, item4);
                leave.parentNode.replaceChild(new_element5, leave);
            }
            leave.addEventListener("click", () => {resume()});
            let buy = function(index){
                let product = event.products[index].item;
                if(caravan.money > event.products[index].price){
                switch(product){
                    case 'food':
                    caravan.food += event.products[index].qty;
                    break;
                    case 'oxen':
                    caravan.oxen += event.products[index].qty;
                    break;
                    case 'firepower':
                    caravan.weapons += event.products[index].qty;
                    break;
                    case 'crew':
                    caravan.crew += event.products[index].qty;
                }
                caravan.notify(`Bought ${event.products[index].qty} ${event.products[index].item}`)
                caravan.money -= event.products[index].price;
                caravan.updateIndex();
                }else{
                    caravan.notify("Not Enough Money")
                }
            }
            item1.addEventListener("click",() => {buy(0)});
            item2.addEventListener("click",() => {buy(1)});
            item3.addEventListener("click",() => {buy(2)});
            item4.addEventListener("click",() => {buy(3)});

            //unhide the html
        } else if(event.type == 'ATTACK'){
            caravan.pause();
            const display = document.getElementById("fight-display");
            const run = document.getElementById("run");
            const fight = document.getElementById("fight");
            display.style.display = "flex";
            let firepower = Math.ceil(10 * Math.random());
            caravan.notify(event.text, event.notification)
            let damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - caravan.weapons));
            fight.addEventListener('click', function(){
                if(damage == 0){
                    caravan.notify("You beat them with no casualties!", 'positive')
                }
                else if(caravan.crew > damage){
                    caravan.crew -= damage;
                    caravan.notify(`${damage} people were killed in battle`, 'negative');
                } else if(damage > caravan.crew){
                    caravan.notify("Everyone died in battle");
                    caravan.running = false;
                }
                caravan.updateIndex();
                caravan.pause();
                caravan.step();
                display.style.display = "none";
                var new_run = run.cloneNode(true);
                run.parentNode.replaceChild(new_run, run);
                var new_fight = fight.cloneNode(true);
                fight.parentNode.replaceChild(new_fight, fight);
            });
            run.addEventListener('click', function(){
                if(damage == 0){
                    caravan.notify("You got away with no casualties!", 'positive')
                }
                else if(caravan.crew > damage){
                    caravan.crew -= Math.floor(damage/2);
                    caravan.notify(`${damage} people were killed running away`, 'negative');
                } else if(damage > caravan.crew){
                    caravan.notify("Everyone died running away");
                    caravan.running = false;
                }
                caravan.updateIndex();
                caravan.pause();
                caravan.step();
                display.style.display = "none";
                var new_run = run.cloneNode(true);
                run.parentNode.replaceChild(new_run, run);
                var new_fight = fight.cloneNode(true);
                fight.parentNode.replaceChild(new_fight, fight);
            });
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
