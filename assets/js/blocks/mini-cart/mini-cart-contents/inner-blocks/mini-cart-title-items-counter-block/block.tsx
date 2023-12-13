/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context';
import classNames from 'classnames';
import { useStyleProps } from '@woocommerce/base-hooks';
import { getSetting } from '@woocommerce/settings';
import { TotalsItemValue } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';

type Props = {
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const styleProps = useStyleProps( props );
	const subTotal = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( cartTotals.total_items, 10 ) +
		  parseInt( cartTotals.total_items_tax, 10 )
		: parseInt( cartTotals.total_items, 10 );
	const totalalue = subTotal / 10 ** cartTotals.currency_minor_unit;
	// 45 is the max value of the progress bar
	const maxValue = 45;

	return (
		<div
			className={ classNames( props.className, styleProps.className ) }
			style={ styleProps.style }
		>
			<span>
				👋 Du bist
				<TotalsItemValue
					value={ subTotal }
					currency={ getCurrencyFromPriceResponse( cartTotals ) }
				/>
				von der kostenlosen Lieferung entfernt.
			</span>
			<div className="wp-block-woocommerce-mini-cart-title-items-counter-block__progresbar">
				<input
					className="wp-block-woocommerce-mini-cart-title-items-counter-block__progresbar-status"
					type="range"
					value={ totalalue }
					max={ maxValue }
					disabled
					style={
						{
							'--range-progress': `${
								( totalalue / maxValue ) * 100
							}%`,
						} as React.CSSProperties
					}
				/>
			</div>
		</div>
	);
};

export default Block;
