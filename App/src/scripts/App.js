import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".category"), "75%");
new RevealOnScroll($(".quote__container"), "75%");
new RevealOnScroll($(".site-section__txt-wrap"), "75%");
var stickyHeader = new StickyHeader();
var modal = new Modal();