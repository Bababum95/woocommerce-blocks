/**
 * External dependencies
 */
import classnames from 'classnames';

const Block = ( { className }: { className: string } ): JSX.Element => {
	return (
		<span
			className={ classnames( className, 'wc-block-cart__totals-title' ) }
		>
			Warenkorb-Summe
		</span>
	);
};

export default Block;
