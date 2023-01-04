function initComparisons() {
    // Поиск всех элементов с классом overlay
    const pic = document.querySelectorAll(".img-comp-overlay");
    for (let i = 0; i < pic.length; i++) {
        // Для каждого элемента overlay установим overlay как параметр функции сравнения элементов
        compareImages(pic[i]);
    }

    function compareImages(img) {
        let clicked = 0;
        let pos;
        // Получим высоту и ширину элемента
        let w;
        let wOld;

        // Создадим слайдер
        const slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        // Устанавливаем слайдер
        img.parentElement.insertBefore(slider, img);
        // Позиционируем слайдер в середину изображения
        function sliderPos() {
            w = img.parentElement.offsetWidth;
            console.log(img.getBoundingClientRect().left + w / 2);
            slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
        }
        sliderPos();
        // Установим ширину на 50%
        img.style.width = w / 2 + "px";
        window.addEventListener("resize", () => {
            wOld = w;
            sliderPos();
            if (pos) {
                pos = Math.floor(pos * (w / wOld));
                slide(pos);
            } else {
                slide(w / 2);
            }
        });
        // Запиустить функцию при касании или отпускании мыши или тачскрина
        slider.addEventListener("pointerdown", slideReady);

        window.addEventListener("pointerup", slideFinish);

        function slideReady(e) {
            // предохраняем реакцию программы на другие действия пользователя
            e.preventDefault();
            // слайдер нажат и готов к перемещению
            clicked = 1;
            // выполнить функцию при перемещении слайдера
            window.addEventListener("pointermove", slideMove);
        }

        function slideFinish() {
            // слайдер больше не нажат
            clicked = 0;
        }

        function slideMove(e) {
            // let pos;
            if (clicked == 0) {
                return false;
            }
            // переместим курсор в начальную позицию
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            // выполнить функцию ресайзинга окна по текущему положению курсора
            slide(pos);
        }

        function getCursorPos(e) {
            let x = 0;
            e = e || window.Event;
            // получим х позицию изображения
            const a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            // ресайзинг изображения
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
        }
    }
}

initComparisons();