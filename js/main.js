// developer debug mode
let debug_mode = true;



// ct = Class Toggler
// add event listener to all elements with the "affected_element-toggle" class in order to allow code to be executed when they are pressed
document.querySelectorAll(".ct-toggler").forEach((toggle) => {
  toggle.addEventListener("click", function (event) {

    let container;

    //check if clicked element is a ct-container
    if (this.classList.contains(".ct-container")) {
      container = this
      console.error("Error: clicked object is container");
    } else {
      // find the closest relative/anscestor to this element that has the "ct-container" class and input that in to a variable
      container = this.closest(".ct-container");
    }
    
    

    // if the code didn't find any relative/anscestor to this element with the "ct-container" class, meaning the variable value is null, then
    if (container == null) {
      // notify of the issue
      if (debug_mode) {console.error("Error: a .ct-toggler is missing a .ct-container!", this.outerHTML);}
      return;
    }

    // find all elements with the "ct-affected" class inside this container but not inside other elements with the "ct-container" class
    let allAffected = container.querySelectorAll(".ct-affected");

    // filter out elements that are inside another ".ct-container"
    let affectedElements = Array.from(allAffected).filter(
      (el) => el.closest(".ct-container") === container
    );

    // add the container itself to the list
    affectedElements.unshift(container);

    // toggle the classes for all found elements
    affectedElements.forEach((affected) => {
      affected.classList.toggle("ct-active");
      affected.classList.toggle("ct-unactive");
    });

    // prevent the click event from being detected by parent elements of the clicked element
    event.stopPropagation();
  });
});


// deactivate class togglers  if a click occurs somewhere other that the container
// and they have the class "ct-deactivateOnOutsideClick"

// run function for every clicked element with class "ct-container"
document.addEventListener("click", function (event) {
  document.querySelectorAll('.ct-container.ct-deactivateOnOutsideClick').forEach((container) => {
    console.log("Container found with both classes", container);
    // if click didn't occur in the container
    if (!container.contains(event.target)) {

      // deactivate container
      container.classList.remove("ct-active");
      container.classList.add("ct-unactive");

      //find elements that are affected by the class toggler and are active
      let activeElements = container.querySelectorAll(".ct-active");

      //deactivate all active classes
      activeElements.forEach((el) => {
        el.classList.remove("ct-active");
        el.classList.add("ct-unactive");
      });
    }
  });
});

// toggle automatic scroll setting
let auto_scroll_enabled = true; 
document.querySelectorAll(".automatic-scroll-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (event) {
    auto_scroll_enabled = !auto_scroll_enabled;
  });
});

//scroll to the IB when it is clicked
document.querySelectorAll(".ib-expand-button").forEach((toggle) => {
  toggle.addEventListener("click", function (event) {
    // only scroll if the setting is enabled
    if (auto_scroll_enabled) {
      //make sure the scroll happeneds after the animation
      setTimeout(() => {
        //find the closest "IB" to the ib-expand-button
        let container = this.closest(".ib");

        //make sure it was found to prevent exeption
        if (container) {
          //scroll to it
          container.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // delay before scroll takes affect to avoid scrolling to an item that is changing position
    }
  });
});


// show element borders (debug)
if (debug_mode) {
  let show_borders = false;
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'b') {
      show_borders = !show_borders;

      document.querySelectorAll("*").forEach((el) => {
        if (show_borders) {
          el.classList.add("show-borders");
        }else{
          el.classList.remove("show-borders");
        }
      })
    }
  });
}
