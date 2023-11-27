<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ProductGalleryLargeImage class.
 */
class ProductGalleryLargeImageNextPrevious extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-gallery-large-image-next-previous';

	/**
	 * It isn't necessary register block assets because it is a server side block.
	 */
	protected function register_block_type_assets() {
		return null;
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}

	/**
	 *  Register the context
	 *
	 * @return string[]
	 */
	protected function get_block_type_uses_context() {
		return [ 'nextPreviousButtonsPosition', 'productGalleryClientId' ];
	}

	/**
	 *  Return class suffix
	 *
	 * @param array $context Block context.
	 * @return string
	 */
	private function get_class_suffix( $context ) {
		switch ( $context['nextPreviousButtonsPosition'] ) {
			case 'insideTheImage':
				return 'inside-image';
			case 'outsideTheImage':
				return 'outside-image';
			case 'off':
				return 'off';
			default:
				return 'off';
		}
	}

	/**
	 * Include and render the block.
	 *
	 * @param array    $attributes Block attributes. Default empty array.
	 * @param string   $content    Block content. Default empty string.
	 * @param WP_Block $block      Block instance.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];
		if ( ! isset( $post_id ) ) {
			return '';
		}

		$product = wc_get_product( $post_id );

		$product_gallery = $product->get_gallery_image_ids();

		if ( empty( $product_gallery ) ) {
			return null;
		}

		$context     = $block->context;
		$prev_button = $this->get_button( 'previous', $context );
		$p           = new \WP_HTML_Tag_Processor( $prev_button );

		if ( $p->next_tag() ) {
			$p->set_attribute(
				'data-wc-on--click',
				'actions.selectPreviousImage'
			);
			$prev_button = $p->get_updated_html();
		}

		$next_button = $this->get_button( 'next', $context );
		$p           = new \WP_HTML_Tag_Processor( $next_button );

		if ( $p->next_tag() ) {
			$p->set_attribute(
				'data-wc-on--click',
				'actions.selectNextImage'
			);
			$next_button = $p->get_updated_html();
		}

		$alignment_class = isset( $attributes['layout']['verticalAlignment'] ) ? 'is-vertically-aligned-' . $attributes['layout']['verticalAlignment'] : '';
		$position_class  = 'wc-block-product-gallery-large-image-next-previous--' . $this->get_class_suffix( $context );

		return strtr(
			'<div
				class="wc-block-product-gallery-large-image-next-previous wp-block-woocommerce-product-gallery-large-image-next-previous {alignment_class}"
				data-wc-interactive=\'{data_wc_interactive}\'
			>
				<div class="wc-block-product-gallery-large-image-next-previous-container {position_class}">
					{prev_button}
					{next_button}
				</div>
		</div>',
			array(
				'{prev_button}'         => $prev_button,
				'{next_button}'         => $next_button,
				'{alignment_class}'     => $alignment_class,
				'{position_class}'      => $position_class,
				'{data_wc_interactive}' => wp_json_encode( array( 'namespace' => 'woocommerce/product-gallery' ), JSON_NUMERIC_CHECK ),
			)
		);
	}

	/**
	 * Generates the HTML for a next or previous button for the product gallery large image.
	 *
	 * @param string $button_type The type of button to generate. Either 'previous' or 'next'.
	 * @param string $context     The block context.
	 * @return string The HTML for the generated button.
	 */
	protected function get_button( $button_type, $context ) {
		if ( 'insideTheImage' === $context['nextPreviousButtonsPosition'] ) {
			return $this->get_inside_button( $button_type, $context );
		}

		return $this->get_outside_button( $button_type, $context );
	}

	/**
	 * Returns an HTML button element with an SVG icon for the previous or next button when the buttons are inside the image.
	 *
	 * @param string $button_type The type of button to return. Either "previous" or "next".
	 * @param string $context The context in which the button is being used.
	 * @return string The HTML for the button element.
	 */
	protected function get_inside_button( $button_type, $context ) {
		$previous_button_icon_path = 'M28.1 12L30.5 14L21.3 24L30.5 34L28.1 36L17.3 24L28.1 12Z';
		$next_button_icon_path     = 'M21.7001 12L19.3 14L28.5 24L19.3 34L21.7001 36L32.5 24L21.7001 12Z';
		$icon_path                 = $previous_button_icon_path;
		$button_side_class         = 'left';

		if ( 'next' === $button_type ) {
			$icon_path         = $next_button_icon_path;
			$button_side_class = 'right';
		}

		return sprintf(
			'<button class="wc-block-product-gallery-large-image-next-previous--button wc-block-product-gallery-large-image-next-previous-%1$s--%2$s">
				<svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
					<path d="M1.70212 11.8564L7.77344 6.99923L1.70212 2.14209" stroke="white" stroke-width="2.42855" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>',
			$button_side_class,
			$this->get_class_suffix( $context ),
			$icon_path
		);

	}

	/**
	 * Returns an HTML button element with an SVG icon for the previous or next button when the buttons are outside the image.
	 *
	 * @param string $button_type The type of button to return. Either "previous" or "next".
	 * @param string $context The context in which the button is being used.
	 * @return string The HTML for the button element.
	 */
	protected function get_outside_button( $button_type, $context ) {
		$next_button_icon_path     = 'M4.56666 0L0.766663 3.16667L15.3333 19L0.766663 34.8333L4.56666 38L21.6667 19L4.56666 0Z';
		$previous_button_icon_path = 'M17.7 0L21.5 3.16667L6.93334 19L21.5 34.8333L17.7 38L0.600002 19L17.7 0Z';
		$icon_path                 = $previous_button_icon_path;
		$button_side_class         = 'left';

		if ( 'next' === $button_type ) {
			$icon_path         = $next_button_icon_path;
			$button_side_class = 'right';
		}

		return sprintf(
			'<button class="wc-block-product-gallery-large-image-next-previous--button wc-block-product-gallery-large-image-next-previous-%1$s--%2$s">
				<svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
					<path d="M1.70212 11.8564L7.77344 6.99923L1.70212 2.14209" stroke="white" stroke-width="2.42855" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>',
			$button_side_class,
			$this->get_class_suffix( $context ),
			$icon_path
		);

	}
}
