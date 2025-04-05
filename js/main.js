/* jshint esversion: 6 */

// developer debug mode
let debug_mode = true;


// ct = Class Toggler
// add event listener to all elements with the "ct-toggler" class in order to allow code to be executed when they are clicked
document.querySelectorAll('.ct-toggler').forEach((toggle) => {
  toggle.addEventListener("click", function (event) {

    let container;

    //check if clicked element is a ct-container
    if (this.classList.contains(".ct-container")) {
      container = this;
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

    // find all elements with the "ct-affected" class inside this container -later- but not inside other elements with the "ct-container" class
    let allAffected = container.querySelectorAll('.ct-affected');

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
  });
});


// if click uccurs, find all ct-containers that hav the class "ct-deactivateOnOutsideClick"
// and deactivate all their children that also have that container as the closest ancestor 
// that is a ct-container 
// (^ to not affect a normal ct-container (inside this one), that doesn't have the 
// "ct-deactivateOnOutsideClick" class)

// if click uccurs, find all ct-containers that hav the class "ct-deactivateOnOutsideClick"
document.addEventListener("click", function (event) {
  document.querySelectorAll('.ct-container.ct-deactivateOnOutsideClick').forEach((container) => {

    // if click didn't occur in this container continue
    if (!container.contains(event.target)) {
      // deactivate container (if it is activated)
      if (container.classList.contains("ct-active")) {
        container.classList.remove("ct-active");
        container.classList.add("ct-unactive");
      }

      // find all active children, but only deactivate the ones that have this container
      // as their closest ct-container
      container.querySelectorAll('.ct-active').forEach((activeElement) => {
        if (activeElement.closest(".ct-container") === container) {
          activeElement.classList.remove("ct-active");
          activeElement.classList.add("ct-unactive");
        }
      });
    }
  });
});


// toggle automatic scroll setting
let auto_scroll_enabled = true; 
// if click occurs, find all elements with class "automatic-scroll-toggle"
// and filter out the toggles that weren't clicked
document.addEventListener("click", function (event) {
  document.querySelectorAll('.automatic-scroll-toggle').forEach((toggle) => {
    if (!toggle.contains(event.target)) return;

    // toggle variable 
    auto_scroll_enabled = !auto_scroll_enabled;

    // find all toggles (and knobbs) for automatic scroll and update their class toggler value
    document.querySelectorAll('.automatic-scroll-toggle, .toggle-slider-knobb').forEach((toggleToUpdate) => {
      toggleToUpdate.ctSetState(auto_scroll_enabled);
    });
  });
});


// set the class toggler state of element by taking in a boolean
HTMLElement.prototype.ctSetState = function ctSetState(state) {
  if (state) {
    this.classList.remove("ct-unactive");
    this.classList.add("ct-active");
  } else {
    this.classList.remove("ct-active");
    this.classList.add("ct-unactive");
  }
};

// get the class toggler state of element by returning true if it has class ct-active
// and returning false otherwise
HTMLElement.prototype.ctGetState = function ctGetState() {
  if (this.classList.contains("ct-active")) {
    return true;
  } else {
    return false;
  }
};

//scroll to the IB when it is clicked
document.querySelectorAll('.ib-expand-button').forEach((toggle) => {
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

      document.querySelectorAll('*').forEach((el) => {
        if (show_borders) {
          el.classList.add("show-borders");
        }else{
          el.classList.remove("show-borders");
        }
      });
    }
  });
}