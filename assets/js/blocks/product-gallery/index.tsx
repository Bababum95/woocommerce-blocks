/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit } from './edit';
import { Save } from './save';
import metadata from './block.json';
import icon from './icon';
import './style.scss';
import './inner-blocks/product-gallery-large-image-next-previous';
import './inner-blocks/product-gallery-pager';
import './inner-blocks/product-gallery-thumbnails';

// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core.
registerBlockType( metadata, {
	icon,
	edit: Edit,
	save: Save,
} );
