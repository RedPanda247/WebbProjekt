
// ct = Class Toggler
// add event listener to all elements with the "affected_element-toggle" class in order to allow code to be executed when they are pressed
document.querySelectorAll(".ct-toggler").forEach(toggle => {
    toggle.addEventListener("click", function(event) {
        // find the closest relative/anscestor to this element that has the "ct-container" class and input that in to a variable
        let container = this.closest(".ct-container");

        // if the code didn't find any relative/anscestor to this element with the "ct-container" class, meaning the variable value is null, then
        if (container == null) {

            // notify of the issue
            alert("Error: a .ct-toggler is missing a .ct-container!");

            // end this function
            return;
        }

        // find all elements with the "ct-affected" class inside this container but not inside other elements with the "ct-container" class
        let allAffected = container.querySelectorAll(".ct-affected");

        // filter out elements that are inside another ".ct-container"
        let affectedElements = Array.from(allAffected).filter(el => el.closest(".ct-container") === container);

        // Add the container itself to the list
        affectedElements.unshift(container);

        console.log(affectedElements);

        // toggle the classes for all found elements
        affectedElements.forEach(affected => {
            affected.classList.toggle("ct-active");
            affected.classList.toggle("ct-unactive");
        });

        // prevent the click event from being detected by parent elements of the clicked element
        event.stopPropagation();
    });
});


document.querySelectorAll(".IB_ExpandButton").forEach(toggle => {
    toggle.addEventListener("click", function(event) {
        
        setTimeout(() => {
            let container = this.closest(".ct-container");

            if (container) {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 300); // Delay to ensure the element has toggled
    });
});