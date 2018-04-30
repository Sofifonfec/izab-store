import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.headerMenu = $(".header-menu");
		this.menuIcon = $(".header-menu__icon");
		this.menuNav = $(".header-menu__nav");
		this.events();	
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	toggleTheMenu() {
		this.menuNav.toggleClass("header-menu__nav--is-visible");
		this.headerMenu.toggleClass("header-menu--is-expanded");
		this.menuIcon.toggleClass("header-menu__icon--close-x")
	}
}

export default MobileMenu;