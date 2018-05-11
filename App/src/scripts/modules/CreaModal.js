import $ from 'jquery';

class CreaModal {
	constructor() {
		this.openModalButton = $('.open-modal');
		this.modal = $('.modal');
		this.closeModalButton = $('.modal__close');
		this.events();
	}

	events() {
		// clicking open modal button
		this.openModalButton.click(this.openModal.bind(this));

		// clicking the X clode modal button
		this.closeModalButton.click(this.closeModal.bind(this));

		// pushes any key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	//pushes the escape key
	keyPressHandler(e) {
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		return false;
	}

	closeModal () {
		this.modal.removeClass("modal--is-visible");
	}
}

export default CreaModal;