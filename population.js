function Population(target, maxPop, mutationRate) {
    this.target = target;
    this.mutationRate = mutationRate;
    this.generations = 0;
    this.isFinished = false;
    this.pop = [];
    this.matingPool = [];
    for(let i = 0; i < maxPop; i++) {
        this.pop[i] = new DNA(this.target.length);
    }

    this.calcFitness = function(){
        for(let i = 0; i < this.pop.length; i++) {
            this.pop[i].calcFitness(target);
        }
        
    }
    //this.calcFitness();

    this.naturalSelection = function() {
        this.matingPool = [];

        let maxFitness = 0;
        for(let i = 0; i < this.pop.length; i++) {
            if(this.pop[i].fitness > maxFitness){
                maxFitness = this.pop[i].fitness;
            }
        }

        for(let i = 0; i < this.pop.length; i++) {
            
            let fitness = map(this.pop[i].fitness, 0, maxFitness, 0, 1)
            let n = floor(fitness * 100);
            for(let j = 0; j < n; j++){
                this.matingPool.push(this.pop[i]);
            }
        }
    }

    this.generate = function() {

        for(let i = 0; i < this.pop.length; i++){
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.pop[i] = child;
        }
        this.generations++;
    }

    this.evaluate = function() {
        for(let i = 0; i < this.pop.length; i++) {
            let test = this.pop[i].genes.join("");
            if(this.generations % 50 == 0){
                console.log(test);
            }
            if(this.generations % 500 == 0){
                console.clear();
            }
            if(test == this.target) {
                this.isFinished = true;
                break;
            }
        }
        if(this.isFinished) {
            console.log(this.target);
        }
    }
    
    this.getGenerations = function() {
        return this.generations
    }

    this.getAverageFitness = function() {
        let total = 0;
        for (let i = 0; i < this.pop.length; i++) {
            this.pop[i].calcFitness(this.target);
            total += this.pop[i].fitness;
        }
        return total / (this.pop.length);
      }
}