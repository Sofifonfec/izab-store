import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class InnerStickyNav {
	constructor() {
		this.lazyImages = $('.lazyload');
		this.headerNav = $('.inner-pages-nav__link');
		this.navTriggerElement = $(".inner-large-hero__title");
		this.createNavWaypoint();
		this.refreshWaypoints();
	}

	refreshWaypoints() {
		this.lazyImages.on('load', function() {
			Waypoint.refreshAll();
		});
	}

	createNavWaypoint() {
		var that = this;
		new Waypoint({
			element: this.navTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.headerNav.addClass("inner-pages-nav__link--dark");
				} else {
					that.headerNav.removeClass("inner-pages-nav__link--dark");
				}
			},
			offset: "7%"
		});
	}	
}

export default InnerStickyNav;