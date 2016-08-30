/*
 * Provides nd2singleincludeready, and nd2includesready events.
 */

/* If we have to avoid using MutationObservers, this could be
 * rewritten using widget extension. See:
 *   http://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/
 * 
 * We would have to replace this.element.load with a wrapper that adds
 * it's own callback, in which it can trigger the nd2includesready event.
 */
(function() {
	var onPageChange = function($page) {
		// Find all the includes in the new page
		// Includes are cached, so we only want to get the empty ones
		var $includes = $page.find("nd2-include:not(:has(*))").include();
		var totalIncludes = $includes.length;

		if (totalIncludes == 0) {
			// No includes, page is ready
			$page.trigger("nd2includesready");
			return;
		}

		var includesDone = 0;
		var mutationObserver = new MutationObserver(function(mutationRecords) {
			for (var mutationRecord of mutationRecords) {
				// No new children, ignore event
				if (mutationRecord.addedNodes.length == 0)
					return;

				// Check if this was the last include left
				if (++includesDone < totalIncludes) {
					$(mutationRecord.target).trigger("nd2singleincludeready");
					return;
				}

				// Remove the MutationObserver
				this.disconnect();

				$page.trigger("nd2includesready");
			}
		});

		// Observe every nd2-include in the new page
		$includes.each(function(_, include) {
			mutationObserver.observe(include, {
				childList: true,
			});
		});
	};

	C8O.addHook("init_finished", function (params) {
		var callback = function() {
			onPageChange($(".ui-page-active"));
		}

		// Trigger a page change: we are on the first page loaded,
		// and init_finished is fired after pagechange, so we missed it.
		callback();

		$(document).on("pagechange", callback);

		return true;
	});

	$(document).on("nd2singleincludeready", function(e) {
		C8O.translate(e.target);
	});

	$(document).on("nd2includesready", function(e) {
		var $page = $(e.target);

		// Allow <a> to toggle panels
		$page.find("a[data-panel-toggle]").each(function(_, a) {
			var panelPos = a.getAttribute("data-panel-toggle");

			$(a).on("click", function() {
				var $panel = $page.find('[data-role=panel][data-position="' + panelPos + '"]')

				if ($panel.length == 0) {
					C8O.log.error("No such panel: '" + panelPos + "' (referenced by a data-show-panel attribute)");
					$(this).off("click", arguments.callee);
					return;
				}

				$panel.panel("toggle");
			});
		});
	});
})();
