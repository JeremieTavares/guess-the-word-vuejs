const FlashWordArgs = {
    data() {
        return {
            words: [{
                word_a: "Chien",
                word_b: "dog",
                hint: "Animal",
                showHint: false,
                answer: "",
                correct: false,
                classValidity: ""
            }, {
                word_a: "Emploi",
                word_b: "job",
                hint: "We do it to earn money",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Ciel",
                word_b: "sky",
                hint: "Above us",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Pomme",
                word_b: "apple",
                hint: "Fruit",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Chanter",
                word_b: "sing",
                hint: "You do it in the shower",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Maison",
                word_b: "home",
                hint: "H... sweet ...",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Pompier",
                word_b: "firefighter",
                hint: "Job saving lives",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Composante",
                word_b: "component",
                hint: "A piece of something",
                showHint: false,
                answer: "",
                correct: false
            }, {
                word_a: "Ordinateur",
                word_b: "computer",
                hint: "you're using it right now",
                showHint: false,
                answer: "",
                correct: false
            }],
            wordsByDifficulty: [],
            currentDifficulty: '',
            correctAnswersCount: 0,
            allAnswersCorrect: false
            // wordCount: this.words.length
            // We cant use this.words.length in data() because it is not defined yet.
            // We cant reference other data properties when setting data properties.
            // we have to use a computed property instead. because computed properties are evaluated after data properties.

        };
    },
    computed: {
        shuffledWords() {
            return this.shuffle();
        },
        wordCount() {
            return this.wordsByDifficulty.length;
        },
        // Could have been a computed property, but I wanted to show how to use a watcher.
        // allAnswersCorrect() {
        //     return this.correctAnswersCount === this.wordCount;
        // }
    },
    watch: {
        correctAnswersCount() {
            this.allAnswersCorrect = (this.correctAnswersCount === this.wordCount);
        }
    },
    methods: {
        onKeyupValidateAnswer(word) {
            word.correct = (word.word_b === word.answer.toLowerCase());
            word.classValidity = (word.correct ? 'correct' : 'incorrect');
            if (word.correct) this.correctAnswersCount++;
        },
        // Remove the classValidity when the user starts typing again
        onInputRemoveClassValidity(word) {
            word.classValidity = '';
        },

        toggleShowHint(word) {
            word.showHint = !word.showHint;
        },

        reset() {
            this.correctAnswersCount = 0;
            this.wordsByDifficulty.forEach(word => {
                word.answer = '';
                word.correct = false;
                word.classValidity = '';
            });

            this.wordsByDifficulty = [];
            this.currentDifficulty = '';
        },

        shuffle(difficulty) {
            return this.wordsByDifficulty.sort(() => .5 - Math.random());
        },

        setDifficulty({target: {dataset: {difficulty}}}) {
            
            // Reset the game if the user changes the difficulty
            this.reset()
            this.currentDifficulty = difficulty;

            switch (difficulty) {
                case'easy':
                    this.wordsByDifficulty = this.words.filter(word => word.word_b.length <= 3);
                    break;
                case 'medium':
                    this.wordsByDifficulty = this.words.filter(word => word.word_b.length >= 4 && word.word_b.length <= 5);
                    break;
                case 'hard' :
                    this.wordsByDifficulty = this.words.filter(word => word.word_b.length >= 7);
                    break;
            }
        }
    },
}

const app = Vue.createApp(FlashWordArgs).mount('#app');
