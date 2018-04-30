import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".category"), "75%");
new RevealOnScroll($(".quote__container"), "75%");
new RevealOnScroll($(".site-section__txt-wrap"), "75%");
