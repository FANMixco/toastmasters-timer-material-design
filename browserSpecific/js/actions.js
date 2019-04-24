let audioBeepElement, audioElementClapping;
let os = getMobileOperatingSystem();

function browserStartBeep() {
    if (isBeepEnabled === "true" && !(os == "iOS" || os == "Android")) {
        if (green === 1 || yellow === 1 || red === 1) {
            audioBeepElement.play();
            setTimeout(function() {
                audioBeepElement.pause();
            }, 500);
        } else {
            audioBeepElement.pause();
        }
    }
}

function browserStartVibrate() {
    if (isVibrateEnabled === "true")
        if (green === 1 || yellow === 1 || red === 1)
            if (hasVibrator)
                navigator.vibrate(1000);
}

function browserStartClapping() {
    if (isClappingEnabled === "true" && !(os == "iOS" || os == "Android")) {
        audioElementClapping.play();
        setTimeout(function() {
            audioElementClapping.pause();
        }, 1500);
    }
}

function browserStopClapping() {
    if (!(os == "iOS" || os == "Android"))
        audioElementClapping.pause();
}

if (!(os == "iOS" || os == "Android")) {
    audioBeepElement = document.createElement('audio');
    audioBeepElement.setAttribute('src', './browserSpecific/sounds/beep.mp3');

    audioBeepElement.addEventListener('ended', function() {
        this.play();
    }, false);

    audioBeepElement.addEventListener("canplay", function() {});

    audioBeepElement.addEventListener("timeupdate", function() {});

    audioElementClapping = document.createElement('audio');
    audioElementClapping.setAttribute('src', './browserSpecific/sounds/clapping.mp3');

    audioElementClapping.addEventListener('ended', function() {
        this.play();
    }, false);

    audioElementClapping.addEventListener("canplay", function() {});

    audioElementClapping.addEventListener("timeupdate", function() {});
    
    btnVibrate.style.display = 'none';
    btnShare.style.display = 'none';
    btnEmail.style.display = 'none';

    document.body.insertBefore(audioBeepElement, document.getElementById("snackbarMsg"));
    document.body.insertBefore(audioElementClapping, document.getElementById("snackbarMsg"));
} else {
    btnClap.style.display = 'none';
    btnBeep.style.display = 'none';
}

function browserExport() {
    showSnackbar(lngObject.lblExportMsg);
    setTimeout(function() {
        var doc = new jsPDF('l', 'pt', 'a4');
        var res = doc.autoTableHtmlToJson(document.getElementById("tblResults"));
        doc.autoTable(res.columns, res.data, {
            startY: 60
        });
        doc.save();
    }, 250);
}
