$(document).ready(() => {
    initializeValues();

    $('#num-voices').on("change", () => {
        numVoices = $("#num-voices").val();
        $("#num-voices-display").text(numVoices + voicesMessage(numVoices));
    });

    $('#num-voices').on('input', function () {
        $(this).trigger('change');
    });

    $('#tuning-button').on('click', () => {
        var str = 'The tuning is '
        if (chordObject.tuning == 'just') {
            $('#tuning-button').text(str + '12-TET');
            chordObject.tuning = '12tet';
        } 
        else if (chordObject.tuning == '12tet') {
            $('#tuning-button').text(str + 'JUST');
            chordObject.tuning = 'just';
        }
    });

    $('svg').on("click", function (e) {
        playChord(chordObject.getRandomChord(numVoices));
    });

    $(document).on("keypress", function (e) {
        if (e.code == "Space") {
            e.preventDefault();
            var freqs = chordObject.prepareChordTuning(base);
            playChord(freqs);
        } else if (e.code == "KeyB") {
            synth.triggerAttackRelease(base, "4n");
        }
    });


});

function initializeValues() {
    $('#num-voices').val(numVoices);
    $('#num-voices-display').text(numVoices + voicesMessage(numVoices));
    $('#tuning-button').text('The tuning is ' + chordObject.tuning.toUpperCase());
}




function voicesMessage(numVoices) {
    return numVoices == 1 ? ' voice' : ' voices'
}
