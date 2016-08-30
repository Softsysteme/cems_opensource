/* Augments file inputs to show a preview of the image. */
(function() {
	$(document).on("pagechange", function(_, ui) {
		var $page = ui.toPage;

		$page.find("input[data-image-input]").each(function(_, imgInput) {
			$(imgInput).attr("accept", "image/*");

			// Fix file uploads
			$(imgInput.form).on("submit", function() {
				C8O.call(this);
				return false;
			});

			var placeholder = $page.find('[data-placeholder-for="' + imgInput.name + '"]');
			var previewImg = $page.find('img[data-preview-for="' + imgInput.name + '"]');

			if (previewImg.length == 0)
				return;

			if (previewImg.attr("src")) {
				placeholder.hide();
				previewImg.show();
			}

			var reader = new FileReader();

			$(imgInput).on("change", function() {
				placeholder.show();
				previewImg.hide();

				if (imgInput.files.length == 1)
					reader.readAsDataURL(imgInput.files[0]);
			});

			reader.onload = function() {
				var b64Data = reader.result;

				previewImg.attr("src", b64Data); // Display the image in the preview
			};

			previewImg.on("load", function() {
				// The preview is ready
				placeholder.hide();
				previewImg.show();
			});
		});
	});
})();
