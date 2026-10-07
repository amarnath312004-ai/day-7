/* =========================================
   CREATE STARS
========================================= */

const starsContainer = document.querySelector(".stars");

if (starsContainer) {

    for (let i = 0; i < 100; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        starsContainer.appendChild(star);
    }
}


/* =========================================
   ELEMENTS
========================================= */

const arrow =
    document.getElementById("arrow");

const heart =
    document.querySelector(".heart");

const impact =
    document.getElementById("impact");

const mysterySection =
    document.getElementById("mysterySection");

const instruction =
    document.getElementById("instruction");


/* =========================================
   ARROW DRAG VARIABLES
========================================= */

let dragging = false;

let startX = 0;

let currentX = 0;

let pulledEnough = false;

let finished = false;


/* =========================================
   START DRAGGING ARROW
========================================= */

if (arrow) {

    arrow.addEventListener(
        "pointerdown",
        function (event) {

            if (finished) return;

            dragging = true;

            startX = event.clientX;

            arrow.classList.add("dragging");

            arrow.setPointerCapture(
                event.pointerId
            );
        }
    );


    /* =========================================
       MOVE ARROW
    ========================================= */

    arrow.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging || finished)
                return;

            currentX =
                event.clientX - startX;


            /*
                Allow the arrow to be
                pulled backward.
            */

            currentX =
                Math.max(
                    -130,
                    Math.min(10, currentX)
                );


            arrow.style.transform =
                `translateX(${currentX}px) rotate(-24deg)`;


            /*
                Arrow must be pulled
                at least 60px.
            */

            if (currentX < -60) {

                pulledEnough = true;

            }
        }
    );


    /* =========================================
       RELEASE ARROW
    ========================================= */

    function releaseArrow() {

        if (!dragging || finished)
            return;

        dragging = false;

        arrow.classList.remove(
            "dragging"
        );


        /* =====================================
           ARROW WAS PULLED ENOUGH
        ===================================== */

        if (pulledEnough) {

            finished = true;


            /* Hide instruction */

            if (instruction) {

                instruction.style.opacity = "0";

            }


            /* Arrow flies toward heart */

            arrow.style.transition =
                "transform .7s cubic-bezier(.15,.8,.2,1)";

            arrow.style.transform =
                "translateX(430px) rotate(-24deg)";


            /* =================================
               HEART GETS HIT
            ================================= */

            setTimeout(
                function () {

                    if (heart) {

                        heart.classList.add(
                            "hit"
                        );

                    }

                    if (impact) {

                        impact.classList.add(
                            "active"
                        );

                    }

                },
                500
            );


            /* =================================
               SHOW MYSTERY BOXES
            ================================= */

            setTimeout(
                function () {

                    if (mysterySection) {

                        mysterySection.classList.add(
                            "show"
                        );

                    }

                },
                1200
            );

        }

        /* =====================================
           ARROW WAS NOT PULLED ENOUGH
        ===================================== */

        else {

            arrow.style.transition =
                "transform .35s ease";

            arrow.style.transform =
                "rotate(-24deg)";
        }


        pulledEnough = false;
    }


    /* =========================================
       POINTER RELEASE
    ========================================= */

    arrow.addEventListener(
        "pointerup",
        releaseArrow
    );

    arrow.addEventListener(
        "pointercancel",
        releaseArrow
    );
}


/* =========================================
   MYSTERY BOXES
========================================= */

const boxes =
    document.querySelectorAll(".box");


boxes.forEach(
    function (box) {

        box.addEventListener(
            "click",
            function () {

                /*
                    If already opened,
                    don't open again.
                */

                if (
                    box.classList.contains(
                        "opened"
                    )
                ) {

                    return;
                }


                /*
                    Add opened class.
                    CSS will open the lid.
                */

                box.classList.add(
                    "opened"
                );


                /*
                    Get the message
                    from data-message.
                */

                const message =
                    box.getAttribute(
                        "data-message"
                    );


                /*
                    Find message element
                    inside this box.
                */

                const messageElement =
                    box.querySelector(
                        ".message"
                    );


                /*
                    Display message.
                */

                if (messageElement) {

                    messageElement.textContent =
                        message;

                }


                /*
                    Small opening animation.
                */

                box.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(1.12)"
                        },

                        {
                            transform:
                                "scale(1)"
                        }
                    ],

                    {
                        duration: 400,
                        easing:
                            "ease-out"
                    }
                );

            }
        );
    }
);