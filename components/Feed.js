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

  timeAgo(timestamp) {
    const secondsAgo = Math.floor((Date.now() - new Date(timestamp)) / 1000);

    if (secondsAgo < 60) return `${secondsAgo}s`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo}m`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo}h`;
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) return `${daysAgo}d`;
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) return `${weeksAgo}w`;
    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) return `${monthsAgo}mo`;
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo}y`;
  }

  renderPosts(posts) {
    const feedContent = posts
      .map((post) => {
        return `
        <li>
          <section class="header">
            <span class="author">${post.author}</span>
            <span class="date">${this.timeAgo(post.timestamp)}</span>
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
              <div class="comments-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                <span>${post.comments.length}</span>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> 
                <span>${post.reactions.like}</span>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-2"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/></svg>
                <span>${post.reactions.repost}</span>
              </div>
            </section>
            <section class="comments" style="display: none;">
              <ul>
                ${post.comments
                  .map(
                    (comment) => `
                  <li>
                    <section class="header">
                      <span class="author">${comment.author}</span>
                      <span class="date">${this.timeAgo(post.timestamp)}</span>
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
    this.querySelectorAll(".comments-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const commentsList = this.closest("li").querySelector(".comments");
        commentsList.style.display =
          commentsList.style.display === "none" ? "block" : "none";
      });
    });
  }
}

customElements.define("custom-feed", Feed);
