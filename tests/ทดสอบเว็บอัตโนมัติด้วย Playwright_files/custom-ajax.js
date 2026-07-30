/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const loveButtons = document.querySelectorAll(".love-button");
  let cookie_list = document.cookie.split("; ");
  let liked_posts = [];
  cookie_list.forEach((cookie) => {
    if (cookie.includes("liked_posts")) {
      liked_posts = cookie.split("=")[1].split("%2C");
    }
  });
  loveButtons.forEach((button) => {
    let postId = button.getAttribute("data-post-id");
    let isThrottled = false; // Throttle flag

    // Non Logged In Logic
    if (liked_posts.includes(postId)) {
      let love_btn = document.querySelectorAll("#icon-post-" + postId);
      love_btn.forEach((el) => {
        el.classList.remove("iconamoon--like-light");
        el.classList.add("iconamoon--like-fill");
        el.dataset.isuserlike = true;
      });
    }

    // Logged In Logic
    if (button.dataset.isuserlike === "true") {
      let love_btn = document.querySelectorAll("#icon-post-" + postId);
      love_btn.forEach((el) => {
        el.classList.remove("iconamoon--like-light");
        el.classList.add("iconamoon--like-fill");
        el.dataset.isuserlike = true;
      });
    }

    // Update UI Logic
    button.addEventListener("click", function () {
      console.log("What")
      if (isThrottled) {
        alert("กรุณารอสักครู่ก่อนกดอีกครั้ง");
        return; // Prevent multiple clicks within 5 seconds
      }
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 5000);

      const url = my_ajax_object.ajax_url; // Use localized AJAX URL
      let currentLike = parseInt(
        document.getElementById("love-count-" + postId).textContent
      );
      let isThisCurrentButtonHaveMoreThanTwoElement =
        document.querySelectorAll("#icon-post-" + postId).length == 2
          ? true
          : false;
      if (button.dataset.isuserlike === "true") {
        if (isThisCurrentButtonHaveMoreThanTwoElement) {
          document.querySelectorAll("#icon-post-" + postId).forEach((el) => {
            el.classList.remove("iconamoon--like-fill");
            el.classList.add("iconamoon--like-light");
            el.dataset.isuserlike = false;
            el.nextElementSibling.textContent = currentLike - 1;
          });
        } else {
          button.dataset.isuserlike = false;
          button.classList.remove("iconamoon--like-fill");
          button.classList.add("iconamoon--like-light");
          button.nextElementSibling.textContent = currentLike - 1;
        }
      } else {
        if (isThisCurrentButtonHaveMoreThanTwoElement) {
          document.querySelectorAll("#icon-post-" + postId).forEach((el) => {
            el.classList.remove("iconamoon--like-light");
            el.classList.add("iconamoon--like-fill");
            el.dataset.isuserlike = true;
            el.nextElementSibling.textContent = currentLike + 1;
          });
        } else {
          button.dataset.isuserlike = true;
          button.classList.remove("iconamoon--like-light");
          button.classList.add("iconamoon--like-fill");
          button.nextElementSibling.textContent = currentLike + 1;
        }
      }

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          action: "increment_love_count",
          post_id: postId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Like Success");
            // Update love count on success
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });

  // loveButtons.forEach((button) => {

  // });
});
