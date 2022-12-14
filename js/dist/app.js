"use strict";

var marker = document.querySelector('.marker');
var itemNodes = document.querySelectorAll('.nav-item a'); //Makes the nodelist into an array

var navItems = Array.from(itemNodes);
var homeButton = navItems[0]; //** Specific CSS to handle Safari rejecting styles **/

if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    // Convert all project cards from nodeLists to Array to change the styling
    var projectCardList = document.querySelectorAll('.card-overlay');
    var projectCardListArray = Array.from(projectCardList);
    projectCardListArray.forEach(function(card) {
        card.addEventListener('mouseenter', function(event) {
            var selectedCard = event.target;
            selectedCard.querySelector('.project-icons').firstElementChild.style.pointerEvents = 'auto';
            selectedCard.querySelector('.project-icons').lastElementChild.style.pointerEvents = 'auto';
        });
        card.addEventListener('mouseleave', function(event) {
            var selectedCard = event.target;
            selectedCard.querySelector('.project-icons').firstElementChild.style.pointerEvents = 'none';
            selectedCard.querySelector('.project-icons').lastElementChild.style.pointerEvents = 'none';
        });
    });
} //***Handles Menu Movement bar
// const navMenuMovement = function(NavItems){
//     navItems.forEach(function (item) {
//         item.addEventListener('click', function (itemClicked) {
//             console.log(itemClicked)
//             moveMarker(itemClicked);
//         })
//     })
// }
// const moveMarker = function (itemClicked) {
//     marker.style.left = itemClicked.path[0].offsetLeft + "px";
//     marker.style.width = itemClicked.path[0].offsetWidth + "px"
// };
// const homeButtonMarker = function (homeButton) {
//     marker.style.left = homeButton.offsetLeft + "px";
//     marker.style.width = homeButton.offsetWidth + "px";
// }
//Self typing section


var phrases = ['Never settle', 'Taking your idea online', 'Take the leap', 'Always be learning', 'Keep working on it'];
var count = 0;
var index = 0;
var currentText = '';
var letterToType = '';
var lettersToType = '';
var phraseChosen = phrases[Math.floor(Math.random() * phrases.length)]; //use an infinite loop function to do the typing

var type = function type() {
    //Decide first letter, then first 2 letters, then first 3...
    lettersToType = phraseChosen.slice(0, index);
    document.querySelector('.changing-text').textContent = lettersToType;
    document.querySelector('.changing-text').style.opacity = 1; //If we dont hit the length of the chosen phrase, keep going

    if (lettersToType.length != phraseChosen.length) {
        setTimeout(function() {
            index++;
            type();
        }, 100);
    } else {
        index = 0;
    }
}; //Begin the Typing loop


setTimeout(function() {
    type();
}, 1000); //Mobile Slider Logic

var buttonSlider = function buttonSlider() {
    var burgerButton = document.querySelector('.burger');
    var slider = document.querySelector('.slider');
    burgerButton.addEventListener('click', function() {
        slider.classList.toggle('active');
    });
}; //** LINK SCROLL LOGIC **//


var navButtonList = document.querySelectorAll('.nav-button');
var navButtonArray = Array.from(navButtonList); //Scroll Position Values

var headerHeight = document.querySelector('header').offsetHeight;
var homeScrollPosition;
var skillsScrollPosition;
var aboutScrollPosition;
var projectsScrollPosition;
var contactScrollPosition;

var findSectionPositions = function findSectionPositions() {
    headerHeight = document.querySelector('header').offsetHeight;
    homeScrollPosition = document.querySelector('#home').offsetTop - headerHeight;
    skillsScrollPosition = document.querySelector('#skills').offsetTop - headerHeight;
    aboutScrollPosition = document.querySelector('#about').offsetTop - headerHeight;
    projectsScrollPosition = document.querySelector('#projects').offsetTop - headerHeight;
    contactScrollPosition = document.querySelector('#contact').offsetTop - headerHeight; // console.log("Section Positions Calculated")
};

