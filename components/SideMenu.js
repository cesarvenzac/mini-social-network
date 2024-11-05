class SideMenu extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <ul>
        <li>
          <span>Search</span>
        </li>
        <li>
          <span>Trends</span>
        </li>
        <li>
          <span>Discover</span>
        </li>
      </ul>
    `;
  }
}

customElements.define("side-menu", SideMenu);
