Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

String.prototype.toPascalCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
};
class Name {
    constructor() {
        this.words = [
            'inertia',
            'cloud',
            'kit',
            'frame',
            'simple',
            'service',
            'manager',
            'endpoint',
            'managed',
            'cinnamon',
            'steel',
            'gateway',
            'tunnel',
            'cardamom',
            'blockchain',
            'IoT',
            'eta',
            'iota',
            'kappa',
            'mu',
            'pi',
            'sigma',
            'omega',
            'tau',
            'gamma',
            'zeta',
            'epsilon',
            'network',
            'key',
            'space',
            'block',
            'comma',
            'chain',
            'corporeal',
            'celestial',
            'aperture',
            'lens',
            'asteroid',
            'constellation',
            'nebula',
            'time',
            'quantum',
            'compute',
            'store',
            'speed',
            'rainbow',
            'plasma',
            'shallow',
            'database',
            'guard',
            'rainbow',
        ];

        this.suffixes = [
            'service',
            'manager',
            'endpoint',
            'gateway',
            'network',
            'explorer',
            'database',
            'registry',
            'system',
        ];

        this.names = [
            'eris',
            'ponos',
            'theseus',
            'minotaur',
            'earthshine',
            'ecliptic',
            'equinox',
            'meridian',
            'milky way',
            'solstice',
            'sidereal',
            'zenith',
            'susan',
        ];

        this.partials = [
            'far',
            'con',
            'red',
            'green',
            'blue',
            'rainbow',
            'plasma',
            'event',
            'app',
            'work',
            'stream',
            'link',
            'maker',
            'deep',
            'flame',
            'wave',
            'super',
            'fish',
            'dark',
            'light',
            'space',
            'star',
            'sun',
        ];

        this.prefixes = ['Amazon', 'AWS'];

        this.lettersOnlyChance = 15;
        this.nameOnlyChance = 15;
        this.buildWordChance = 35;
        this.suffixChance = 20;
    }

    raffle(pctWinChance) {
        var draw = this.getRandomNum(100);
        return draw <= pctWinChance;
    }

    getRandomNum(max) {
        return Math.floor(Math.random() * max);
    }

    build(name) {
        return this.prefixes.random() + ' ' + name;
    }

    generate() {
        let result;

        if (this.raffle(this.lettersOnlyChance)) {
            // Combine random letters
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let numLetters = 3;
            let c = '';
            this.suffixChance = 10; // decrease suffix chance

            for (var i = 0; i < numLetters; i++) {
                c += characters.charAt(
                    this.getRandomNum(characters.length - 1)
                );
            }

            // If the last two letters are the same, make the last character a 2
            if (c.charAt(1) === c.charAt(2)) {
                if (c.charAt(0) === c.charAt(2)) {
                    // If all three characters are the same, make the last character a 3 (only two characters long)
                    c = c.substr(0, 1) + '3';
                } else {
                    c = c.substr(0, 2) + '2';
                }
            }

            result = this.build(c);
        } else if (this.raffle(this.nameOnlyChance)) {
            // Single-word name
            result = this.build(this.names.random().toPascalCase());
        } else if (this.raffle(this.buildWordChance)) {
            // Build name from words
            let numWords = this.getRandomNum(3) + 1;
            let w = [];

            for (let i = 0; i < numWords; i++) {
                w.push(this.words.random().toPascalCase());
            }

            result = this.build(w.join(' '));
        } else {
            // Build from partials
            let numParts = this.getRandomNum(3) + 1;
            let w = [];

            for (let i = 0; i < numParts; i++) {
                w.push(this.partials.random().toPascalCase());
            }

            result = this.build(w.join(''));
        }

        if (this.raffle(this.suffixChance)) {
            result += ' ' + this.suffixes.random().toPascalCase();
        }

        return result;
    }

    render() {
        document.getElementById('result').innerHTML = this.generate();
    }
}

// Key listener for generating a new name
document.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {
        new Name().render();
    }
});

// Generate a new name now
new Name().render();
