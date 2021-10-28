function newChar() {
    let gene = Math.floor(random(63, 122));
    if(gene === 63) gene = 32;
    if(gene === 64) gene = 46;

    return String.fromCharCode(gene);
}

function DNA(length) {

    this.fitness = 0;
    this.genes = [];
    for(let i = 0; i < length; i++){
        

        this.genes[i] = newChar();
    }

    this.calcFitness = function(target){
        let score = 0;
        for(let i = 0; i < this.genes.length; i++) {
            if(this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    this.crossover = function(partner) {
        let child = new DNA(this.genes.length);

        let midpoint = floor(random(this.genes.length));

        for(let i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    this.mutate = function(mutationRate) {
        for(let i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}