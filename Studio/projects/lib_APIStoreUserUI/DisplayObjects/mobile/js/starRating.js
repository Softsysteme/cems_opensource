$(function() {
	window.starRating = {
		initPage: function($page) {
			return $page.find(".rating").rating();
		}
	};

	$.widget("c8o.rating", {
		options: {
			// Whether the user can change the value by clicking
			editable: false,

			// Initial rating value
			value: 0,
			
			// Callback for when the user changes the value (when editable) 
			onUserEditValue: null
		},

		_create: function() {
			// The index of the current selected star (the one for this.options.value)
			this.activeIndex = -1;
			// Whether the star after activeIndex should be half full
			this.activeAddHalf = false;

			this.$stars = this.element.find(".star");

			// Initialize the stars with the correct value
			this.setValue(this.options.value);

			if (!this.options.editable)
				return;

			this.element.addClass("editable");

			var that = this;
			this.$stars.each(function(i, star) {
				var $star = $(star);

				$star.find("input[type=radio]").on("change", function() {
					// Set value uses a value from 1 to 5, so we need to add 1
					// because i is a 0 based index
					that.setValue(i + 1);

					if (that.options.onUserEditValue)
						that.options.onUserEditValue(that.options.value);
				});

				$star.on("mouseenter", function() {
					// Highlight uses the index, so i is fine
					that._highlight(i, false);
				});
			});

			// Bind to the rating, and not stars to prevent the style from clearing when
			// the cursor is in between two stars
			this.element.on("mouseleave", function() {
				that._highlightActive();
			});
		},

		_setOption: function(key, value) {
			if (key === "value")
				this.setValue(value);

			this._super(key, value);
		},

		setValue: function(value) {
			value = Number(value) || 0;

			// Allow 0, so we can clear the rating
			if (value < 0 || 5 < value)
				return;

			// Store the value
			this.options.value = value;

			var intValue = Math.floor(value);
			var addHalf = value - intValue >= .5;

			// Index is 0 based
			var starIndex = intValue - 1;
			this._activate(starIndex, addHalf);
		},

		_activate: function(starIndex, addHalf) {
			this.activeIndex = starIndex;
			this.activeAddHalf = addHalf;

			this._highlight(starIndex, addHalf);
		},

		_highlight: function(starIndex, addHalf) {
			this.$stars.removeClass("star-fill star-half");

			if (addHalf) {
				// Add 1 because we want the star after starIndex:
				// starIndex is the index of the last full star
				this.$stars.eq(starIndex + 1).addClass("star-half");
			}

			// slice wraps around for negative indexes.
			// Make sure that doesn't happen
			if (starIndex < 0)
				return;

			// Add 1 to include the star at starIndex
			this.$stars.slice(0, starIndex + 1).addClass("star-fill");
		},

		_highlightActive: function() {
			this._highlight(this.activeIndex, this.activeAddHalf);
		}
	});
});
