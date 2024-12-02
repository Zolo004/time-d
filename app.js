let currentIndex = 0;
        const boxes = document.querySelectorAll(".box1");
        const toggleButton = document.getElementById("bot");

        toggleButton.addEventListener("click", () => {
            boxes[currentIndex].style.visibility = "hidden";
            currentIndex = (currentIndex + 1) % boxes.length;
            boxes[currentIndex].style.visibility = "visible";

            const { x, y } = getRandomPosition();
            toggleButton.style.left = `${x}px`;
            toggleButton.style.top = `${y}px`;
        });

        function getRandomPosition() {
            const maxX = window.innerWidth - toggleButton.offsetWidth;
            const maxY = window.innerHeight - toggleButton.offsetHeight;
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            return { x: randomX, y: randomY };
        }

        boxes.forEach((box) => {
            box.style.visibility = "visible";
        });

        const hours = document.querySelector("#hours");
        const minutes = document.querySelector("#minutes");
        const seconds = document.querySelector("#seconds");
        const startBtn = document.querySelector("#start-btn");
        const stopBtn = document.querySelector("#stop-btn");
        const resetBtn = document.querySelector("#reset-btn");
        const lapBtn = document.querySelector("#lap-btn");
        const lapList = document.querySelector("#lap-list");

        let i = 0;
        let timer = null;
        let laps = [];

        function updateTime() {
            const h = Math.floor(i / 3600);
            const m = Math.floor((i % 3600) / 60);
            const s = i % 60;

            hours.innerText = h < 10 ? "0" + h : h;
            minutes.innerText = m < 10 ? "0" + m : m;
            seconds.innerText = s < 10 ? "0" + s : s;
        }

        startBtn.addEventListener("click", () => {
            if (!timer) {
                timer = setInterval(() => {
                    i++;
                    updateTime();
                }, 1000);
            }
        });


        stopBtn.addEventListener("click", () => {
            clearInterval(timer);
            timer = null;
        });

        resetBtn.addEventListener("click", () => {
            clearInterval(timer);
            timer = null;
            i = 0;
            updateTime();
            lapList.innerHTML = "";
        });

        lapBtn.addEventListener("click", () => {
            const lapTime = {
                hours: hours.innerText,
                minutes: minutes.innerText,
                seconds: seconds.innerText,
            };
            laps.push(lapTime);

            const lapItem = document.createElement("li");
            lapItem.innerText = `Lap ${laps.length}: ${lapTime.hours}:${lapTime.minutes}:${lapTime.seconds}`;
            lapList.appendChild(lapItem);
        });