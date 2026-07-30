// Submit form
const submitForm = document.querySelector(".sc-form");
if (submitForm) {
  // Get WordPress site URL - handles both root and subdirectory installations
  const getWpSiteUrl = () => {
    if (typeof wpApiSettings !== "undefined" && wpApiSettings.root) {
      const rootMatch = wpApiSettings.root.match(
        /^(https?:\/\/[^\/]+(?:\/[^\/]+)?)\/wp-json\/?/
      );
      if (rootMatch) {
        return rootMatch[1];
      }
    }

    const restApiScript = document.querySelector('script[src*="/wp-json/"]');
    if (restApiScript) {
      const srcMatch = restApiScript.src.match(
        /^(https?:\/\/[^\/]+(?:\/[^\/]+)?)\/wp-json\/?/
      );
      if (srcMatch) {
        return srcMatch[1];
      }
    }

    const origin = window.location.origin;
    const pathname = window.location.pathname;

    const wpPathMatch = pathname.match(
      /^(\/.+?)\/(?:wp-admin|wp-json|wp-content|wp-includes)/
    );
    if (wpPathMatch) {
      return origin + wpPathMatch[1];
    }

    const wpContentScript = document.querySelector(
      'script[src*="/wp-content/"]'
    );
    if (wpContentScript) {
      const srcMatch = wpContentScript.src.match(
        /^(https?:\/\/[^\/]+(?:\/[^\/]+)?)\/wp-content\/?/
      );
      if (srcMatch) {
        return srcMatch[1];
      }
    }

    // Fallback: Assume root installation
    return origin;
  };

  const currentUrl = getWpSiteUrl();

  // Document ready
  document.addEventListener("DOMContentLoaded", function () {
    const order = document.querySelector(".sc-order-id");
    if (order) {
      const orderId = order.value;
      setTimeout(() => {
        if (orderId) {
          seedConfirmGetDetail(orderId);

          // Change order id
          order.addEventListener("change", function (e) {
            seedConfirmGetDetail(e.target.value);
          });
        }
      }, 1000);
    }
  });

  // Submit form
  submitForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get UI elements
    const elements = {
      loading: document.querySelector(".sc-loading"),
      form: document.querySelector(".sc-form"),
      submitButton: document.querySelector(".sc-submit-form"),
      errorMessage: document.querySelector(".sc-message-error"),
      successMessage: document.querySelector(".sc-message-success"),
    };

    // Reset messages
    elements.errorMessage.style.display = "none";
    elements.successMessage.style.display = "none";

    // Validate required fields (browser native validation is disabled by preventDefault)
    const requiredInputs = document.querySelectorAll('[data-required="true"]');
    let isValid = true;
    let validationError = "";
    const checkedRadioGroups = new Set();

    requiredInputs.forEach((field) => {
      if (!isValid) return;
      if (field.type === "radio") {
        if (!checkedRadioGroups.has(field.name)) {
          checkedRadioGroups.add(field.name);
          if (!document.querySelector(`[name="${field.name}"]:checked`)) {
            isValid = false;
            validationError = field.dataset.massage || "Please select a required option.";
          }
        }
      } else if (field.type === "file") {
        if (!field.files || field.files.length === 0) {
          isValid = false;
          validationError = field.dataset.massage || "Please select a required file.";
        }
      } else {
        if (!field.value || field.value.trim() === "") {
          isValid = false;
          validationError = field.dataset.massage || "Please fill in all required fields.";
        }
      }
    });

    if (!isValid) {
      elements.errorMessage.innerHTML = validationError;
      fadeIn(elements.errorMessage, 300);
      return;
    }

    // Initialize form data
    const data = new FormData();

    // Helper function to process form elements
    const processFormElement = (element) => {
      const value = element.type === "file" ? element.files[0] : element.value;
      data.append(element.name, value);
    };

    // Collect all form elements
    const selectors = [".sc-input", ".sc-textarea", ".sc-select", ".sc-file"];
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        processFormElement(element);
      });
    });

    // Handle radio buttons separately due to their unique checking requirement
    document.querySelectorAll(".sc-radio").forEach((element) => {
      if (element.checked) {
        processFormElement(element);
      }
    });

    // Handle form submission
    const form = document.querySelector(".sc-form");
    const loading = document.querySelector(".sc-loading");

    fadeOut(form, 300);
    fadeIn(loading, 300);
    seedConfirmCreateLog(data, form, loading);
  });

  // Handle confirm button
  document.addEventListener("click", function (event) {
    if (event.target.matches(".sc-form .sc-radio")) {
      const banks = document.querySelectorAll(".sc-bank");
      banks.forEach((bank) => {
        bank.classList.remove("active");
        bank.querySelector(".sc-copy").classList.remove("active");
      });
      const bank = event.target.closest(".sc-bank");
      bank.classList.add("active");
      const num = bank.dataset.acc;
      navigator.clipboard.writeText(num).then(
        function () {
          bank.querySelector(".sc-copy").classList.add("active");
        },
        function () {
          console.log("Copy error");
        }
      );
    }
    if (event.target.matches(".sc-banks-display .sc-copy")) {
      const banks = event.target.closest(".sc-banks-display");
      const copies = banks.querySelectorAll(".sc-copy");
      copies.forEach((copy) => {
        copy.classList.remove("active");
      });
      const copy = event.target;
      const num = copy.dataset.acc;
      navigator.clipboard.writeText(num).then(
        function () {
          copy.classList.add("active");
        },
        function () {
          console.log("Copy error");
        }
      );
    }
  });

  const seedConfirmCreateLog = async (data, form, loading) => {
    const routeUrl = `${currentUrl}/wp-json/seed-confirm/v1/create`;

    try {
      const response = await fetch(routeUrl, {
        method: "POST",
        headers: {
          "No-Cache": "true",
          "X-WP-Nonce": document.querySelector('input[name="rest_nonce"]')
            .value,
        },
        body: data,
      });

      // Check if the response is ok
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }

      // Get the count from the response
      const res = await response.json();

      if (res.success) {
        if (res.link != 0 && res.link != "none") {
          window.location.href = res.link;
        } else {
          const successMassage = document.querySelector(".sc-message-success");
          successMassage.innerHTML = res.massage;
          fadeIn(successMassage, 300);
        }
      } else {
        const errorMessage = document.querySelector(".sc-message-error");
        errorMessage.innerHTML = res.massage;

        fadeIn(errorMessage, 300);
      }

      fadeOut(loading, 300);
      fadeIn(form, 300);
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const seedConfirmGetDetail = async (orderId) => {
    const routeUrl = `${currentUrl}/wp-json/seed-confirm/v1/get-detail`;

    try {
      const response = await fetch(routeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "No-Cache": "true",
        },
        body: JSON.stringify({ id: orderId }),
      });

      // Check if the response is ok
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }

      // Get the count from the response
      const res = await response.json();
      if (res.success) {
        let orderTotal = document.querySelector(".sc-order-total");
        let orderDate = document.querySelector(".sc-orderdate");
        let orderDetails = document.querySelector(".sc-order-detail");

        if (orderTotal != undefined) {
          orderTotal.value = res.data.total;
        }
        if (orderDate != undefined) {
          orderDate.innerHTML = res.data.date;

          const date = new Date();
          const day = date.getDate().toString().padStart(2, "0");
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const month = monthNames[date.getMonth()];
          const year = date.getFullYear();
          orderDate.value = `${day} ${month} ${year}`;
        }

        if (orderDetails != undefined) {
          orderDetails.innerHTML = res.data.details;
        }
      }
    } catch (error) {
      console.error("Error loading detail:", error);
    }
  };

  // Animation fade in
  const fadeIn = (el, time) => fadeEffect(el, time, true);

  // Animation fade out
  const fadeOut = (el, time) => fadeEffect(el, time, false);

  // Generic fade effect function
  const fadeEffect = (el, time, isFadeIn) => {
    el.style.display = isFadeIn ? "block" : "none";
    el.style.opacity = isFadeIn ? 0 : 1;

    let start = performance.now();

    const tick = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / time, 1);
      el.style.opacity = isFadeIn ? progress : 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else if (!isFadeIn) {
        el.style.display = "none";
      }
    };

    requestAnimationFrame(tick);
  };
}
