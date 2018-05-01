import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.headerMenu = $('.header-menu');
		this.headerTriggerElement = $(".large-hero__img");
		this.createHeaderWaypoint();
		this.siteSections = $(".site-section__container");
		this.headerLinks = $(".header-menu__nav a");
		this.createSiteSectionWaypoints();
		this.categoriesTriggerElement = $(".categories");
		this.removeSiteSectionWaypoint();
		this.addSmoothScrolling();
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.headerMenu.addClass("header-menu--dark");
				} else {
					that.headerMenu.removeClass("header-menu--dark");
				}
			}
		});
	}

	createSiteSectionWaypoints() {
		var that = this;
		this.siteSections.each(function() {
			var currentSiteSection = this;
			new Waypoint({
				element: currentSiteSection,
				handler: function(direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentSiteSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "12%"
			});

			new Waypoint({
				element: currentSiteSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentSiteSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-12%"
			});
		});
	}

	removeSiteSectionWaypoint() {
		var that = this;
		new Waypoint({
			element: this.categoriesTriggerElement[0],
			handler: function(direction) {
				if (direction == "up") {
					that.headerLinks.removeClass("is-current-link");
				}
			},
			offset: "10%"
		});
	}
}

export default StickyHeader;