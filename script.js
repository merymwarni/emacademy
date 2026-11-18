
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. WEBSITE NAVIGATION
    ===================================================== */

    const pages = document.querySelectorAll(".page");
    const navLinks = document.querySelectorAll("[data-page]");
    const goButtons = document.querySelectorAll("[data-go]");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    function showPage(pageId, updateHistory = true) {
        const selectedPage = document.getElementById(pageId);
        const validPage = selectedPage && selectedPage.classList.contains("page");

        if (!validPage) {
            console.warn("Page not found:", pageId);
            return;
        }

        pages.forEach(page => page.classList.remove("active"));
        selectedPage.classList.add("active");

        navLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.page === pageId);
        });

        if (navMenu) navMenu.classList.remove("open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

        if (updateHistory && window.location.hash !== `#${pageId}`) {
            history.pushState({ page: pageId }, "", `#${pageId}`);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showPage(this.dataset.page);
        });
    });

    goButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            showPage(this.dataset.go);
        });
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    window.addEventListener("popstate", function () {
        const pageId = window.location.hash.slice(1) || "home";
        showPage(pageId, false);
    });

    const requestedPage = window.location.hash.slice(1);
    const initialPage = document.getElementById(requestedPage)?.classList.contains("page")
        ? requestedPage
        : "home";

    showPage(initialPage, false);


    /* =====================================================
       2. MATERIAL DATA
    ===================================================== */

    const materialsData = {
        descriptive: {
            title: "Descriptive Text",
            icon: "📝",
            definition: "Descriptive Text is a text that describes a particular person, place, animal, or thing.",
            explanation: "The purpose of descriptive text is to give readers a clear picture of something. Its generic structure consists of Identification and Description.",
            structure: [
                "Identification: Introduces the person, place, animal, or thing.",
                "Description: Explains its characteristics, appearance, qualities, or features."
            ],
            examples: [
                "My cat has soft white fur.",
                "Borobudur Temple is a famous historical place.",
                "She has long black hair and beautiful eyes."
            ],
            question: "What is the purpose of Descriptive Text?",
            options: [
                "To describe a particular person, place, or thing",
                "To tell past experiences",
                "To explain how to make something",
                "To persuade readers"
            ],
            answer: 0
        },

        recount: {
            title: "Recount Text",
            icon: "📖",
            definition: "Recount Text is a text that tells readers about past experiences or events.",
            explanation: "The purpose is to retell events that happened in the past. Its generic structure consists of Orientation, Events, and Reorientation.",
            structure: [
                "Orientation: Introduces who, when, and where.",
                "Events: Describes the events in chronological order.",
                "Reorientation: Gives a closing statement or personal comment."
            ],
            examples: [
                "Last Sunday, I visited my grandmother.",
                "We went to the beach yesterday.",
                "I enjoyed my holiday with my family."
            ],
            question: "Which tense is commonly used in Recount Text?",
            options: [
                "Simple Present Tense",
                "Simple Past Tense",
                "Present Continuous Tense",
                "Future Tense"
            ],
            answer: 1
        },

        present: {
            title: "Simple Present Tense",
            icon: "⏰",
            definition: "Simple Present Tense is used to express habits, daily routines, facts, and general truths.",
            explanation: "Use the base verb for I, You, We, and They. Add -s or -es to the verb when using He, She, or It.",
            structure: [
                "Positive: Subject + Verb 1 (s/es) + Object.",
                "Negative: Subject + do/does + not + Verb 1.",
                "Interrogative: Do/Does + Subject + Verb 1?"
            ],
            examples: [
                "I study English every day.",
                "She goes to school by bus.",
                "The sun rises in the east."
            ],
            question: "Choose the correct sentence.",
            options: [
                "She go to school every day.",
                "She goes to school every day.",
                "She going to school every day.",
                "She gone to school every day."
            ],
            answer: 1
        },

        past: {
            title: "Simple Past Tense",
            icon: "📅",
            definition: "Simple Past Tense is used to describe actions or events that happened and finished in the past.",
            explanation: "Use Verb 2 for positive sentences. Use did not + Verb 1 for negative sentences and Did + Subject + Verb 1 for questions.",
            structure: [
                "Positive: Subject + Verb 2 + Object.",
                "Negative: Subject + did not + Verb 1.",
                "Interrogative: Did + Subject + Verb 1?"
            ],
            examples: [
                "I visited my uncle yesterday.",
                "She bought a new bag last week.",
                "They played football two days ago."
            ],
            question: "What is the past form of 'go'?",
            options: ["Goed", "Going", "Went", "Goes"],
            answer: 2
        },

        whquestions: {
            title: "WH-Questions",
            icon: "❓",
            definition: "WH-Questions are questions used to ask for specific information.",
            explanation: "Each question word has a different function. What asks about things, Who asks about people, Where asks about places, When asks about time, Why asks about reasons, and How asks about methods or conditions.",
            structure: [
                "What: Asks about things or information.",
                "Who: Asks about people.",
                "Where: Asks about places.",
                "When: Asks about time.",
                "Why: Asks about reasons.",
                "How: Asks about ways or conditions."
            ],
            examples: [
                "What is your favorite subject?",
                "Where do you live?",
                "When does the class start?",
                "Why are you happy?",
                "How do you go to school?"
            ],
            question: "Which WH-question is used to ask about a place?",
            options: ["Who", "Where", "When", "Why"],
            answer: 1
        },

        prepositions: {
            title: "Prepositions of Place",
            icon: "📍",
            definition: "Prepositions of Place are words used to explain the position or location of people and objects.",
            explanation: "Common prepositions of place include in, on, under, behind, between, next to, and in front of.",
            structure: [
                "In: Inside something.",
                "On: On the surface of something.",
                "Under: Below something.",
                "Behind: At the back of something.",
                "Between: In the middle of two things.",
                "Next to: Beside something."
            ],
            examples: [
                "The book is on the table.",
                "The cat is under the chair.",
                "The school is next to the library."
            ],
            question: "The cat is _____ the table. It is below the table.",
            options: ["On", "Under", "Behind", "Between"],
            answer: 1
        },

        asking: {
            title: "Asking and Answering Questions",
            icon: "💬",
            definition: "Asking and Answering Questions is an important part of everyday communication.",
            explanation: "We use questions to get information and answers to respond appropriately. We should use polite expressions when communicating with others.",
            structure: [
                "Asking: Excuse me, could you help me?",
                "Answering: Sure, I would be happy to help.",
                "Asking: What is your hobby?",
                "Answering: My hobby is reading books."
            ],
            examples: [
                "A: How are you? B: I am fine, thank you.",
                "A: Where do you live? B: I live in Pagar Alam.",
                "A: What time is it? B: It is seven o'clock."
            ],
            question: "Which expression is suitable for asking someone's name?",
            options: [
                "How old are you?",
                "What is your name?",
                "Where are you going?",
                "How are you?"
            ],
            answer: 1
        },

        reading: {
            title: "Main Idea and Specific Information",
            icon: "🔍",
            definition: "Main Idea is the central point of a paragraph, while Specific Information refers to particular details found in a text.",
            explanation: "To find the main idea, identify what the paragraph mostly discusses. To find specific information, look for details such as names, places, dates, numbers, and activities.",
            structure: [
                "Main Idea: The most important point of a paragraph.",
                "Specific Information: Supporting details that provide particular facts."
            ],
            examples: [
                "Main idea: Rina enjoys learning English.",
                "Specific information: She reads English stories every evening.",
                "Specific information: She learns five new words every day."
            ],
            question: "What is the main idea of a paragraph?",
            options: [
                "The central point of the paragraph",
                "A random word in the paragraph",
                "The last word of the paragraph",
                "A punctuation mark"
            ],
            answer: 0
        }
    };


    /* =====================================================
       3. MATERIAL DETAIL - LEARN MORE
    ===================================================== */

    const materialsPage = document.getElementById("materials");

    if (materialsPage) {
        const materialsHeading = materialsPage.querySelector(".section-heading");
        const materialsGrid = materialsPage.querySelector(".materials-grid");
        let materialDetail = document.getElementById("materialDetail");

        if (!materialDetail && materialsGrid) {
            materialDetail = document.createElement("div");
            materialDetail.id = "materialDetail";
            materialDetail.className = "material-detail";
            materialDetail.hidden = true;
            materialsGrid.insertAdjacentElement("afterend", materialDetail);
        }

        function showMaterialList() {
            if (materialDetail) {
                materialDetail.hidden = true;
                materialDetail.innerHTML = "";
            }

            if (materialsGrid) materialsGrid.hidden = false;
            if (materialsHeading) materialsHeading.hidden = false;
        }

        materialsPage.addEventListener("click", function (event) {
            const button = event.target.closest("[data-material]");

            if (!button || !materialDetail || !materialsGrid) return;

            const material = materialsData[button.dataset.material];
            if (!material) return;

            const structureHTML = material.structure
                .map(item => `<li>${escapeHTML(item)}</li>`)
                .join("");

            const examplesHTML = material.examples
                .map(item => `<li>${escapeHTML(item)}</li>`)
                .join("");

            materialDetail.innerHTML = `
                <div class="material-detail-header">
                    <button type="button" id="backToMaterials" class="btn-secondary">
                        ← Back to Materials
                    </button>
                    <h2>${escapeHTML(material.icon)} ${escapeHTML(material.title)}</h2>
                </div>

                <div class="material-detail-content">
                    <section class="material-content-card">
                        <h3>📚 Definition</h3>
                        <p>${escapeHTML(material.definition)}</p>
                    </section>

                    <section class="material-content-card">
                        <h3>💡 Explanation</h3>
                        <p>${escapeHTML(material.explanation)}</p>
                    </section>

                    <section class="material-content-card">
                        <h3>📌 Structure and Important Points</h3>
                        <ul>${structureHTML}</ul>
                    </section>

                    <section class="material-content-card">
                        <h3>✏️ Examples</h3>
                        <ul>${examplesHTML}</ul>
                    </section>
                </div>
            `;

            materialsHeading && (materialsHeading.hidden = true);
            materialsGrid.hidden = true;
            materialDetail.hidden = false;

            materialDetail.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            document.getElementById("backToMaterials").addEventListener("click", function () {
                showMaterialList();

                if (materialsHeading) {
                    materialsHeading.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });
    }


    /* =====================================================
       4. EXTERNAL GAME LINKS
    ===================================================== */

    document.querySelectorAll(".external-link").forEach(link => {
        link.addEventListener("click", function (event) {
            const destination = this.getAttribute("href");

            if (!destination || destination === "#") {
                event.preventDefault();
                alert("The game link has not been added yet. Please add the game website URL first.");
            }
        });
    });


    /* =====================================================
       5. LEARNING REFLECTION FORM
    ===================================================== */

    const reflectionForm = document.getElementById("reflectionForm");
    const reflectionResult = document.getElementById("reflectionResult");
    const editReflection = document.getElementById("editReflection");

    if (reflectionForm && reflectionResult) {
        reflectionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!reflectionForm.checkValidity()) {
                reflectionForm.reportValidity();
                return;
            }

            reflectionForm.hidden = true;
            reflectionResult.hidden = false;

            reflectionResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }

    if (editReflection && reflectionForm && reflectionResult) {
        editReflection.addEventListener("click", function () {
            reflectionResult.hidden = true;
            reflectionForm.hidden = false;

            reflectionForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }


    /* =====================================================
       6. FINAL CHALLENGE ELEMENTS
    ===================================================== */

    const mazeIntro = document.getElementById("mazeIntro");
    const mazeScreen = document.getElementById("mazeScreen");
    const mazeBoard = document.getElementById("mazeBoard");
    const startMaze = document.getElementById("startMaze");

    const mazeLevel = document.getElementById("mazeLevel");
    const mazeProgress = document.getElementById("mazeProgress");
    const mazeScore = document.getElementById("mazeScore");
    const mazeKeys = document.getElementById("mazeKeys");

    const levelTitle = document.getElementById("levelTitle");
    const levelDescription = document.getElementById("levelDescription");

    const challengePanel = document.getElementById("challengePanel");
    const questionNumber = document.getElementById("questionNumber");
    const questionTitle = document.getElementById("questionTitle");
    const questionContent = document.getElementById("questionContent");
    const answerFeedback = document.getElementById("answerFeedback");

    const submitAnswer = document.getElementById("submitAnswer");
    const nextQuestion = document.getElementById("nextQuestion");

    const levelResult = document.getElementById("levelResult");
    const levelScore = document.getElementById("levelScore");
    const nextLevel = document.getElementById("nextLevel");

    const mazeFinalResult = document.getElementById("mazeFinalResult");
    const finalScore = document.getElementById("finalScore");
    const finalRank = document.getElementById("finalRank");
    const finalReview = document.getElementById("finalReview");
    const restartMaze = document.getElementById("restartMaze");

    const requiredMazeElements = [
        mazeIntro, mazeScreen, mazeBoard, startMaze,
        mazeLevel, mazeProgress, mazeScore, mazeKeys,
        levelTitle, levelDescription, challengePanel,
        questionNumber, questionTitle, questionContent,
        answerFeedback, submitAnswer, nextQuestion,
        levelResult, levelScore, nextLevel,
        mazeFinalResult, finalScore, finalRank,
        finalReview, restartMaze
    ];

    if (requiredMazeElements.some(element => !element)) {
        console.warn("Some Final Challenge elements are missing. Please check the HTML IDs.");
        return;
    }


    /* =====================================================
       7. QUESTION DATABASE
       6 LEVELS - 30 QUESTIONS
    ===================================================== */

    const levels = [
        {
            title: "Level 1 – Easy",
            description: "Explore basic vocabulary and simple grammar.",
            questions: [
                {
                    type: "match",
                    question: "Look at the picture. What is the correct English word?",
                    picture: "🍎",
                    options: ["Apple", "Book", "Chair", "Window"],
                    answer: "Apple",
                    explanation: "Apple means apel."
                },
                {
                    type: "fill",
                    question: "Complete the sentence with the correct verb.",
                    sentence: "She _____ to school every morning.",
                    answer: ["goes"],
                    explanation: "Use 'goes' with she, he, or it in the Simple Present Tense."
                },
                {
                    type: "order",
                    question: "Arrange the letters to make a correct English word.",
                    scrambled: "O O B K",
                    answer: ["book"],
                    explanation: "The correct word is BOOK."
                },
                {
                    type: "mcq",
                    question: "Which of the following words is an adjective?",
                    options: ["Run", "Beautiful", "Quickly", "Teacher"],
                    answer: "Beautiful",
                    explanation: "Beautiful is an adjective because it describes a noun."
                },
                {
                    type: "fill",
                    question: "Complete the sentence.",
                    sentence: "A person who teaches students is a _____.",
                    answer: ["teacher"],
                    explanation: "A teacher is someone who teaches students."
                }
            ]
        },

        {
            title: "Level 2 – Medium",
            description: "Build correct sentences and understand grammar.",
            questions: [
                {
                    type: "order",
                    question: "Arrange these words into a correct sentence.",
                    scrambled: "playing / is / He / football",
                    answer: ["he is playing football"],
                    explanation: "The correct sentence is 'He is playing football.'"
                },
                {
                    type: "fill",
                    question: "Complete the sentence using the correct past verb.",
                    sentence: "Yesterday, Sarah _____ a new book.",
                    answer: ["bought"],
                    explanation: "Bought is the past form of buy."
                },
                {
                    type: "mcq",
                    question: "Which sentence asks about a reason?",
                    options: [
                        "Where do you live?",
                        "When will you arrive?",
                        "Why are you crying?",
                        "Who is your teacher?"
                    ],
                    answer: "Why are you crying?",
                    explanation: "The question word 'why' is used to ask about a reason."
                },
                {
                    type: "correct",
                    question: "Correct the grammatical mistake in this sentence.",
                    sentence: "They goes to school every day.",
                    answer: ["they go to school every day"],
                    explanation: "Use 'go' with the subject 'they', not 'goes'."
                },
                {
                    type: "fill",
                    question: "Complete the sentence with the correct verb.",
                    sentence: "I _____ in Pagar Alam.",
                    answer: ["live"],
                    explanation: "The correct sentence is 'I live in Pagar Alam.'"
                }
            ]
        },

        {
            title: "Level 3 – Hard",
            description: "Read carefully and find important information.",
            questions: [
                {
                    type: "reading",
                    question: "Where is the library located?",
                    passage: "Our school has a large library. It is located next to the teachers' office. Students can read books and borrow them.",
                    options: [
                        "Behind the classroom",
                        "Next to the teachers' office",
                        "Near the school gate",
                        "In front of the canteen"
                    ],
                    answer: "Next to the teachers' office",
                    explanation: "The passage clearly states that the library is next to the teachers' office."
                },
                {
                    type: "truefalse",
                    question: "Based on the passage, is the library noisy?",
                    passage: "The school library is a quiet place. Students usually read books and study there.",
                    options: ["True", "False"],
                    answer: "False",
                    explanation: "The passage describes the library as a quiet place."
                },
                {
                    type: "reading",
                    question: "What does Rina do to improve her English?",
                    passage: "Rina loves learning English. She reads English stories and practices new vocabulary every day.",
                    options: [
                        "She watches television all day.",
                        "She practices English regularly.",
                        "She only studies mathematics.",
                        "She never reads books."
                    ],
                    answer: "She practices English regularly.",
                    explanation: "Rina reads English stories and practices vocabulary every day."
                },
                {
                    type: "mcq",
                    question: "In a Recount Text, which part introduces the participants, time, and place?",
                    options: ["Orientation", "Complication", "Resolution", "Reiteration"],
                    answer: "Orientation",
                    explanation: "Orientation introduces who was involved, when the event happened, and where it happened."
                },
                {
                    type: "reading",
                    question: "When did Tina visit the museum?",
                    passage: "Last Sunday, Tina visited a history museum with her family. She saw old photographs and historical objects.",
                    options: ["Last Monday", "Last Friday", "Last Sunday", "Yesterday morning"],
                    answer: "Last Sunday",
                    explanation: "The first sentence states that Tina visited the museum last Sunday."
                }
            ]
        },

        {
            title: "Level 4 – Very Hard",
            description: "Listen carefully and practice speaking English.",
            questions: [
                {
                    type: "listening",
                    question: "Where are the students studying?",
                    audioText: "The students are studying in the library. They are reading English books.",
                    options: ["In the classroom", "In the library", "In the canteen", "In the garden"],
                    answer: "In the library",
                    explanation: "The audio says that the students are studying in the library."
                },
                {
                    type: "listening",
                    question: "Listen to the audio and complete the sentence.",
                    audioText: "My name is Anna. I live in a small house near the beach.",
                    sentence: "Anna lives near the _____.",
                    answer: ["beach"],
                    explanation: "The audio says that Anna lives near the beach."
                },
                {
                    type: "match",
                    question: "Listen to the description. Which activity matches the picture?",
                    picture: "📚🌳",
                    audioText: "A boy is reading a book under a tree.",
                    options: [
                        "Playing football",
                        "Reading a book",
                        "Swimming in a pool",
                        "Riding a bicycle"
                    ],
                    answer: "Reading a book",
                    explanation: "The description says that a boy is reading a book under a tree."
                },
                {
                    type: "speaking",
                    question: "Describe the activity in English.",
                    prompt: "A student is reading a book.",
                    instruction: "Say one or more English sentences to describe the activity.",
                    explanation: "A possible answer is: 'A student is reading a book.'"
                },
                {
                    type: "speaking",
                    question: "Introduce yourself in English.",
                    prompt: "Tell us your name, your school, and your hobby.",
                    instruction: "Speak in at least three English sentences.",
                    explanation: "A good introduction includes your name, school, and hobby."
                }
            ]
        },

        {
            title: "Level 5 – HOTS",
            description: "Analyze information and solve problems critically.",
            questions: [
                {
                    type: "correct",
                    question: "Correct the grammatical mistakes in the sentence.",
                    sentence: "Yesterday, I go to the beach with my family.",
                    answer: ["yesterday i went to the beach with my family"],
                    explanation: "The sentence describes a past event, so 'go' must change into 'went'."
                },
                {
                    type: "order",
                    question: "Arrange these sentences into a logical paragraph.",
                    scrambled: "Finally, we returned home happily. / We helped her clean the garden. / Last weekend, I visited my grandmother. / After that, we prepared lunch together.",
                    answer: [
                        "last weekend i visited my grandmother we helped her clean the garden after that we prepared lunch together finally we returned home happily"
                    ],
                    explanation: "A logical paragraph begins with the main event, followed by activities in chronological order."
                },
                {
                    type: "mcq",
                    question: "A school wants to reduce plastic waste. Which solution is the most effective?",
                    options: [
                        "Provide refillable water stations",
                        "Give students more plastic bottles",
                        "Burn all plastic waste",
                        "Ignore the problem"
                    ],
                    answer: "Provide refillable water stations",
                    explanation: "Refillable water stations reduce the need for single-use plastic bottles."
                },
                {
                    type: "writing",
                    question: "Continue the story using your own ideas.",
                    prompt: "Last Sunday, I visited a beautiful park...",
                    instruction: "Write 2–3 English sentences to continue the story.",
                    explanation: "Your writing should continue the story logically and use understandable English."
                },
                {
                    type: "reading",
                    question: "Why should we check the sources of online information?",
                    passage: "People can easily find information on the internet. However, not all websites provide accurate information. Some websites may contain misleading or incorrect content.",
                    options: [
                        "Because all websites are always correct.",
                        "Because some websites may contain inaccurate information.",
                        "Because the internet has no useful information.",
                        "Because checking sources is unnecessary."
                    ],
                    answer: "Because some websites may contain inaccurate information.",
                    explanation: "Checking sources helps us identify reliable information and avoid misinformation."
                }
            ]
        },

        {
            title: "Level 6 – Critical Thinking",
            description: "Evaluate ideas, express opinions, and propose solutions.",
            questions: [
                {
                    type: "mcq",
                    question: "Someone says, 'Using smartphones always improves students' academic scores.' Which response is the most critical?",
                    options: [
                        "I agree because smartphones are always good.",
                        "The statement needs evidence because smartphones do not always improve learning.",
                        "Smartphones should never be used.",
                        "Students do not need technology."
                    ],
                    answer: "The statement needs evidence because smartphones do not always improve learning.",
                    explanation: "A critical response questions an absolute statement and asks for supporting evidence."
                },
                {
                    type: "writing",
                    question: "Do you think technology is useful for learning English?",
                    prompt: "Write your opinion about using technology to learn English.",
                    instruction: "Write your opinion and give at least two supporting reasons.",
                    explanation: "A strong opinion paragraph contains a clear opinion and relevant supporting reasons."
                },
                {
                    type: "speaking",
                    question: "Do you think reading books is important for students?",
                    prompt: "Express your opinion about reading books.",
                    instruction: "Speak in English and give at least two reasons to support your opinion.",
                    explanation: "A good response clearly expresses an opinion and supports it with reasons."
                },
                {
                    type: "writing",
                    question: "Write a conclusion about keeping the school clean.",
                    prompt: "Students should keep their school environment clean.",
                    instruction: "Write 2–3 English sentences as a conclusion.",
                    explanation: "A conclusion should summarize the main idea and encourage positive action."
                },
                {
                    type: "critical",
                    question: "Your school produces too much plastic waste every day. What should students and teachers do to solve this problem?",
                    prompt: "Explain your solution to reduce plastic waste at school.",
                    instruction: "Give at least two reasons and write a short conclusion.",
                    explanation: "A strong response identifies a realistic solution, explains why it works, and provides a conclusion."
                }
            ]
        }
    ];


    /* =====================================================
       8. MAZE CONFIGURATION AND GAME VARIABLES
    ===================================================== */

    const mazeSize = 9;

    const startPosition = { row: 1, col: 1 };

    const questionPositions = [
        { row: 1, col: 3 },
        { row: 3, col: 3 },
        { row: 3, col: 5 },
        { row: 5, col: 5 },
        { row: 7, col: 5 }
    ];

    const keyPosition = { row: 7, col: 6 };
    const exitPosition = { row: 7, col: 7 };

    const wallPositions = [
        "2,2", "2,4", "2,6",
        "4,2", "4,6",
        "6,2", "6,4", "6,6"
    ];

    let player = { ...startPosition };

    let currentLevel = 0;
    let currentQuestion = null;

    let totalScore = 0;
    let currentLevelScore = 0;
    let collectedKeys = 0;

    let questionResults = [];

    let recording = null;
    let audioChunks = [];

    let isQuestionAnswered = false;
    let isLevelCompleted = false;


    /* =====================================================
       9. HELPER FUNCTIONS
    ===================================================== */

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);
    }

    function normalizeAnswer(value) {
        return String(value)
            .trim()
            .toLowerCase()
            .replace(/[.!?,']/g, "")
            .replace(/\s+/g, " ");
    }

    function getCurrentQuestions() {
        return levels[currentLevel].questions;
    }

    function getQuestionResult(levelIndex, questionIndex) {
        return questionResults.find(result =>
            result.level === levelIndex &&
            result.question === questionIndex
        );
    }

    function getCompletedCount() {
        return questionResults.filter(result =>
            result.level === currentLevel
        ).length;
    }

    function updateStatus() {
        mazeLevel.textContent = `${currentLevel + 1} / ${levels.length}`;
        mazeProgress.textContent = `${getCompletedCount()} / ${getCurrentQuestions().length}`;
        mazeScore.textContent = totalScore;
        mazeKeys.textContent = collectedKeys;
    }

    function saveQuestionResult(status, answer, explanation) {
        if (getQuestionResult(currentLevel, currentQuestion)) return;

        questionResults.push({
            level: currentLevel,
            question: currentQuestion,
            status,
            answer: answer || "",
            explanation: explanation || ""
        });
    }


    /* =====================================================
       10. MAZE FUNCTIONS
    ===================================================== */

    function isWall(row, col) {
        if (
            row < 0 || col < 0 ||
            row >= mazeSize || col >= mazeSize ||
            row === 0 || col === 0 ||
            row === mazeSize - 1 ||
            col === mazeSize - 1
        ) {
            return true;
        }

        return wallPositions.includes(`${row},${col}`);
    }

    function isQuestionCompleted(index) {
        return Boolean(getQuestionResult(currentLevel, index));
    }

    function renderMaze() {
        mazeBoard.innerHTML = "";

        for (let row = 0; row < mazeSize; row++) {
            for (let col = 0; col < mazeSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("maze-cell");

                if (isWall(row, col)) {
                    cell.classList.add("wall");
                    cell.setAttribute("aria-label", "Wall");
                } else {
                    cell.classList.add("path");

                    if (player.row === row && player.col === col) {
                        cell.classList.add("player");
                        cell.textContent = "🕵️";
                        cell.setAttribute("aria-label", "Player");

                    } else if (row === exitPosition.row && col === exitPosition.col) {
                        cell.classList.add("exit");
                        cell.textContent = "🚪";

                    } else if (
                        row === keyPosition.row &&
                        col === keyPosition.col &&
                        getCompletedCount() === getCurrentQuestions().length
                    ) {
                        cell.classList.add("key");
                        cell.textContent = "🗝️";

                    } else {
                        const questionIndex = questionPositions.findIndex(position =>
                            position.row === row && position.col === col
                        );

                        if (questionIndex !== -1) {
                            if (isQuestionCompleted(questionIndex)) {
                                cell.textContent = "✅";
                            } else {
                                cell.classList.add("question");
                                cell.textContent = "❓";
                            }
                        }
                    }
                }

                mazeBoard.appendChild(cell);
            }
        }

        updateStatus();
    }


    /* =====================================================
       11. START AND RESET GAME
    ===================================================== */

    function startMission() {
        currentLevel = 0;
        totalScore = 0;
        currentLevelScore = 0;
        collectedKeys = 0;
        questionResults = [];
        currentQuestion = null;

        startLevel();
    }

    function startLevel() {
        player = { ...startPosition };
        currentLevelScore = 0;
        collectedKeys = 0;

        isLevelCompleted = false;
        isQuestionAnswered = false;

        mazeIntro.hidden = true;
        mazeScreen.hidden = false;
        mazeFinalResult.hidden = true;

        levelResult.hidden = true;
        challengePanel.hidden = true;

        levelTitle.textContent = levels[currentLevel].title;
        levelDescription.textContent = levels[currentLevel].description;

        renderMaze();
    }

    startMaze.addEventListener("click", function () {
        cleanupRecording();
        startMission();
    });


    /* =====================================================
       12. PLAYER MOVEMENT
    ===================================================== */

    function movePlayer(direction) {
        if (
            !challengePanel.hidden ||
            !levelResult.hidden ||
            mazeScreen.hidden ||
            !mazeFinalResult.hidden ||
            isLevelCompleted
        ) {
            return;
        }

        let nextRow = player.row;
        let nextCol = player.col;

        if (direction === "up") nextRow--;
        if (direction === "down") nextRow++;
        if (direction === "left") nextCol--;
        if (direction === "right") nextCol++;

        if (isWall(nextRow, nextCol)) return;

        player.row = nextRow;
        player.col = nextCol;

        renderMaze();
        checkPlayerPosition();
    }

    document.querySelectorAll("[data-move]").forEach(button => {
        button.addEventListener("click", function () {
            movePlayer(this.dataset.move);
        });
    });

    document.addEventListener("keydown", function (event) {
        const activePage = document.querySelector(".page.active");

        if (!activePage || activePage.id !== "challenge") return;

        const tagName = document.activeElement?.tagName;

        if (["INPUT", "TEXTAREA", "SELECT"].includes(tagName)) return;

        const keys = {
            ArrowUp: "up",
            ArrowDown: "down",
            ArrowLeft: "left",
            ArrowRight: "right"
        };

        if (keys[event.key]) {
            event.preventDefault();
            movePlayer(keys[event.key]);
        }
    });


    /* =====================================================
       13. CHECK PLAYER POSITION
    ===================================================== */

    function checkPlayerPosition() {
        const questionIndex = questionPositions.findIndex(position =>
            position.row === player.row &&
            position.col === player.col
        );

        if (questionIndex !== -1) {
            if (!isQuestionCompleted(questionIndex)) {
                openQuestion(questionIndex);
            }
            return;
        }

        if (
            player.row === keyPosition.row &&
            player.col === keyPosition.col &&
            getCompletedCount() === getCurrentQuestions().length &&
            collectedKeys === 0
        ) {
            collectedKeys = 1;
            renderMaze();
            alert("Great job, Detective! You have collected the key. Find the exit!");
            return;
        }

        if (
            player.row === exitPosition.row &&
            player.col === exitPosition.col
        ) {
            if (getCompletedCount() < getCurrentQuestions().length) {
                alert("You must answer all five questions before opening the exit.");
                return;
            }

            if (collectedKeys === 0) {
                alert("Collect the key before entering the exit.");
                return;
            }

            completeLevel();
        }
    }


    /* =====================================================
       14. OPEN AND DISPLAY QUESTIONS
    ===================================================== */

    function openQuestion(questionIndex) {
        currentQuestion = questionIndex;
        isQuestionAnswered = false;

        const question = getCurrentQuestions()[questionIndex];

        challengePanel.hidden = false;

        questionTitle.textContent = `Question ${questionIndex + 1}`;
        questionNumber.textContent =
            `Level ${currentLevel + 1} | Question ${questionIndex + 1} of 5`;

        answerFeedback.hidden = true;
        answerFeedback.className = "answer-feedback";

        submitAnswer.hidden = false;
        submitAnswer.disabled = false;
        nextQuestion.hidden = true;

        renderQuestion(question);
    }

    function renderQuestion(question) {
        let html = "";

        if (question.question) {
            html += `<p><strong>${escapeHTML(question.question)}</strong></p>`;
        }

        if (question.picture) {
            html += `
                <div class="question-picture">
                    ${escapeHTML(question.picture)}
                </div>
            `;
        }

        if (question.passage) {
            html += `
                <div class="question-passage">
                    <strong>Reading Passage</strong>
                    <p>${escapeHTML(question.passage)}</p>
                </div>
            `;
        }

        if (question.sentence) {
            html += `
                <p class="question-sentence">
                    ${escapeHTML(question.sentence)}
                </p>
            `;
        }

        if (question.scrambled) {
            html += `
                <div class="question-scrambled">
                    ${escapeHTML(question.scrambled)}
                </div>
            `;
        }

        if (question.type === "listening") {
            html += `
                <div class="question-activity">
                    <p><strong>Listening Activity</strong></p>
                    <button type="button" id="playAudio" class="btn-secondary">
                        🔊 Play Audio
                    </button>
                    <p id="audioStatus">Click the button to listen.</p>
                </div>
            `;
        }

        if (question.type === "speaking") {
            html += `
                <div class="question-activity">
                    <p><strong>Speaking Prompt:</strong></p>
                    <p>${escapeHTML(question.prompt)}</p>
                    <p>${escapeHTML(question.instruction)}</p>
                    <button type="button" id="recordButton" class="btn-secondary">
                        🎤 Start Recording
                    </button>
                    <p id="recordStatus">
                        Recording is optional. Your teacher will assess your speaking.
                    </p>
                </div>
            `;
        }

        if (["writing", "critical"].includes(question.type)) {
            html += `
                <div class="question-activity">
                    <p><strong>Writing Task:</strong></p>
                    <p>${escapeHTML(question.prompt)}</p>
                    <p>${escapeHTML(question.instruction)}</p>
                </div>

                <textarea
                    id="writtenAnswer"
                    rows="5"
                    placeholder="Write your answer in English..."
                ></textarea>
            `;
        }

        if (["mcq", "match", "reading", "truefalse"].includes(question.type)) {
            html += `<div class="question-options">`;

            question.options.forEach(option => {
                const safeOption = escapeHTML(option);

                html += `
                    <label>
                        <input
                            type="radio"
                            name="questionOption"
                            value="${safeOption}"
                        >
                        <span>${safeOption}</span>
                    </label>
                `;
            });

            html += `</div>`;
        }

        if (["fill", "order", "correct"].includes(question.type)) {
            html += `
                <input
                    type="text"
                    id="shortAnswer"
                    placeholder="Type your answer here..."
                    autocomplete="off"
                >
            `;
        }

        questionContent.innerHTML = html;

        if (question.type === "listening") setupListening(question);
        if (question.type === "speaking") setupRecording();
    }


    /* =====================================================
       15. LISTENING FUNCTION
    ===================================================== */

    function setupListening(question) {
        const playAudio = document.getElementById("playAudio");
        const audioStatus = document.getElementById("audioStatus");

        if (!playAudio || !audioStatus) return;

        playAudio.addEventListener("click", function () {
            if (!("speechSynthesis" in window)) {
                audioStatus.textContent = "Your browser does not support text-to-speech.";
                return;
            }

            window.speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(question.audioText);
            speech.lang = "en-US";
            speech.rate = 0.85;
            speech.pitch = 1;

            speech.onstart = () => {
                audioStatus.textContent = "Audio is playing...";
            };

            speech.onend = () => {
                audioStatus.textContent = "Audio completed. You can answer now.";
            };

            speech.onerror = () => {
                audioStatus.textContent = "Unable to play the audio.";
            };

            window.speechSynthesis.speak(speech);
        });
    }


    /* =====================================================
       16. SPEAKING RECORDING FUNCTION
    ===================================================== */

    function setupRecording() {
        const recordButton = document.getElementById("recordButton");
        const recordStatus = document.getElementById("recordStatus");

        if (!recordButton || !recordStatus) return;

        if (
            !navigator.mediaDevices?.getUserMedia ||
            !window.MediaRecorder
        ) {
            recordButton.disabled = true;
            recordStatus.textContent =
                "Audio recording is not supported by this browser. You can still complete the speaking task.";
            return;
        }

        recordButton.addEventListener("click", async function () {
            if (recording && recording.state === "recording") {
                recording.stop();
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                audioChunks = [];

                const newRecording = new MediaRecorder(stream);
                recording = newRecording;

                newRecording.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                newRecording.onstop = function () {
                    stream.getTracks().forEach(track => track.stop());

                    const audioBlob = new Blob(audioChunks, {
                        type: newRecording.mimeType || "audio/webm"
                    });

                    const audioURL = URL.createObjectURL(audioBlob);

                    recordStatus.innerHTML = `
                        Recording completed.
                        <audio controls src="${audioURL}" class="recorded-audio"></audio>
                    `;

                    recordButton.textContent = "🎤 Record Again";

                    if (recording === newRecording) {
                        recording = null;
                    }
                };

                newRecording.start();

                recordButton.textContent = "⏹ Stop Recording";
                recordStatus.textContent =
                    "Recording in progress... Speak clearly in English.";

            } catch (error) {
                recordStatus.textContent =
                    "Microphone access was denied or unavailable. You can still complete the task.";
            }
        });
    }

    function cleanupRecording() {
        if (recording && recording.state === "recording") {
            recording.stop();
        }

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }


    /* =====================================================
       17. GET USER ANSWER
    ===================================================== */

    function getUserAnswer(question) {
        if (["mcq", "match", "reading", "truefalse"].includes(question.type)) {
            const selected = document.querySelector(
                'input[name="questionOption"]:checked'
            );

            return selected ? selected.value : "";
        }

        if (["fill", "order", "correct"].includes(question.type)) {
            return document.getElementById("shortAnswer")?.value.trim() || "";
        }

        if (["writing", "critical"].includes(question.type)) {
            return document.getElementById("writtenAnswer")?.value.trim() || "";
        }

        if (question.type === "speaking") {
            return "Speaking task submitted for teacher assessment.";
        }

        return "";
    }


    /* =====================================================
       18. CHECK ANSWERS
    ===================================================== */

    function checkAnswer(question, userAnswer) {
        if (!userAnswer) return false;

        const normalizedUserAnswer = normalizeAnswer(userAnswer);

        if (Array.isArray(question.answer)) {
            return question.answer.some(answer =>
                normalizeAnswer(answer) === normalizedUserAnswer
            );
        }

        return normalizeAnswer(question.answer) === normalizedUserAnswer;
    }


    /* =====================================================
       19. SUBMIT ANSWER
    ===================================================== */

    submitAnswer.addEventListener("click", function () {
        if (isQuestionAnswered || currentQuestion === null) return;

        const question = getCurrentQuestions()[currentQuestion];
        const userAnswer = getUserAnswer(question);

        const isSubjective = ["speaking", "writing", "critical"].includes(question.type);

        if (isSubjective) {
            if (
                ["writing", "critical"].includes(question.type) &&
                !userAnswer
            ) {
                alert("Please write your answer before submitting.");
                return;
            }

            saveQuestionResult("pending", userAnswer, question.explanation);

            showFeedback(
                "info",
                "Answer submitted! This task requires teacher assessment. No automatic score is given."
            );

            finishQuestion();
            return;
        }

        if (!userAnswer) {
            alert("Please choose or enter your answer first.");
            return;
        }

        const isCorrect = checkAnswer(question, userAnswer);

        if (isCorrect) {
            totalScore += 20;
            currentLevelScore += 20;

            saveQuestionResult("correct", userAnswer, question.explanation);

            showFeedback("correct", "Correct! " + question.explanation);
        } else {
            saveQuestionResult("incorrect", userAnswer, question.explanation);

            showFeedback("incorrect", "Not quite right. " + question.explanation);
        }

        finishQuestion();
    });


    /* =====================================================
       20. ANSWER FEEDBACK
    ===================================================== */

    function showFeedback(type, message) {
        answerFeedback.hidden = false;
        answerFeedback.className = "answer-feedback " + type;
        answerFeedback.textContent = message;
    }

    function finishQuestion() {
        isQuestionAnswered = true;

        submitAnswer.hidden = true;
        nextQuestion.hidden = false;

        cleanupRecording();
        updateStatus();
    }

    nextQuestion.addEventListener("click", function () {
        cleanupRecording();

        challengePanel.hidden = true;
        isQuestionAnswered = false;

        renderMaze();
    });


    /* =====================================================
       21. COMPLETE LEVEL
    ===================================================== */

    function completeLevel() {
        if (isLevelCompleted) return;

        isLevelCompleted = true;

        challengePanel.hidden = true;
        levelResult.hidden = false;

        levelScore.textContent = currentLevelScore;

        nextLevel.textContent =
            currentLevel === levels.length - 1
                ? "See Final Result"
                : "Next Level";

        levelResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    nextLevel.addEventListener("click", function () {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            startLevel();
        } else {
            showFinalResult();
        }
    });


    /* =====================================================
       22. FINAL SCORE AND RANK
    ===================================================== */

    function getRank(score) {
        if (score >= 420) return "Master Detective 🏆";
        if (score >= 340) return "Expert Detective ⭐";
        if (score >= 240) return "Skilled Detective 🔎";
        if (score >= 140) return "Junior Detective 🕵️";
        return "Beginner Detective 🌱";
    }

    function showFinalResult() {
        cleanupRecording();

        mazeScreen.hidden = true;
        mazeIntro.hidden = true;
        mazeFinalResult.hidden = false;

        finalScore.textContent = `${totalScore} / 460`;
        finalRank.textContent = getRank(totalScore);

        renderFinalReview();

        mazeFinalResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    /* =====================================================
       23. FINAL QUESTION REVIEW
    ===================================================== */

    function renderFinalReview() {
        finalReview.innerHTML = "";

        levels.forEach((level, levelIndex) => {
            const heading = document.createElement("h4");
            heading.textContent = level.title;
            heading.className = "review-level-heading";

            finalReview.appendChild(heading);

            level.questions.forEach((question, questionIndex) => {
                const result = getQuestionResult(levelIndex, questionIndex);
                const reviewItem = document.createElement("div");

                reviewItem.classList.add("review-item");

                let statusText = "Not completed";
                let statusClass = "pending";

                if (result) {
                    if (result.status === "correct") {
                        statusText = "Correct";
                        statusClass = "correct";
                    } else if (result.status === "incorrect") {
                        statusText = "Incorrect";
                        statusClass = "incorrect";
                    } else if (result.status === "pending") {
                        statusText = "Waiting for teacher assessment";
                        statusClass = "pending";
                    }
                }

                reviewItem.classList.add(statusClass);

                const questionHeading = document.createElement("h4");
                questionHeading.textContent =
                    `Question ${questionIndex + 1} – ${statusText}`;

                const questionText = document.createElement("p");
                questionText.textContent = question.question;

                reviewItem.appendChild(questionHeading);
                reviewItem.appendChild(questionText);

                if (result?.explanation) {
                    const explanation = document.createElement("p");
                    const strong = document.createElement("strong");

                    strong.textContent = "Explanation: ";
                    explanation.appendChild(strong);
                    explanation.appendChild(
                        document.createTextNode(result.explanation)
                    );

                    reviewItem.appendChild(explanation);
                }

                finalReview.appendChild(reviewItem);
            });
        });
    }


    /* =====================================================
       24. RESTART FINAL CHALLENGE
    ===================================================== */

    restartMaze.addEventListener("click", function () {
        cleanupRecording();

        currentLevel = 0;
        totalScore = 0;
        currentLevelScore = 0;
        collectedKeys = 0;

        questionResults = [];
        currentQuestion = null;

        isQuestionAnswered = false;
        isLevelCompleted = false;

        mazeFinalResult.hidden = true;
        levelResult.hidden = true;
        challengePanel.hidden = true;

        mazeIntro.hidden = false;
        mazeScreen.hidden = true;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* =====================================================
       25. INITIAL GAME STATE
    ===================================================== */

    mazeIntro.hidden = false;
    mazeScreen.hidden = true;
    mazeFinalResult.hidden = true;

    challengePanel.hidden = true;
    levelResult.hidden = true;

    updateStatus();


    /* =====================================================
       END OF ENGLISH MYSTERY ACADEMY SCRIPT
    ===================================================== */

});

/* =====================================================
   LISTENING PRACTICE - CRITICAL THINKING
===================================================== */

const listeningForm = document.getElementById("listeningForm");
const listeningResult = document.getElementById("listeningResult");
const retryListening = document.getElementById("retryListening");

if (listeningForm && listeningResult && retryListening) {

    listeningForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check the multiple-choice answer
        const correctAnswer = "a";
        const selectedAnswer = listeningForm.querySelector(
            'input[name="lq1"]:checked'
        );

        let score = 0;

        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score = 10;
        }

        // Count written answers
        const writtenQuestions = [
            "lq2",
            "lq3",
            "lq4",
            "lq5",
            "lq6",
            "lq7",
            "lq8"
        ];

        let completedAnswers = 0;

        writtenQuestions.forEach(function (questionName) {
            const answer = listeningForm.querySelector(
                `[name="${questionName}"]`
            );

            if (answer && answer.value.trim().length >= 20) {
                completedAnswers++;
            }
        });

        // Show result
        listeningResult.innerHTML = `
            <h3>🎧 Listening Mission Submitted!</h3>

            <p>
                You have successfully completed the listening challenge.
            </p>

            <p>
                <strong>Multiple-choice result:</strong>
                ${score === 10 ? "Correct (10/10)" : "Incorrect (0/10)"}
            </p>

            <p>
                <strong>Written responses:</strong>
                ${completedAnswers}/7 answers completed.
            </p>

            <p>
                <strong>Important:</strong>
                Your written answers require further evaluation.
                Make sure your responses are relevant to the audio,
                supported by reasons, and written in clear English.
            </p>

            <p>
                <strong>Keep thinking critically, Detective!</strong>
                A good answer does not only repeat information.
                It also explains, analyzes, and evaluates ideas.
            </p>
        `;

        listeningResult.hidden = false;
        retryListening.hidden = false;

        // Disable the form after submission
        listeningForm.querySelectorAll("input, textarea, button")
            .forEach(function (element) {
                element.disabled = true;
            });

        listeningResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    // Retry Listening Practice
    retryListening.addEventListener("click", function () {

        listeningForm.reset();

        listeningForm.querySelectorAll("input, textarea, button")
            .forEach(function (element) {
                element.disabled = false;
            });

        listeningResult.hidden = true;
        listeningResult.innerHTML = "";

        retryListening.hidden = true;

        listeningForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

}

/* =========================================
   SPEAKING PRACTICE - VOICE RECORDING
========================================= */

const speakingRecordings = {};

document.querySelectorAll("[data-record]").forEach(button => {

    button.addEventListener("click", async function () {

        const questionId = this.dataset.record;

        if (speakingRecordings[questionId]?.recorder?.state === "recording") {
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support audio recording. Please use a supported browser and a secure connection.");
            return;
        }

        try {

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            const mimeType = MediaRecorder.isTypeSupported("audio/webm")
                ? "audio/webm"
                : "";

            const recorder = mimeType
                ? new MediaRecorder(stream, { mimeType })
                : new MediaRecorder(stream);

            const chunks = [];

            recorder.addEventListener("dataavailable", event => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            });

            recorder.addEventListener("stop", () => {

                const audioBlob = new Blob(chunks, {
                    type: recorder.mimeType || "audio/webm"
                });

                const audioURL = URL.createObjectURL(audioBlob);

                speakingRecordings[questionId].blob = audioBlob;
                speakingRecordings[questionId].url = audioURL;

                const audio = document.getElementById(
                    `audioPlayback${questionId}`
                );

                audio.src = audioURL;
                audio.hidden = false;

                const status = document.getElementById(
                    `recordStatus${questionId}`
                );

                status.textContent = "Recording completed. Listen to your answer below.";

                document.querySelector(
                    `[data-stop="${questionId}"]`
                ).disabled = true;

                document.querySelector(
                    `[data-download="${questionId}"]`
                ).disabled = false;

                stream.getTracks().forEach(track => track.stop());

            });

            speakingRecordings[questionId] = {
                recorder,
                blob: null,
                url: null
            };

            recorder.start();

            this.disabled = true;

            document.querySelector(
                `[data-stop="${questionId}"]`
            ).disabled = false;

            const downloadButton = document.querySelector(
                `[data-download="${questionId}"]`
            );

            downloadButton.disabled = true;

            const status = document.getElementById(
                `recordStatus${questionId}`
            );

            status.textContent = "🔴 Recording... Speak now!";

        } catch (error) {

            alert(
                "Microphone access is required. Please allow microphone permission in your browser."
            );

        }

    });

});


/* STOP RECORDING */

document.querySelectorAll("[data-stop]").forEach(button => {

    button.addEventListener("click", function () {

        const questionId = this.dataset.stop;

        const recording = speakingRecordings[questionId];

        if (recording && recording.recorder.state === "recording") {

            recording.recorder.stop();

            document.querySelector(
                `[data-record="${questionId}"]`
            ).disabled = false;

        }

    });

});


/* DOWNLOAD RECORDING */

document.querySelectorAll("[data-download]").forEach(button => {

    button.addEventListener("click", function () {

        const questionId = this.dataset.download;

        const recording = speakingRecordings[questionId];

        if (!recording || !recording.blob) {
            return;
        }

        const link = document.createElement("a");

        link.href = recording.url;
        link.download = `speaking-answer-${questionId}.webm`;

        document.body.appendChild(link);
        link.click();
        link.remove();

    });

});



/* =========================================
   SPEECH RECOGNITION - SPEAKING PRACTICE
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const currentTranscript = {};

if (!SpeechRecognition) {

    document.querySelectorAll("[data-start-speaking]").forEach(button => {
        button.disabled = true;
    });

    document.querySelectorAll("[data-check-speaking]").forEach(button => {
        button.disabled = true;
    });

    document.querySelectorAll('[id^="speakingStatus"]').forEach(status => {
        status.textContent =
            "Speech recognition is not supported. Please use Google Chrome or Microsoft Edge.";
    });

} else {

    /* START SPEAKING */

    document.querySelectorAll("[data-start-speaking]").forEach(button => {

        button.addEventListener("click", function () {

            const questionIndex = Number(this.dataset.startSpeaking);

            const recognition = new SpeechRecognition();

            recognition.lang = "en-US";
            recognition.continuous = false;
            recognition.interimResults = false;

            const status = document.getElementById(
                `speakingStatus${questionIndex}`
            );

            const transcriptBox = document.getElementById(
                `transcript${questionIndex}`
            );

            const resultBox = document.getElementById(
                `result${questionIndex}`
            );

            const checkButton = document.querySelector(
                `[data-check-speaking="${questionIndex}"]`
            );

            if (!status || !transcriptBox || !resultBox || !checkButton) {
                console.error(
                    "Speaking elements not found for question:",
                    questionIndex
                );
                return;
            }

            currentTranscript[questionIndex] = "";

            transcriptBox.textContent = "";
            resultBox.innerHTML = "";

            checkButton.disabled = true;

            status.textContent = "🎤 Listening... Speak clearly in English.";

            recognition.onresult = function (event) {

                const transcript =
                    event.results[0][0].transcript;

                currentTranscript[questionIndex] = transcript;

                transcriptBox.textContent = transcript;

                checkButton.disabled = false;

                status.textContent =
                    "Your answer has been recorded. Click Check My Answer.";
            };

            recognition.onerror = function (event) {

                status.textContent =
                    "Speech recognition error: " + event.error +
                    ". Please try again.";

            };

            recognition.onend = function () {

                if (!currentTranscript[questionIndex]) {
                    status.textContent =
                        "No speech detected. Please click Start Speaking and try again.";
                }

            };

            try {
                recognition.start();
            } catch (error) {
                status.textContent =
                    "Unable to start speech recognition. Please try again.";
            }

        });

    });


    /* CHECK MY ANSWER */

    document.querySelectorAll("[data-check-speaking]").forEach(button => {

        button.addEventListener("click", function () {

            const questionIndex = Number(this.dataset.checkSpeaking);

            const answer = currentTranscript[questionIndex];

            const resultBox = document.getElementById(
                `result${questionIndex}`
            );

            const status = document.getElementById(
                `speakingStatus${questionIndex}`
            );

            if (!answer || !resultBox || !status) {
                status && (status.textContent =
                    "Please click Start Speaking and record your answer first.");
                return;
            }

            // Make sure speakingQuestions is defined in your script.
            const question = speakingQuestions[questionIndex];

            if (!question || !Array.isArray(question.criteria)) {
                console.error(
                    "Speaking criteria not found for question:",
                    questionIndex
                );

                status.textContent =
                    "The evaluation criteria for this question are not available.";
                return;
            }

            const normalizedAnswer = answer.toLowerCase();

            let matchedCriteria = 0;

            question.criteria.forEach(group => {

                const found = group.some(keyword =>
                    normalizedAnswer.includes(keyword.toLowerCase())
                );

                if (found) {
                    matchedCriteria++;
                }

            });

            const percentage = Math.round(
                (matchedCriteria / question.criteria.length) * 100
            );

            if (matchedCriteria >= 3 && percentage >= 60) {

                resultBox.innerHTML = `
                    <div class="answer-correct">
                        <h3>✓ Good Answer!</h3>
                        <p>
                            Your answer includes several important ideas.
                        </p>
                        <p>
                            Concept match: ${percentage}%
                        </p>
                    </div>
                `;

                status.textContent = "Your answer has been evaluated.";

            } else {

                resultBox.innerHTML = `
                    <div class="answer-incorrect">
                        <h3>✗ Needs Improvement</h3>
                        <p>
                            Your answer does not yet include enough
                            important ideas.
                        </p>
                        <p>
                            Concept match: ${percentage}%
                        </p>
                        <p>
                            Try to explain your answer more clearly
                            and include relevant reasons or examples.
                        </p>
                    </div>
                `;

                status.textContent =
                    "Please improve your answer and try again.";

            }

        });

    });

}


if (!SpeechRecognition) {

    if (speakingContainer) {
        speakingContainer.innerHTML = `
            <p>
                Speech recognition is not supported by this browser.
                Please use Google Chrome or Microsoft Edge.
            </p>
        `;
    }

} else {

    document.querySelectorAll("[data-speak]").forEach(button => {

        button.addEventListener("click", function () {

            const questionIndex = Number(this.dataset.speak);

            const recognition = new SpeechRecognition();

            recognition.lang = "en-US";
            recognition.continuous = false;
            recognition.interimResults = false;

            const status = document.getElementById(
                `speakingStatus${questionIndex}`
            );

            const transcriptBox = document.getElementById(
                `speakingTranscript${questionIndex}`
            );

            const resultBox = document.getElementById(
                `speakingResult${questionIndex}`
            );

            const checkButton = document.querySelector(
                `[data-check="${questionIndex}"]`
            );

            status.textContent = "Listening... Speak clearly.";

            transcriptBox.textContent = "";
            resultBox.innerHTML = "";

            checkButton.disabled = true;

            try {
                recognition.start();
            } catch (error) {
                status.textContent =
                    "Microphone is already active. Please try again.";
                return;
            }

            recognition.onresult = function (event) {

                const transcript =
                    event.results[0][0].transcript;

                currentTranscript[questionIndex] = transcript;

                transcriptBox.innerHTML = `
                    <strong>Your answer:</strong>
                    <p>${transcript}</p>
                `;

                checkButton.disabled = false;

                status.textContent =
                    "Your answer has been recorded. Click Check My Answer.";

            };

            recognition.onerror = function (event) {

                status.textContent =
                    "Speech recognition error: " + event.error +
                    ". Please try again.";

            };

            recognition.onend = function () {

                if (!currentTranscript[questionIndex]) {
                    status.textContent =
                        "No speech detected. Please try again.";
                }

            };

        });

    });


    /* =========================================
       ANSWER EVALUATION
    ========================================= */

    document.querySelectorAll("[data-check]").forEach(button => {

        button.addEventListener("click", function () {

            const questionIndex = Number(this.dataset.check);

            const answer = currentTranscript[questionIndex];

            if (!answer) return;

            const normalizedAnswer = answer.toLowerCase();

            const criteria =
                speakingQuestions[questionIndex].criteria;

            let matchedCriteria = 0;

            criteria.forEach(group => {

                const found = group.some(keyword =>
                    normalizedAnswer.includes(keyword)
                );

                if (found) {
                    matchedCriteria++;
                }

            });

            const percentage = Math.round(
                (matchedCriteria / criteria.length) * 100
            );

            const resultBox = document.getElementById(
                `speakingResult${questionIndex}`
            );

            const status = document.getElementById(
                `speakingStatus${questionIndex}`
            );

            if (
                matchedCriteria >= 3 &&
                percentage >= 60
            ) {

                resultBox.innerHTML = `
                    <div class="answer-correct">
                        <h3>✓ Correct Answer!</h3>
                        <p>
                            Good job! Your answer includes
                            several important ideas.
                        </p>
                        <p>
                            Concept match: ${percentage}%
                        </p>
                    </div>
                `;

                status.textContent = "Answer evaluated.";

            } else {

                resultBox.innerHTML = `
                    <div class="answer-incorrect">
                        <h3>✗ Incorrect / Needs Improvement</h3>
                        <p>
                            Your answer does not yet include
                            enough important ideas.
                        </p>
                        <p>
                            Concept match: ${percentage}%
                        </p>
                        <p>
                            Try to explain your answer more clearly
                            and include relevant reasons or examples.
                        </p>
                    </div>
                `;

                status.textContent = "Please improve your answer.";

            }

        });

    });

}