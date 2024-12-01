const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Find a valid audio URL from the phonetics array
            const phonetics = data[0]?.phonetics || [];
            let audioSrc = "";
            for (const item of phonetics) {
                if (item.audio) {
                    audioSrc = item.audio;
                    break; // Use the first valid audio URL
                }
            }

            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                ${
                    audioSrc
                        ? `<button onClick="playSound()">
                            <i class="fa fa-volume-up" aria-hidden="true"></i>
                        </button>`
                        : `<p>No audio available</p>`
                }
            </div>
            <div class="details">
                <p>${data[0]?.meanings[0]?.partOfSpeech || "N/A"}</p>
                <p>/${data[0]?.phonetic || "N/A"}/</p>
            </div>
            <p class="word-meaning">
                ${data[0]?.meanings[0]?.definitions[0]?.definition || "No definition available"}
            </p>
            <p class="word-example">
                ${data[0]?.meanings[0]?.definitions[0]?.example || ""}
            </p>`;

            // Set the audio source
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            } else {
                sound.removeAttribute("src");
            }
        })
      .catch(() => {
        result.innerHTML = `<h3 class="error"> Couldn't Find The Word </h3>`
      })
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No audio available for this word.");
    }
}
