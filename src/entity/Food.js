const Cell = require('./Cell');

class Food extends Cell {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 1;
        this.overrideReuse = false;
    }
    onAdd(server) {
        server.nodesFood.push(this);
    }
    onRemove(server) {
        server.nodesFood.removeUnsorted(this);
        if (!this.overrideReuse) server.spawnFood();
    }
}

class ExtraFood extends Food {
    constructor(server, owner, position, size) {
        super(server, owner, position, size);
        this.type = 10;
        this._mass = 0;
        this._radius2 = 0;
    }

    onEaten(hunter) {
        hunter.setSize(Math.sqrt(hunter._radius2) * 2);
    }
}

module.exports = {Food, ExtraFood};

