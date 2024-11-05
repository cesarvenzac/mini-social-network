class Feed extends HTMLElement {
  constructor() {
    super();
    this.fetchDataAndRender();
  }

  async fetchDataAndRender() {
    try {
      const response = await fetch("../data/feed.json");
      const jsonData = await response.json();
      this.renderPosts(jsonData.posts);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }

  renderPosts(posts) {
    const feedContent = posts
      .map((post) => {
        return `
        <li>
          <section class="header">
            <span class="author">${post.author}</span>
            <span class="date">${new Date(
              post.timestamp
            ).toLocaleString()}</span>
          </section>
          <section class="content">
            <p>${post.content.text}</p>
            ${
              post.content.image
                ? `<img src="${post.content.image}" alt="imageAlt">`
                : ""
            }
          </section>
          <section class="footer">
            <section class="reactions">
              <span>${post.reactions.like} likes</span>
              <span>${post.reactions.dislike} dislikes</span>
              <span>${post.reactions.love} loves</span>
            </section>
            <section class="comments">
              <span onclick="this.nextElementSibling.classList.toggle('visible')">${
                post.comments.length
              } comments</span>
              <ul class="comment-list" style="display: none;">
                ${post.comments
                  .map(
                    (comment) => `
                  <li>
                    <section class="header">
                      <span>${comment.author}</span>
                      <span>${new Date(
                        comment.timestamp
                      ).toLocaleString()}</span>
                    </section>
                    <section class="content">
                      <p>${comment.text}</p>
                    </section>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </section>
          </section>
        </li>
      `;
      })
      .join("");

    this.innerHTML = `<ul class="feed-container">${feedContent}</ul>`;
    this.querySelectorAll(".comments span").forEach((span) => {
      span.addEventListener("click", function () {
        const commentList = this.nextElementSibling;
        commentList.style.display =
          commentList.style.display === "none" ? "block" : "none";
      });
    });
  }
}

customElements.define("custom-feed", Feed);
