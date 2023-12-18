/**
 * External dependencies
 */
import classnames from 'classnames';
import type { ReactElement, ReactNode } from 'react';
import type { Currency } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import './style.scss';
import TotalsItemValue from './TotalsItemValue';

export interface TotalsItemProps {
	className?: string;
	currency: Currency;
	label: string;
	// Value may be a number, or react node. Numbers are passed to FormattedMonetaryAmount.
	value: number | ReactNode;
	description?: ReactNode;
}

const TotalsItem = ( {
	className,
	currency,
	label,
	value,
}: TotalsItemProps ): ReactElement => {
	return (
		<div
			className={ classnames(
				'wc-block-components-totals-item',
				className
			) }
		>
			<span className="wc-block-components-totals-item__label">
				{ label }
			</span>
			<TotalsItemValue value={ value } currency={ currency } />
		</div>
	);
};

export default TotalsItem;
