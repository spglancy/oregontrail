class Caravan {
    constructor(day, distance, crew, food, oxen, money, weapons) {
        this.day = day;
        this.distance = distance;
        this.crew = crew;
        this.food = food;
        this.oxen = oxen;
        this.money = money;
        this.weapons = weapons;
        this.capacity = (this.oxen * trail.oxCapacity) + (this.crew * trail.personCapacity);
        this.weight = (this.food * trail.foodWeight) + (this.weapons * trail.weaponWeight);
        this.running = false;
    }

    checkWeight() {
        let droppedFood = 0;
        let droppedGuns = 0;
        while(this.firepower && this.capacity <= this.weight) {
            this.firepower--;
            this.weight -= trail.weaponWeight;
            droppedGuns++;
        }

        if(droppedGuns) {
            this.notify(`Left ${droppedGuns} guns behind`, 'bad');
        }

        while(this.food && this.capacity <= this.weight) {
            this.food--;
            this.weight -= trail.foodWeight;
            droppedFood++;
          }

        if(droppedFood) {
              this.notify(`Left ${droppedFood} meals behind`, 'bad');
        }
    }

    updateDist() {
        const diff = this.capacity - this.weight;
        const speed = trail.slowSpeed + (diff/this.capacity) * trail.fullSpeed;
        this.distance += speed;
    }

    eat() {
        this.food -= trail.foodPerPerson * this.crew;
        if(this.food < 0) {
            this.food = 0;
        }
    }

    start() {
        this.running = true;
        this.previousTime = null;
        this.notify('A great adventure begins', 'positive');
        this.step();
    }

    step() {
        this.eat();
        this.checkWeight();
        this.updateDist();
        this.stateCheck();
        this.updateIndex();
        this.day += 1;
        if(Math.random() < .15){
            trail.randomEvent();
        }
        if(this.running){
            setTimeout(this.step.bind(this), 300)
        }
    }

    stateCheck() {
        if(this.crew <= 0) {
            this.notify("Everyone died... RIP", 'negative');
            this.running = false;
        }
        if(this.food <= 0) {
            this.notify("Everyone starved... RIP", 'negative');
            this.running = false;
        }
        if(this.distance >= trail.winDistance) {
            this.notify("You Win", 'positive');
            this.running = false;
        }
    }

    pause() {
        if(this.running) {
            this.running = false;
        } else {
            this.running = true;
        }
    }

    notify(message, type) {
        document.getElementById('updates-area').innerHTML += '<div class="update-' + type + '">Day '+ Math.ceil(this.day) + ': ' + message+'</div>'
    }

    updateIndex() {
        document.getElementById('stat-day').innerHTML = Math.ceil(this.day);
        document.getElementById('stat-distance').innerHTML = Math.floor(this.distance);
        document.getElementById('stat-crew').innerHTML = this.crew;
        document.getElementById('stat-oxen').innerHTML = this.oxen;
        document.getElementById('stat-food').innerHTML = Math.ceil(this.food);
        document.getElementById('stat-money').innerHTML = this.money;
        document.getElementById('stat-firepower').innerHTML = this.weapons;
        document.getElementById('stat-weight').innerHTML = Math.ceil(this.weight) + '/' + this.capacity;
        document.getElementById('caravan').style.left = (380 * this.distance/trail.winDistance) + 'px';
    }
};
