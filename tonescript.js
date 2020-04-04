const ratios = [16 / 15, 9 / 8, 6 / 5, 5 / 4, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 16 / 9, 15 / 8]
const root12_2 = 1.05946309436;
const ratiosMap = {
    1: {name: "P1", ratio: 1},
    2: {name: "m2", ratio: 16 / 15},
    3: {name: "M2", ratio: 9 / 8},
    4: {name: "m3", ratio: 6 / 5},
    5: {name: "M3", ratio: 5 / 4},
    6: {name: "P4", ratio: 4 / 3},
    7: {name: "A4", ratio: 45 / 32},
    8: {name: "P5", ratio: 3 / 2},
    9: {name: "m6", ratio: 8 / 5},
    10:{name: "M6", ratio:  5 / 3},
    11:{name: "m7", ratio:  16 / 9},
    12:{name: "M7", ratio:  15 / 8}
}

var synth;
var chord;
var base;
var numVoices = 3;
const tunings = ["just", "12tet"]
$(document).ready(function () {
    //a polysynth composed of 6 Voices of Synth
    synth = new Tone.PolySynth(12, Tone.FMSynth, {
        harmonicity: 13,
        modulationIndex: 4,
        detune: 0,
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 1,
            release: 0.5
        },
        modulation: {
            type: "square"
        },
        modulationEnvelope: {
            attack: 0,
            decay: 0,
            sustain: 0,
            release: 5
        }
    })
    var comp = new Tone.Compressor();
    synth.connect(comp)
    comp.toMaster();
});

function shuffle(array) {
    for (i = array.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.random() * array.length)
        const temp = array[i]
        array[i] = array[index]
        array[index] = temp
    }
    return array;
}

var chordObject = {
    randomBase: true,
    tuning: "just",
    getRandomArray: function (n) {
        var intervals = Object.keys(ratiosMap).slice(1);
        var result = shuffle(intervals);
        result.unshift("1")
        return result.slice(0, n + 1).map((i) => parseInt(i)).sort((a,b) => {a-b})
    },
    getRandomChord: function (n) {
        if (this.randomBase) {
            base = 250 + Math.random() * 80;
        } else base = 250;
        chord = chordObject.getRandomArray(n - 1)
        return this.prepareChordTuning(base);
    },
    prepareChordTuning: function (base) {
        var preparation;
        switch (this.tuning) {
            case "just":
                preparation = Tunings.prepareChordJust
                break;
            case "12tet":
                preparation = Tunings.prepareChord12Tet
                break;
        }
        return preparation(base);
    }
}

function playChord(freqs) {
    console.log(base)
    console.log(freqs)
    console.log(chord);
    const distribution = distancesDistributionSym6(chord);
    
    console.log(distanceHistrogramSym(distribution));
    console.log(distancesDistributionSym6(chord));
    renderChord(chord)

    synth.triggerAttackRelease(freqs, "1n");
}

