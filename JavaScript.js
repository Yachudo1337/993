const tracklist = [
    { name: "彼女が12-14年間自分を切", url: "彼女が12-14年間自分を切.mp3" },
    { name: "De Kieru", url: "De Kieru.mp3" },
    { name: "Сид Spears", url: "Сид Spears.mp3" },
    { name: "Atd.$r20.file", url: "Atd.$r20.file.mp3" },
    { name: "unforeseen dream scenarios...", url: "unforeseen dream scenarios that glorify the beauty of a vacuum cleaner.mp3" },
    { name: "Various Types Of Ads", url: "Various Types Of Ads.mp3" },
    { name: "変態", url: "変態.mp3" },
    { name: "KATAMARI", url: "KATAMARI.mp3" },
    { name: "143 ways to lose urself", url: "143 ways to lose urself.mp3" },
    { name: "Disposition", url: "Disposition.mp3" }
];

let score = 0;
let currentTrack = null;
let shuffleQueue = []; // Очередь для "честного" рандома
const player = document.getElementById('audio-player');

// Функция для перемешивания массива (Алгоритм Фишера-Йейтса)
function shuffleArray(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function initRound() {
    document.getElementById('status-msg').innerText = "";
    document.getElementById('main-action-btn').style.display = "none";
    document.getElementById('viz-text').innerText = "PLAYING_SOURCE...";

    // Если очередь пуста, создаем новую перемешанную копию плейлиста
    if (shuffleQueue.length === 0) {
        shuffleQueue = shuffleArray(tracklist);
        console.log("Очередь обновлена");
    }

    // Берем первый трек из очереди и удаляем его оттуда
    currentTrack = shuffleQueue.shift();

    player.src = currentTrack.url;
    player.play().catch(e => {
        document.getElementById('status-msg').innerText = "ERROR: ФАЙЛ НЕ НАЙДЕН";
    });

    // Подбор 3-х неправильных вариантов (они могут повторяться, главное — правильный уникален)
    let choices = [currentTrack.name];
    while (choices.length < 4) {
        let r = tracklist[Math.floor(Math.random() * tracklist.length)].name;
        if (!choices.includes(r)) choices.push(r);
    }
    choices.sort(() => Math.random() - 0.5);

    const box = document.getElementById('options-box');
    box.innerHTML = '';
    choices.forEach(choice => {
        const b = document.createElement('button');
        b.className = 'answer-btn';
        b.innerText = choice;
        b.onclick = () => {
            const allBtns = document.querySelectorAll('.answer-btn');
            allBtns.forEach(btn => btn.disabled = true);

            if (choice === currentTrack.name) {
                b.classList.add('correct');
                score += 100;
                document.getElementById('status-msg').innerText = "CORRECT_ID";
            } else {
                b.classList.add('wrong');
                document.getElementById('status-msg').innerText = "WRONG_ID";
                allBtns.forEach(btn => {
                    if (btn.innerText === currentTrack.name) btn.classList.add('correct');
                });
            }
            document.getElementById('score').innerText = score;
            setTimeout(() => {
                document.getElementById('main-action-btn').style.display = "block";
                document.getElementById('main-action-btn').innerText = "СЛЕДУЮЩИЙ ТРЕК";
            }, 1000);
        };
        box.appendChild(b);
    });
}