var scrollToSection = function scrollToSection(scrollValue) {
    if (scrollValue === 'home') {
        window.scrollTo(0, homeScrollPosition);
    } else if (scrollValue === 'skills') {
        window.scrollTo(0, skillsScrollPosition);
    } else if (scrollValue === 'about') {
        window.scrollTo(0, aboutScrollPosition);
    } else if (scrollValue === 'projects') {
        window.scrollTo(0, projectsScrollPosition);
    } else if (scrollValue === 'contact') {
        window.scrollTo(0, contactScrollPosition);
    } else {
        console.log("ERROR");
    }
};

var scrollLogicListeners = function scrollLogicListeners() {
    navButtonArray.forEach(function(navButton) {
        //Find out the section we want to go to (While also cleaning it up completely in the rare case of tricks)
        navButton.addEventListener('click', function(event) {
            var scrollTarget = event.target.innerHTML.toString().toLowerCase();
            scrollToSection(scrollTarget);
        });
    });
}; //Incase DOM is resized, we will redo the position values.


var listenForResize = function listenForResize() {
    window.addEventListener("resize", function() {
        findSectionPositions();
        setimageHeight();
    });
};
/** NAVIGATION ACTIVE EFFECTS  **/


var navScrollListener = function navScrollListener() {
    //Nav Button Targets
    var homeNav = document.querySelector('#nav-home');
    var skillsNav = document.querySelector('#nav-skills');
    var aboutNav = document.querySelector('#nav-about');
    var projectsNav = document.querySelector('#nav-projects');
    var contactNav = document.querySelector('#nav-contact');
    var navArray = [homeNav, skillsNav, aboutNav, projectsNav, contactNav];

    var clearActiveLinkStyle = function clearActiveLinkStyle(navButton) {
        if (navButton.classList.contains('active-link-section')) {
            navButton.classList.remove('active-link-section');
        }
    };

    var colorClear = function colorClear(arrayToClear) {
        arrayToClear.map(clearActiveLinkStyle);
    };

    var navColorDetect = function navColorDetect() {
        var screenPosition = window.pageYOffset; // console.log(screenPosition)
        // console.log(contactScrollPosition - (headerHeight * 2));

        if (screenPosition > homeScrollPosition && !homeNav.classList.contains('active-link-section') && screenPosition < skillsScrollPosition) {
            colorClear(navArray);
            homeNav.classList.add('active-link-section');
        } else if (screenPosition >= skillsScrollPosition && screenPosition < aboutScrollPosition && !skillsNav.classList.contains('active-link-section')) {
            colorClear(navArray);
            skillsNav.classList.add('active-link-section');
        } else if (screenPosition >= aboutScrollPosition && screenPosition < projectsScrollPosition && !aboutNav.classList.contains('active-link-section')) {
            colorClear(navArray);
            aboutNav.classList.add('active-link-section');
        } else if (screenPosition >= projectsScrollPosition && screenPosition < contactScrollPosition - headerHeight * 4 && !projectsNav.classList.contains('active-link-section')) {
            colorClear(navArray);
            projectsNav.classList.add('active-link-section');
        } else if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && !contactNav.classList.contains('active-link-section')) {
            colorClear(navArray);
            contactNav.classList.add('active-link-section');
        }
    };

    navColorDetect();
    document.addEventListener('scroll', navColorDetect);
};
/** Image fix for Safari Issue * */


var setimageHeight = function setimageHeight() {
    var image = document.querySelector('.profile-pic');
    image.height = Math.floor(image.width * 1.05);
}; //** BEGIN EVERYTHING LOGIC  **/


var eventListeners = function eventListeners() {
    // navMenuMovement(navItems);
    scrollLogicListeners();
    buttonSlider();
    listenForResize();
};

var app = function app() {
    setimageHeight();
    eventListeners(); //Look for the section positions after waiting for the DOM to load, then fire the nav coloring function

    setTimeout(function() {
        findSectionPositions();
        navScrollListener();
    }, 400);
};

app();