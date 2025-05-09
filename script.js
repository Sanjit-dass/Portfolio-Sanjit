document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("G1GUQYgdcCt36H_j7"); // Replace with your actual Public Key
    console.log("✅ EmailJS Initialized:", emailjs._userID);
});


$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Front-End Developer", "Web Developer", "Full Stack Developer "],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Front-End Developer ", "Full Stack Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});


    // demo

    // JavaScript for fast scrolling
document.documentElement.style.scrollBehavior = 'smooth';  // Smooth scroll globally

// If you want to control scroll speed specifically, you can add a custom function.
let scrollSpeed =2; // Higher number = faster scroll speed

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    window.scrollBy({
        top: event.deltaY * scrollSpeed,
        behavior: 'smooth'
    });
});


    $(document).ready(function(){
        $(".owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            dots: true,
            navText: ["<", ">"]
        });
    });

    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 500,  // Time between slide transitions
    });
    
    function openImage(src) {
        document.getElementById("fullscreenImage").src = src;
        document.getElementById("fullscreenViewer").style.display = "flex";
    
        // Set the download link dynamically
        let downloadBtn = document.getElementById("downloadImage");
        downloadBtn.href = src; // Set the image source for download
        downloadBtn.setAttribute("download", "image.jpg"); // Set a default filename
    
        // Hide other sections
        document.querySelectorAll("body > *:not(#fullscreenViewer)").forEach(el => {
            el.classList.add("hidden-content");
        });
    
        document.body.classList.add("no-scroll"); // Disable scrolling
    }
    
    function closeImage() {
        document.getElementById("fullscreenViewer").style.display = "none";
    
        // Restore all hidden sections
        document.querySelectorAll(".hidden-content").forEach(el => {
            el.classList.remove("hidden-content");
        });
    
        document.body.classList.remove("no-scroll"); // Enable scrolling
    }
    
    
    function openPreview(imageSrc) {
        const preview = document.getElementById("preview");
        const previewImg = document.getElementById("previewImg");
        const downloadLink = document.getElementById("downloadLink");
    
        previewImg.src = imageSrc;
        downloadLink.href = imageSrc;
        
        preview.style.display = "flex"; // Show the preview section
        document.body.style.overflow = "hidden"; // Hide scrolling
    }
    
    function closePreview() {
        const preview = document.getElementById("preview");
        preview.style.display = "none"; // Hide the preview section
        document.body.style.overflow = "auto"; // Restore scrolling
    }
    
// check cet
function openPreview(imgSrc) {
            document.getElementById("previewImg").src = imgSrc;
            document.getElementById("downloadLink").href = imgSrc;
            document.getElementById("preview").style.display = "flex";
        }

        function closePreview() {
            document.getElementById("preview").style.display = "none";
        }



        document.addEventListener("DOMContentLoaded", function () {
            const slider = document.querySelector(".slider");
            let scrollAmount = 0;
            const speed = 0.5; // Adjust scrolling speed
            let clone = slider.innerHTML; // Clone the certificates for infinite scrolling
            slider.innerHTML += clone; // Duplicate certificates to create a loop
        
            function scrollCertificates() {
                scrollAmount += speed;
                if (scrollAmount >= slider.scrollWidth / 2) {
                    scrollAmount = 0; // Reset to create an infinite loop effect
                }
                slider.style.transform = `translateX(-${scrollAmount}px)`;
                requestAnimationFrame(scrollCertificates);
            }
        
            scrollCertificates();
        });
       

        // validatin of form
        document.addEventListener("DOMContentLoaded", function () {
            const form = document.querySelector("form");
        
            form.addEventListener("submit", function (event) {
                event.preventDefault();  // Prevent form submission for debugging
        
                console.log("Form submit event triggered!");
        
                const fullName = form.querySelector("input[type='text']").value.trim();
                const email = form.querySelector("input[type='email']").value.trim();
                const mobile = form.querySelector("input[placeholder='Mobile*']").value.trim();
                const message = form.querySelector("textarea").value.trim();
                const designation = form.querySelector("select").value;
        
                console.log("Full Name:", fullName);
                console.log("Email:", email);
                console.log("Mobile:", mobile);
                console.log("Message:", message);
                console.log("Designation:", designation);
        
                if (fullName === "") {
                    console.error("Error: Full Name is required!");
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    console.error("Error: Invalid Email!");
                    return;
                }
                if (designation === "Select Designation") {
                    console.error("Error: Please select a Designation!");
                    return;
                }
                if (!/^[0-9]{10,15}$/.test(mobile)) {
                    console.error("Error: Invalid Mobile Number!");
                    return;
                }
                if (message === "") {
                    console.error("Error: Message cannot be empty!");
                    return;
                }
        
                console.log("Form submitted successfully!");
            });
        });
        
        $(document).ready(function(){
            $(".your-slider").slick();
        });
        
        document.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Prevents default behavior
        }, { passive: false });
        
        document.addEventListener("wheel", function (event) {
            event.preventDefault(); // Prevents default scrolling
        }, { passive: false });
        
        
        document.getElementById("downloadResume").addEventListener("click", function (event) {
            event.preventDefault();
            let link = document.createElement("a");
            link.href = "./assert/resume.pdf";
            link.download = "resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        

        //photo shake 
        document.addEventListener("DOMContentLoaded", function () {
    const image = document.querySelector(".column.left img");

    function shakeImage() {
        image.style.position = "relative";
        let counter = 0;
        const interval = setInterval(() => {
            const x = (Math.random() * 4 - 2) + "px"; // Random shake in X-axis
            const y = (Math.random() * 4 - 2) + "px"; // Random shake in Y-axis
            image.style.transform = `translate(${x}, ${y})`;

            counter++;
            if (counter > 10) { // Stops shaking after some time
                clearInterval(interval);
                image.style.transform = "translate(0, 0)";
            }
        }, 50);
    }

    // Trigger shake effect when the mouse hovers over the image
    image.addEventListener("mouseenter", shakeImage);
});



//phot shake
document.addEventListener("DOMContentLoaded", function () {
    let image = document.querySelector(".about .left img");
    image.classList.add("shake-image");
});

//email adimin and auto reply
// Initialize EmailJS when the page loads
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("G1GUQYgdcCt36H_j7"); // Replace with your actual Public Key
    console.log("✅ EmailJS Initialized:", emailjs._userID);
});

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent form refresh

    console.log("📩 Sending email...");

    // Collect form data
    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        designation: document.getElementById("designation").value,
        mobile: document.getElementById("mobile").value,
        message: document.getElementById("message").value
    };

    console.log("📨 Template Params:", templateParams);

    // Send email to Admin
    emailjs.send("service_2ubzjri", "template_buarrzi", templateParams)
        .then(response => {
            console.log("✅ Admin Email Sent!", response);

            // Send auto-reply to User
            return emailjs.send("service_2ubzjri", "template_9aj9g8l", templateParams);
        })
        .then(response => {
            console.log("✅ User Auto-Reply Sent!", response);
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset(); // Clear form
        })
        .catch(error => {
            console.error("❌ Error sending email:", error);
            alert("⚠️ Something went wrong. Check the console.");
        });
}

// Attach event listener to form
document.getElementById("contact-form").addEventListener("submit", sendEmail);
