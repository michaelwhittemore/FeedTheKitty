$(document).ready(
    () => {
        //intialize variables
        const safe='#14A76C';
        const mid='#FFE400';
        const danger='#FF652F';
        let angery = 0;
        let chonky = 0;
        let annoyance = 0;
        let berserk = false
        $("#confused").hide();
        let score = 0;
        let bestScore = 0;
        //functions to modify variable and the appriopraite text
        const adjustAngery = (amount) => {
            angery += amount;
            angery = angery < 0 ? 0 : angery
            $('#angery').text(angery)
            
        }
        const adjustChonky = (amount) => {
            chonky += amount;
            chonky = chonky < 0 ? 0 : chonky
            $('#chonky').text(Math.round(chonky))
        }
        const adjustAnnoyance = (amount) => {
            annoyance += amount;
            annoyance = annoyance < 0 ? 0 : annoyance
            $('#annoyance').text(annoyance)
        }
        const gameOver = () => {
            angery = 0;
            chonky = 0;
            annoyance = 0;
            berserk = false;
            $("#confused").hide()
            clearInterval(gameInterval)
            bestScore= score > bestScore ? score : bestScore;
            $("#bestScore").text(bestScore)
            score = 0;
        }
        //buttons
        $("#feed").click(() => {
            adjustChonky(5);
            adjustAngery(-10);
            adjustAnnoyance(-5);
        })
        $("#pet").click(() => {
            adjustAnnoyance(-5);
            adjustAngery(Math.round(Math.random() * 20 - 13))
        })
        $("#pickUp").click(() => {
            adjustAnnoyance(-10);
            adjustAngery(20);
        })
        $('#sing').click(()=>{
            $("#confused").show()
        })
        $("#reset").click(() => {
            gameOver()
            gameInterval = setInterval(gameloop, 200)
        })
        //gameloop
        const gameloop = () => {
            adjustAngery(1)
            if (berserk) {
                adjustAnnoyance(5)
            } else {
                adjustAnnoyance(1)
            }
            adjustChonky(-.5)
            if (chonky >= 100) {
                alert("The Kitty Is Too Full And Explodes! \nGame Over");
                gameOver()
            }
            if (annoyance >= 100) {
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
        let gameInterval = setInterval(gameloop, 200)
    })