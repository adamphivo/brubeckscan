const generate = () => { };

generate.randomRadient = () => {
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const backgroundColor = `linear-gradient(${randomIntFromInterval(0, 360)}deg, ${getRandomColor()} 0%, ${getRandomColor()} 50%, ${getRandomColor()} 100%)`;

    return backgroundColor;
};

export { generate };