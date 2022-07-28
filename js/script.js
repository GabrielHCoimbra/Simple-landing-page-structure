function Animations(){

    //Fix menu on top
    const nav = document.getElementsByTagName("nav")[0];
    const topNav = nav.offsetTop;
    window.onscroll = fixMenuOnTop();
    function fixMenuOnTop(){
        if(window.pageYOffset >= topNav){
            nav.classList.add("FixOnTop");
        }else{
            nav.classList.remove("FixOnTop");
        }
    }

    //Smooth Scroll

    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

    function getDistanceFromTheTop(element) {
        const id = element.getAttribute("href");
        return document.querySelector(id).offsetTop;
    }

    function scrollToSection(event) {
        event.preventDefault();
        //Change number after '-' according heigth of menu (px)
        const distanceFromTheTop = getDistanceFromTheTop(event.target) - 60;
        smoothScrollTo(0, distanceFromTheTop);
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });

    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();
    
        //duration in miliseconds
        duration = typeof duration !== "undefined" ? duration : 400;

        const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1)
            return (distance / 2) * time * time * time * time + from;
        return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
        }, 1000 / 60);
    }
}

4