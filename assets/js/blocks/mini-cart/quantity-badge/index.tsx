/**
 * External dependencies
 */
import { cartOutline, bag, bagAlt } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import { IconType, ColorItem } from '.././types';

interface Props {
	count: number;
	icon?: IconType;
	iconColor: ColorItem | { color: undefined };
	productCountColor: ColorItem | { color: undefined };
}

const QuantityBadge = ( {
	count,
	icon,
	iconColor,
	productCountColor,
}: Props ): JSX.Element => {
	function getIcon( iconName?: 'cart' | 'bag' | 'bag-alt' ) {
		switch ( iconName ) {
			case 'cart':
				return cartOutline;
			case 'bag':
				return bag;
			case 'bag-alt':
				return bagAlt;
			default:
				return cartOutline;
		}
	}

	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={ 20 }
				height={ 24 }
				viewBox="0 0 22 26"
				fill="none"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M19 6.46875H3C2.44772 6.46875 2 6.91647 2 7.46875V22.9977C2 23.55 2.44772 23.9977 3 23.9977H19C19.5523 23.9977 20 23.55 20 22.9977V7.46875C20 6.91647 19.5523 6.46875 19 6.46875ZM3 5.46875C1.89543 5.46875 1 6.36418 1 7.46875V22.9977C1 24.1023 1.89543 24.9977 3 24.9977H19C20.1046 24.9977 21 24.1023 21 22.9977V7.46875C21 6.36418 20.1046 5.46875 19 5.46875H3Z"
					fill="#1A1A1A"
					stroke="#1A1A1A"
					strokeWidth="0.5"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6 5.91507C6 3.20055 8.23858 1 11 1C13.7614 1 16 3.20055 16 5.91507V6.46119H14.8889V5.91507C14.8889 3.80378 13.1478 2.09224 11 2.09224C8.85223 2.09224 7.11111 3.80378 7.11111 5.91507V6.46119H6V5.91507Z"
					fill="#1A1A1A"
					stroke="#1A1A1A"
					strokeWidth="0.5"
				/>
			</svg>
			<span
				className="wc-block-mini-cart__badge"
				style={ { background: productCountColor.color } }
			>
				{ count > 0 ? count : '' }
			</span>
		</span>
	);
};

export default QuantityBadge;
