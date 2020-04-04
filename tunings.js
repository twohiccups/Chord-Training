Tunings = {
    prepareChordJust: function(base) {
        const freqs = []
        chord.forEach((item) => {
            freqs.push(ratiosMap[item].ratio * base);
        });
        return freqs;
    },
    prepareChord12Tet: function(base) {
        const freqs = []
        chord.forEach((item, index) => {
           freqs.push(base * (root12_2 ** (parseInt(item) - 1)));
        });
        return freqs;
    }
}