//color constants
const safe = '#14A76C';
const mid = '#FFE400';
const danger = '#FF652F';
$(document).ready(
    () => {
        //intialize variables
        let angery = 0;
        let chonky = 0;
        let annoyance = 0;
        let score = 0;
        let bestScore = 0;
        let gameInterval;
        let confuseInterval;
        //functions to modify variable and the appriopraite text
        const colorCorrector = (name, value) => {
            if (value < 30) {
                $('#' + name).css("color", safe)
            } else if (value < 70) {
                $('#' + name).css("color", mid)
            } else if (value >= 70) {
                $('#' + name).css("color", danger)
            }
        }
        const adjustAngery = (amount) => {
            angery += amount;
            angery = angery < 0 ? 0 : angery
            $('#angery').text(angery)
            colorCorrector('angery', angery)
            if (angery >= 100) {
                alert("The Kitty Has Gone Berserk And Eats YOU! \nGame Over")  
                gameOver()
            }
        }
        const adjustChonky = (amount) => {
            chonky += amount;
            chonky = chonky < 0 ? 0 : chonky
            $('#chonky').text(Math.round(chonky))
            colorCorrector('chonky', chonky)
            if (chonky >= 100) {
                alert("The Kitty Is Too Full And Explodes! \nGame Over");
                gameOver()
            }
        }
        const adjustAnnoyance = (amount) => {
            annoyance += amount;
            annoyance = annoyance < 0 ? 0 : annoyance
            $('#annoyance').text(annoyance)
            colorCorrector('annoyance', annoyance)
            if (annoyance >= 100) {
                alert("You Were So Annoyed That You Threw The Kitty Out The Window! \nGame Over");
                gameOver()
            }
        }
        const gameOver = () => {
            //reset values
            angery = chonky = annoyance = 0;
            adjustAngery(0); adjustAnnoyance(0); adjustChonky(0);
            $("#confused").hide()
            clearInterval(gameInterval)
            clearTimeout(confuseInterval)
            bestScore = score > bestScore ? score : bestScore;
            $("#bestScore").text(bestScore)
            score = 0;
            //make the buttons disabled
            $('#start').prop('disabled', false);
            $('#reset').prop('disabled', true);
            $('#pet').prop('disabled', true);
            $('#pickUp').prop('disabled', true);
            $('#sing').prop('disabled', true);
            $('#feed').prop('disabled', true);

        }
        //buttons
        $("#feed").click(() => {
            adjustChonky(8);
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
        $('#sing').click(() => {
            $("#confused").show()
            confuseTimeout = setTimeout(() => {
                $("#confused").hide()
            }, 3000)
        })
        $("#reset").click(() => {
            gameOver()

        })
        $("#start").click(() => {
            gameInterval = setInterval(gameloop, 200)
            $('#start').prop('disabled', true);
            $('#reset').prop('disabled', false);
            $('#pet').prop('disabled', false);
            $('#pickUp').prop('disabled', false);
            $('#sing').prop('disabled', false);
            $('#feed').prop('disabled', false);


        })
        //gameloop
        const gameloop = () => {
            adjustAngery(1)
            adjustAnnoyance(1)
            adjustChonky(-.5)
            score++;
            $("#score").text(score)
        }

    })