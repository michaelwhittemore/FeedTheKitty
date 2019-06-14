$(document).ready(
    () => {
        let angery = 0;
        let chonky = 0;
        let botherly = 0;
        let berserk = false
        let score = 0;
        let bestScore = 0;
        const adjustAngery = (amount) => {
            angery += amount;
            angery = angery < 0 ? 0 : angery
            $('#angery').text(angery)
        }
        const adjustChonky = (amount) => {
            chonky += amount;
            chonky = chonky < 0 ? 0 : chonky
            $('#chonky').text(chonky)
        }
        const adjustBotherly = (amount) => {
            botherly += amount;
            botherly = botherly < 0 ? 0 : botherly
            $('#botherly').text(botherly)
        }
        const gameOver = () => {
            angery = 0;
            chonky = 0;
            botherly = 0;
            berserk = false;
            clearInterval(gameInterval)
            bestScore= score > bestScore ? score : bestScore;
            $("#bestScore").text(bestScore)
            score = 0;
        }
        //buttons
        $("#feed").click(() => {
            adjustChonky(5);
            adjustAngery(-10);
            adjustBotherly(-5);
        })
        $("#pet").click(() => {
            adjustBotherly(-5);
            adjustAngery(Math.round(Math.random() * 20 - 10))
        })
        $("#reset").click(() => {
            gameOver()
            gameInterval = setInterval(gameloop, 1000)
        })
        //gameloop
        const gameloop = () => {
            adjustAngery(5)
            if (berserk) {
                adjustBotherly(20)
            } else {
                adjustBotherly(5)
            }
            adjustChonky(-2.5)
            if (chonky >= 100) {
                alert("The Kitty Is Too Full And Explodes! \nGame Over");
                gameOver()
            }
            if (botherly >= 100) {
                alert("You Were So Annoyed You Throw The Kitty Out The Window! \nGame Over");
                gameOver()
            }
            if (angery >= 100) {
                berserk = true;
                $("#beserk").text("The kitty has gone beserk!")
            } else {
                berserk = false;
                $("#beserk").text("")
            }
            score++;
            $("#score").text(score)
        }
        let gameInterval = setInterval(gameloop, 1000)
    })