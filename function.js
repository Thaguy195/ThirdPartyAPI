$(document).ready(function() {

    const list = $(".savedText").length;
    let adjustedCurrentHour = 13;
    $("#date-display").text(moment().format('MMMM Do, YYYY'));

    const refreshTime = () => {
        const currentHour = parseInt(moment().format("h"));
        const amOrPm = moment().format("a");
        if (amOrPm === "pm") {
            adjustedCurrentHour = currentHour + 12;
        } else {
            adjustedCurrentHour = currentHour;
        }
        updateScheduleDisplay();
    }

    const updateScheduleDisplay = () => {
        for (let i = 0; i < list; i++) {
            const adjustedIndex = i + 7;
            if (adjustedIndex < adjustedCurrentHour) {
                $(`*[data-input=${adjustedIndex}]`).attr("class", "gray savedText");
            } else if (adjustedIndex == adjustedCurrentHour) {
                $(`*[data-input=${adjustedIndex}]`).attr("class", "active savedText");
            } else {
                $(`*[data-input=${adjustedIndex}]`).attr("class", "future savedText");
            }
        }
    }

    setInterval(refreshTime, 60000);

    refreshTime();

    const refreshInputs = () => {
        for (let i = 0; i < list; i++) {
            const adjustedIndex = i + 7;
            const storedInput = localStorage.getItem("inputText" + adjustedIndex);
            $(`*[data-input=${adjustedIndex}]`).val(storedInput);
        }
    }
    refreshInputs();

    $(".saveBtn").on("click", function(e) {
        e.preventDefault();
        const btnId = $(this).attr("data-btn");
        localStorage.setItem("inputText" + btnId, $(`*[data-input=${btnId}]`).val());
    });

    $("#clear-storage").on("click", function(e) {
        e.preventDefault();
        localStorage.clear();
        refreshInputs();
    })

});