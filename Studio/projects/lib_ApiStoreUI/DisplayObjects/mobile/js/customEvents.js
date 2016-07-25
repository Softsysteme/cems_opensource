/* Could be rewritten using widget extension. See:
 *   http://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/
 * 
 * We would have to replace this.element.load with a wrapper that adds
 * it's own callback, in which it can trigger the nd2includesready event.
 */
(function($, C8O) {
	var onPageChange = function($page) {
		// Find all the includes in the new page
		var $includes = $page.find("nd2-include").include();
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

//					// Replace the nd2-include element with it's children
//					var include = mutationRecord.target;
//					var parent = include.parentNode;
//					var children = include.children;
//
//					// First insert the children above the nd2-include
//					for (child in children) {
//						include.removeChild(child); // !Throws in Edge! 
//						parent.insertBefore(child, include);
//					}
//
//					// Remove the now empty nd2-include
//					parent.removeChild(include);

				// Check if this was the last include left
				if (++includesDone < totalIncludes)
					return;

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

	$(document).on("nd2includesready", function(e) {
		var $page = $(e.target);

		$page.find("button[data-href]").each(function(_, button) {
			$(button).on("click", function() {
				C8O._changePage(button.getAttribute("data-href"));
			});
		});

		$page.find("a[data-panel-toggle]").each(function(_, a) {
			var panelPos = a.getAttribute("data-panel-toggle");

			$(a).on("click", function() {
				var $panel = $page.find('[data-role=panel][data-position="' + panelPos + '"]')

				if ($panel.length == 0) {
					C8O.log.error("No such panel: '" + panelPos + "' (referenced by a data-show-panel attribute)");
					$(this).unbind("click", arguments.callee);
					return;
				}

				$panel.panel("toggle");
			});
		});
	});
})($, C8O);
