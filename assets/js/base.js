/*
 * base.js
 * Self-hosted replacements for the third-party Sesame Communications
 * global script: mobile nav toggle (responsiveNav) and email link
 * obfuscation (emailProt). The slideshow/carousel (.cycle-slideshow)
 * is already handled by the real jQuery Cycle2 plugin bundled in
 * aggregate.js, so it needs no replacement here.
 * Loaded before local.js, which calls these as jQuery plugins.
 */
(function ($) {
	'use strict';

	// ---- mobile nav toggle -------------------------------------------------
	$.fn.responsiveNav = function () {
		return this.each(function () {
			var $nav = $(this);
			var $collapsible = $nav.find('.collapsible').first();
			var $trigger = $collapsible.find('> .trigger').first();

			$trigger.on('click', function (e) {
				e.preventDefault();
				$collapsible.toggleClass('open');
			});

			$nav.find('li').has('> ul').each(function () {
				var $li = $(this);
				var $link = $li.children('a').first();
				$link.on('click', function (e) {
					if ($trigger.is(':visible') && !$li.hasClass('open')) {
						e.preventDefault();
						$li.siblings('.open').removeClass('open');
						$li.addClass('open');
					}
				});
			});

			$(document).on('click', function (e) {
				if ($collapsible.hasClass('open') && !$collapsible.is(e.target) && $collapsible.has(e.target).length === 0) {
					$collapsible.removeClass('open');
					$nav.find('li.open').removeClass('open');
				}
			});
		});
	};

	// ---- email obfuscation --------------------------------------------------
	$.fn.emailProt = function () {
		return this.each(function () {
			var $link = $(this);
			var rel = $link.attr('rel') || '';
			var parts = rel.split('|');
			if (parts.length !== 2) {
				return;
			}
			var address = parts[0] + '@' + parts[1];
			$link.attr('href', 'mailto:' + address);
			if (!$.trim($link.text())) {
				$link.text(address);
			}
		});
	};

})(jQuery);
