export function startSlider(container) {
    let slider = container.querySelector('.slider');
    let items = slider.querySelectorAll('section');
    let itemWidth = items[0].offsetWidth + 20; // width + margin
    let totalWidth = items.length * itemWidth;

    // Clone items to create a seamless loop
    items.forEach(item => {
        let clone = item.cloneNode(true);
        slider.appendChild(clone);
    });

    slider.style.width = `${totalWidth * 2}px`; // double the width to accommodate clones

    let currentPosition = 0;

    function slide() {
        currentPosition += itemWidth;
        if (currentPosition >= totalWidth) {
            currentPosition = 0;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(0)`;
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                slider.style.transform = `translateX(-${currentPosition}px)`;
            }, 20);
        } else {
            slider.style.transform = `translateX(-${currentPosition}px)`;
        }
    }

    setInterval(slide, 3000); // Slide every 3 seconds
}
