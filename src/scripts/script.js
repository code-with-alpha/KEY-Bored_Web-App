const paragraphs = [
    "the quick brown fox jumps over the lazy dog and then it runs swiftly across the meadow chasing butterflies and enjoying the warm sunlight in the distance a gentle breeze whispers through the trees carrying the scent of blooming flowers and fresh grass every now and then a bird chirps melodiously adding to the peaceful symphony of nature as the sun shines brightly in the clear blue sky with a few puffy white clouds drifting lazily by",
    "underneath the starlit sky the ocean waves gently lap against the shore creating a soothing rhythm that lulls the mind into tranquility the moon full and bright casts a silvery glow across the water making it shimmer like a thousand tiny diamonds on the beach a few scattered seashells glisten as they catch the light telling stories of the deep and distant past where the ocean's secrets lie hidden beneath the waves",
    "beyond the rolling hills and verdant valleys the village rests in serene isolation its charming cottages nestled among the trees smoke curls lazily from chimneys hinting at the warmth and comfort within children play in the fields their laughter mingling with the songs of crickets and the rustle of leaves in the evening breeze as the villagers go about their daily lives with a sense of peace and contentment",
    "a gentle rain falls softly on the rooftop creating a rhythmic patter that soothes the senses the world outside is bathed in a shimmering coat of water droplets reflecting the streetlights in a dance of colors the air is cool and fresh carrying the earthy scent of rain soaked earth and the promise of new beginnings as the rain washes away the worries of the day",
    "in the heart of the ancient forest sunlight filters through the canopy casting dappled shadows on the forest floor the air is alive with the sounds of nature from the rustling of leaves to the distant call of a woodland creature the scent of pine and damp earth fills the senses creating a tranquil haven away from the hustle of modern life where time stands still",
    "as the sun sets the sky is painted in hues of orange and pink creating a breathtaking canvas of colors the horizon glows with a warm embrace as day gives way to night stars begin to twinkle in the darkening sky like scattered gems each one telling a story of the vast and infinite universe full of mysteries waiting to be uncovered",
    "a crisp autumn breeze rustles through the trees as leaves of red and gold drift gently to the ground the air is filled with the rich scent of fallen foliage and the promise of harvest the days grow shorter and the nights longer as nature prepares for the quiet stillness of winter's peaceful slumber",
    "in a bustling city street the lights flicker and the sounds of traffic create a lively symphony of urban life amidst the chaos people move swiftly along the sidewalks each absorbed in their own world the energy is palpable as the city pulses with activity and anticipation of the next moment where dreams are made and broken",
    "deep in the desert the sun blazes down with unrelenting intensity casting long shadows across the golden sand the silence is profound broken only by the whisper of the wind as it shifts the dunes creating patterns that shift and change with each passing hour under the vast expanse of the desert sky",
    "under the wide open sky of the countryside the fields stretch out in a patchwork of green and gold the air is filled with the sweet scent of blooming wildflowers and the sound of birdsong as they flit from tree to tree the simplicity of the scene is a balm to the soul offering a moment of peace and reflection in a world that's always on the move",
    "as night falls the forest comes alive with the sounds of nocturnal creatures the hoot of an owl and the rustle of small animals in the underbrush create a symphony of night the moonlight filters through the trees casting an ethereal glow that transforms the forest into a realm of mystery and enchantment where magic is real",
    "in a quaint village square the cobblestone streets are lined with charming shops and cafes the aroma of freshly baked bread mingles with the fragrance of blooming flowers as people stroll leisurely enjoying the simple pleasures of life the sense of community and warmth is palpable in every interaction and every smile that's shared",
    "a serene lake mirrors the sky above creating a perfect reflection of clouds and trees the water is calm and still disturbed only by the occasional ripple as a fish breaks the surface the tranquility of the scene is a gentle reminder of the beauty found in moments of stillness and quiet contemplation",
    "amidst the towering skyscrapers and bustling streets of the metropolis the occasional park provides a green oasis where people can escape the frenetic pace of city life the sound of children playing and the rustling of leaves offer a brief respite from the constant noise and activity of the urban environment where nature's beauty is a rare find"
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 15;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
document.querySelector('.maxTime').innerText = maxTime;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        // console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);